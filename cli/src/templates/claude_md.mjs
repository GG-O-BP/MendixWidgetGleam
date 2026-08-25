/** Project instructions shared by generated AGENTS.md and CLAUDE.md files. */

const COMMENT_LANG_INSTRUCTIONS = {
  en: "Use English comments.",
  ko: "Use Korean comments.",
  ja: "Use Japanese comments.",
};

function generateInstructions(lang, names, pm, organization) {
  const commentInstruction =
    COMMENT_LANG_INSTRUCTIONS[lang] ?? COMMENT_LANG_INSTRUCTIONS.en;
  const runtime = pm === "bun" || pm === "deno" ? pm : "node";

  return `# ${names.pascalCase} agent instructions

This repository builds a Mendix Pluggable Widget from Gleam. The widget uses
Glendix 5.1.0 for build orchestration and the Lustre bridge, Mendraw 2 for Mendix
client values, and Redraw for the React element boundary.

## Invariants

- Write widget behavior in Gleam. Do not add JSX, hand-written widget bridge
  files under \`src/*.js\`, or project-local React/Mendix FFI.
- Keep \`glendix\` and \`mendraw\` as published Hex requirements unless the user
  explicitly requests another source.
- Keep \`[tools.glendix].pm = "${pm}"\`; it makes install/build commands use the
  package manager selected when this project was created.
- Keep \`[tools.glendix].compatibility = "experimental-native"\`; Glendix uses
  process-scoped Node/npm shims for Mendix Pluggable Widgets Tools and removes
  them after each command.
- Glendix owns build commands and external npm bindings. Mendraw owns Mendix
  values and generated bindings for already-installed MPKs. Marketplace search
  and installation belong to the standalone mxpak/\`mxp\` tool.
- Never edit \`build/\`, \`dist/\`, generated \`src/*.js\`, or generated binding
  registries by hand.
- ${commentInstruction}
- Never print or persist Mendix tokens, API keys, or other secrets.

## Commands

\`\`\`sh
gleam deps download
gleam format --check src test
gleam check
gleam build --warnings-as-errors
gleam test --runtime ${runtime}
gleam run -m glendix/install --runtime ${runtime}
gleam run -m glendix/build --runtime ${runtime}
gleam run -m glendix/dev --runtime ${runtime}
gleam run -m glendix/define --runtime ${runtime}
\`\`\`

For an external npm component, install the npm package, add its exports under
\`[tools.glendix.bindings]\`, then rerun \`glendix/install\`. For a Marketplace
MPK, run \`mxp install\` first and
\`gleam run -m mendraw/install --runtime ${runtime}\` second.

## Boundaries and verification

- Widget entry point: \`pub fn widget(props: mendix.JsProps) -> redraw.Element\`.
- Widget ID: \`${organization}.${names.lowerCase}.${names.pascalCase}\`.
- Keep \`src/${names.pascalCase}.xml\`, \`src/package.xml\`, \`package.json\`, and
  the Gleam entry module consistent when names, versions, paths, or properties
  change.
- Cover success, error, empty, boundary, ordering, and cleanup behavior where
  applicable.
- A source check is not an MPK check. Build and inspect the produced \`dist/*.mpk\`.
- Do not claim Mendix or browser compatibility until the corresponding runtime
  and browser assertions have passed end to end.
`;
}

export function generateAgentsMdContent(lang, names, pm, organization) {
  return generateInstructions(lang, names, pm, organization);
}

export function generateClaudeMdContent(lang, names, pm, organization) {
  return generateInstructions(lang, names, pm, organization);
}
