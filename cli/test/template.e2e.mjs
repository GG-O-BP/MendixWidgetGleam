import assert from "node:assert/strict";
import { access, mkdtemp, readFile, readdir, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";
import { spawnSync } from "node:child_process";

import { generateLicenseContent } from "../src/licenses.mjs";
import { PM_CHOICES, runtimeForPm } from "../src/pm.mjs";

const cliDir = dirname(dirname(fileURLToPath(import.meta.url)));
const cliBin = join(cliDir, "bin", "create-mendix-widget-gleam.mjs");
const packageManager = process.env.GLENDIX_E2E_PM || "bun";
const runtime = runtimeForPm(packageManager);

function run(cwd, executable, args, options = {}) {
  const result = spawnSync(executable, args, {
    cwd,
    encoding: "utf8",
    env: { ...process.env, ...options.env },
    input: options.input,
    maxBuffer: 20 * 1024 * 1024,
  });
  if (process.env.GLENDIX_E2E_VERBOSE === "true") {
    process.stdout.write(result.stdout ?? "");
    process.stderr.write(result.stderr ?? "");
  }
  if (result.status !== 0) {
    throw new Error(
      `${executable} ${args.join(" ")} failed (${result.status})\n`
      + `${result.stdout ?? ""}${result.stderr ?? ""}`,
    );
  }
  return result;
}

async function findMpks(directory) {
  const found = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) found.push(...await findMpks(path));
    if (entry.isFile() && entry.name.endsWith(".mpk")) found.push(path);
  }
  return found.sort();
}

assert.ok(
  PM_CHOICES.includes(packageManager),
  `Unsupported GLENDIX_E2E_PM: ${packageManager}`,
);

const temporaryRoot = await mkdtemp(join(tmpdir(), "mwg-template-e2e-"));
const target = join(temporaryRoot, "generated-widget");

try {
  const missingName = spawnSync(process.execPath, [cliBin], {
    cwd: temporaryRoot,
    encoding: "utf8",
    input: "",
  });
  assert.equal(
    missingName.status,
    1,
    `closed stdin without a project name must fail\n${missingName.stdout ?? ""}${missingName.stderr ?? ""}`,
  );

  const copyright = "2026 Generated Widget contributors";
  const answers = [
    "1",
    "example",
    copyright,
    "0.1.0",
    "Generated Widget E2E",
    "./tests/testProject",
    String(PM_CHOICES.indexOf(packageManager) + 1),
    "",
  ].join("\n");

  run(
    temporaryRoot,
    process.execPath,
    [cliBin, "Generated_Widget"],
    { input: answers },
  );

  const packageJson = JSON.parse(
    await readFile(join(target, "package.json"), "utf8"),
  );
  assert.equal(packageJson.license, "MIT");
  assert.equal(
    await readFile(join(target, "LICENSE"), "utf8"),
    generateLicenseContent(copyright),
  );
  assert.match(await readFile(join(target, "README.md"), "utf8"), /## License\n\nMIT/);
  await assert.rejects(access(join(target, "docs/glendix_guide.md")));

  run(target, "gleam", ["format", "--check", "src", "test"]);
  run(target, "gleam", ["check"]);
  run(target, "gleam", ["build", "--warnings-as-errors"]);
  run(target, "gleam", ["test", "--runtime", runtime]);

  const mpks = await findMpks(join(target, "dist"));
  assert.ok(mpks.length > 0, "generated project did not produce an MPK");
  for (const mpk of mpks) run(target, "unzip", ["-tq", mpk]);

  console.log(
    `Generated ${packageManager} project through the CLI with ${mpks.length} MPK(s).`,
  );
} finally {
  if (process.env.GLENDIX_E2E_KEEP === "true") {
    console.log(`Preserved generated project at ${temporaryRoot}`);
  } else {
    await rm(temporaryRoot, { recursive: true, force: true });
  }
}
