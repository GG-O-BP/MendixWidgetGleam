import assert from "node:assert/strict";
import { mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";
import { spawnSync } from "node:child_process";

import { getTemplateComments } from "../src/i18n.mjs";
import { generateLicenseContent } from "../src/licenses.mjs";
import { generateNames } from "../src/naming.mjs";
import { scaffold } from "../src/scaffold.mjs";
import {
  generateAgentsMdContent,
  generateClaudeMdContent,
} from "../src/templates/claude_md.mjs";
import { generateReadmeContent } from "../src/templates/readme_md.mjs";

const cliDir = dirname(dirname(fileURLToPath(import.meta.url)));
const templateDir = join(cliDir, "template");

function run(cwd, executable, args) {
  const result = spawnSync(executable, args, {
    cwd,
    encoding: "utf8",
    env: process.env,
  });
  if (result.status !== 0) {
    throw new Error(
      `${executable} ${args.join(" ")} failed (${result.status})\n`
      + `${result.stdout ?? ""}${result.stderr ?? ""}`,
    );
  }
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

const temporaryRoot = await mkdtemp(join(tmpdir(), "mwg-template-e2e-"));
const target = join(temporaryRoot, "generated-widget");

try {
  const names = generateNames("Generated_Widget");
  const options = {
    organization: "example",
    copyright: "© 2026 Generated Widget contributors.",
    license: "Apache-2.0",
    version: "0.1.0",
    author: "Generated Widget E2E",
    projectPath: "./tests/testProject",
    packageManager: "bun",
  };

  await scaffold(
    templateDir,
    target,
    names,
    getTemplateComments("en"),
    options,
  );
  await writeFile(
    join(target, "LICENSE"),
    generateLicenseContent(options.license, options.copyright),
  );
  await writeFile(
    join(target, "AGENTS.md"),
    generateAgentsMdContent("en", names, "bun", options.organization),
  );
  await writeFile(
    join(target, "CLAUDE.md"),
    generateClaudeMdContent("en", names, "bun", options.organization),
  );
  await writeFile(
    join(target, "README.md"),
    generateReadmeContent("en", names, "bun", options.license),
  );

  await assert.rejects(readFile(join(target, "docs/glendix_guide.md")));
  run(target, "gleam", ["format", "--check", "src", "test"]);
  run(target, "gleam", ["check"]);
  run(target, "gleam", ["build", "--warnings-as-errors"]);
  run(target, "gleam", ["test", "--runtime", "bun"]);
  run(target, "gleam", ["run", "-m", "glendix/install", "--runtime", "bun"]);
  run(target, "gleam", ["run", "-m", "glendix/build", "--runtime", "bun"]);

  const mpks = await findMpks(join(target, "dist"));
  assert.ok(mpks.length > 0, "generated project did not produce an MPK");
  for (const mpk of mpks) run(target, "unzip", ["-tq", mpk]);

  console.log(`Generated project E2E passed with ${mpks.length} MPK(s).`);
} finally {
  await rm(temporaryRoot, { recursive: true, force: true });
}
