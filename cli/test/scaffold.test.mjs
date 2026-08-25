import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import {
  access,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  writeFile,
} from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";

import { getTemplateComments } from "../src/i18n.mjs";
import { generateNames } from "../src/naming.mjs";
import { scaffold } from "../src/scaffold.mjs";
import {
  generateAgentsMdContent,
  generateClaudeMdContent,
} from "../src/templates/claude_md.mjs";
import { generateReadmeContent } from "../src/templates/readme_md.mjs";

const cliDir = dirname(dirname(fileURLToPath(import.meta.url)));
const templateDir = join(cliDir, "template");
let temporaryRoot;

before(async () => {
  temporaryRoot = await mkdtemp(join(tmpdir(), "mwg-scaffold-test-"));
});

after(async () => {
  await rm(temporaryRoot, { recursive: true, force: true });
});

function options(overrides = {}) {
  return {
    organization: "example",
    copyright: '© 2026 "Quoted" contributors.',
    license: "Apache-2.0",
    version: "0.1.0",
    author: 'A "Quoted" Author',
    projectPath: "./tests/a\\b",
    packageManager: "bun",
    ...overrides,
  };
}

test("template scaffolding is ordered, escaped, current, and docs-free", async () => {
  const target = join(temporaryRoot, "success");
  const repeatedTarget = join(temporaryRoot, "success-repeated");
  const names = generateNames("Quote_Widget");
  const created = await scaffold(
    templateDir,
    target,
    names,
    getTemplateComments("en"),
    options(),
  );

  assert.deepEqual(
    await scaffold(
      templateDir,
      repeatedTarget,
      names,
      getTemplateComments("en"),
      options(),
    ),
    created,
  );
  assert.equal(created.some(path => path.startsWith("docs/")), false);
  await assert.rejects(access(join(target, "docs")));

  const packageJson = JSON.parse(await readFile(join(target, "package.json")));
  assert.equal(packageJson.author, 'A "Quoted" Author');
  assert.equal(packageJson.copyright, '© 2026 "Quoted" contributors.');
  assert.equal(packageJson.config.projectPath, "./tests/a\\b");
  assert.equal(packageJson.engines.node, "^22.18.0");
  assert.equal(packageJson.devDependencies["@mendix/pluggable-widgets-tools"], "^11.12.1");

  const gleamToml = await readFile(join(target, "gleam.toml"), "utf8");
  assert.match(gleamToml, /glendix = ">= 5\.0\.0 and < 6\.0\.0"/);
  assert.match(gleamToml, /mendraw = ">= 2\.0\.0 and < 3\.0\.0"/);
  assert.match(gleamToml, /pm = "bun"/);

  const codexConfig = await readFile(join(target, ".codex/config.toml"), "utf8");
  assert.match(codexConfig, /"MENDIX_\*" = "exclude"/);
  assert.doesNotMatch(codexConfig, /^(model|sandbox_mode|approval_policy)\s*=/m);

  for (const relativePath of created) {
    const content = await readFile(join(target, relativePath), "utf8");
    assert.doesNotMatch(content, /\{\{(?:[A-Z][A-Z0-9_]*|I18N:\w+)\}\}/);
  }
});

test("generated agent guidance uses current boundaries and completion gates", () => {
  const names = generateNames("Agent_Widget");
  const agents = generateAgentsMdContent("en", names, "pnpm", "example");
  const claude = generateClaudeMdContent("en", names, "pnpm", "example");
  const readme = generateReadmeContent("en", names, "pnpm", "Apache-2.0");

  assert.equal(agents, claude);
  assert.match(agents, /\[tools\.glendix\]\.pm = "pnpm"/);
  assert.match(agents, /mxp install/);
  assert.match(agents, /Do not claim Mendix or browser compatibility/);
  assert.doesNotMatch(agents, /docs\/glendix_guide|mendraw\/marketplace/);
  assert.match(readme, /\[tools\.glendix\.bindings\]/);
  assert.match(readme, /result\.try\(binding\.module/);
  assert.doesNotMatch(readme, /docs\/glendix_guide|mendraw\/marketplace/);
});

test("an empty template produces an empty result", async () => {
  const source = join(temporaryRoot, "empty-source");
  const target = join(temporaryRoot, "empty-target");
  await mkdir(source);
  assert.deepEqual(
    await scaffold(source, target, generateNames("Empty"), {}, options()),
    [],
  );
});

test("unresolved placeholders fail with file context", async () => {
  const source = join(temporaryRoot, "unresolved-source");
  const target = join(temporaryRoot, "unresolved-target");
  await mkdir(source);
  await writeFile(join(source, "broken.txt"), "{{UNKNOWN_VALUE}}\n");
  await assert.rejects(
    scaffold(source, target, generateNames("Broken"), {}, options()),
    /Unresolved template placeholder \{\{UNKNOWN_VALUE\}\} in broken\.txt/,
  );
  await assert.rejects(access(target));
});

test("post-substitution path collisions fail before overwrite", async () => {
  const source = join(temporaryRoot, "collision-source");
  const target = join(temporaryRoot, "collision-target");
  await mkdir(source);
  await writeFile(join(source, "__WidgetName__.txt"), "first\n");
  await writeFile(join(source, "Collision.txt"), "second\n");
  await assert.rejects(
    scaffold(source, target, generateNames("Collision"), {}, options()),
    /Template paths collide after substitution: Collision\.txt/,
  );
  await assert.rejects(access(target));
});
