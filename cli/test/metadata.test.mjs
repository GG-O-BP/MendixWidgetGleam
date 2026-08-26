import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

import { generateLicenseContent } from "../src/licenses.mjs";
import { target_directory_name } from "../tui/src/tui_ffi.mjs";

const cliDir = dirname(dirname(fileURLToPath(import.meta.url)));
const repositoryRoot = dirname(cliDir);

test("release metadata is synchronized at 5.0.0 under MIT", async () => {
  const rootPackage = JSON.parse(
    await readFile(join(repositoryRoot, "package.json"), "utf8"),
  );
  const cliPackage = JSON.parse(
    await readFile(join(cliDir, "package.json"), "utf8"),
  );
  const gleamToml = await readFile(join(repositoryRoot, "gleam.toml"), "utf8");
  const templateGleamToml = await readFile(
    join(cliDir, "template", "gleam.toml"),
    "utf8",
  );
  const tuiGleamToml = await readFile(join(cliDir, "tui", "gleam.toml"), "utf8");
  const packageXml = await readFile(
    join(repositoryRoot, "src", "package.xml"),
    "utf8",
  );
  const license = await readFile(join(repositoryRoot, "LICENSE"), "utf8");
  const cliLicense = await readFile(join(cliDir, "LICENSE"), "utf8");

  assert.equal(rootPackage.version, "5.0.0");
  assert.equal(cliPackage.version, rootPackage.version);
  assert.match(gleamToml, /^version = "5\.0\.0"$/m);
  assert.match(packageXml, /clientModule name="MendixWidget" version="5\.0\.0"/);
  assert.equal(rootPackage.license, "MIT");
  assert.equal(cliPackage.license, "MIT");
  assert.match(gleamToml, /^licences = \["MIT"\]$/m);
  assert.match(templateGleamToml, /^licences = \["MIT"\]$/m);
  assert.match(tuiGleamToml, /^licences = \["MIT"\]$/m);
  assert.match(license, /^MIT License\n/);
  assert.doesNotMatch(license, /Apache License/);
  assert.equal(cliLicense, license);
});

test("generated licenses use the canonical MIT grant", () => {
  const license = generateLicenseContent("2026 Example contributors");
  assert.match(license, /^MIT License\n\nCopyright \(c\) 2026 Example contributors/);
  assert.match(license, /Permission is hereby granted, free of charge/);
  assert.doesNotMatch(license, /Apache|Blue Oak|GNU GENERAL|Mozilla Public/);
});

test("TUI conflict checks use the generated kebab-case directory", () => {
  assert.equal(target_directory_name("MyWidget"), "my-widget");
  assert.equal(target_directory_name("My_Widget"), "my-widget");
  assert.equal(target_directory_name("my-widget"), "my-widget");
});
