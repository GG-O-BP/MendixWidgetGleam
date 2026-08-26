# MendixWidgetGleam

**English** | [한국어](README.ko.md) | [日本語](README.ja.md)

A reference Mendix Pluggable Widget and project generator built with Gleam.
The widget demonstrates a stateful Lustre component rendered through Glendix's
React bridge, while Mendraw supplies typed access to Mendix runtime values.

## Current baseline

- Gleam 1.17 or newer
- Glendix 5.1.0 and Mendraw 2.x from Hex
- Lustre 5.7 and Redraw 19.2
- Source release line 5.0.0 across the Gleam package, CLI, and widget metadata
- Bun 1.4 for this checked-in project; generated projects may instead use
  Node.js 22.18 or newer, Deno 2.9, Yarn, or pnpm
- Mendix Pluggable Widgets Tools 11.12 and React 19.2

## Experimental native compatibility

The reference project and every generated project opt in explicitly:

```toml
[tools.glendix]
pm = "bun" # npm, yarn, pnpm, bun, or deno
compatibility = "experimental-native"
```

Glendix runs npm, Yarn, and pnpm projects on Node; Bun projects on Bun; and Deno
projects on Deno. Temporary process-scoped `node`/`npm`/`npx` shims satisfy the
Mendix tool's mandatory version checks and route its supported package-manager
calls to the selected manager. The shims are removed after each command and do
not replace global tools. Therefore Yarn and pnpm also use the bypass even
though they still use Node; Bun and Deno do not require Node or npm for the
widget build path.

The generator emits npm's `allowScripts`, Bun's `trustedDependencies`, Yarn's
`node-modules` linker and selective lifecycle-script allowlist, pnpm's selective
Babel public hoist and native build-script allowlist, and Deno
permissions/allowlist as appropriate.
Dependency modules are always invoked with an explicit matching `--runtime`.

## Package boundaries

- **Glendix** owns widget build orchestration, definition editing, external npm
  bindings, and the Lustre-to-React bridge.
- **Mendraw** owns Mendix client values and generated bindings for already
  installed MPK assets.
- **mxpak** owns Marketplace search, downloads, caching, and lockfiles.
- **Glendam** owns browser automation in the Glendix Family workspace.

Marketplace access is therefore not a Mendraw command. The complete optional
flow is `mxp install`, `mendraw/install`, `glendix/install`, then
`glendix/build`.

## Start

```sh
gleam run -m glendix/install --runtime bun
gleam test --runtime bun
gleam run -m glendix/build --runtime bun
```

The final command creates a validated widget package below `dist/`.

Useful development commands:

```sh
gleam format --check src test cli/tui/src
gleam check
gleam build --warnings-as-errors
gleam docs build
gleam run -m glendix/dev --runtime bun
gleam run -m glendix/define --runtime bun
npm --prefix cli run build:tui
bun run --cwd cli test
```

## Widget architecture

The Mendix runtime calls the following Gleam signature as a React functional
component:

```gleam
pub fn widget(props: mendix.JsProps) -> redraw.Element
```

`src/components/counter.gleam` uses `glendix/lustre.use_simple` to keep its own
model and update function. The same component is rendered by the runtime entry
point and Studio Pro preview. Its empty label fallback and ordered state
transitions are covered by Gleam tests.

```text
src/*.gleam
  -> Gleam JavaScript modules
  -> Glendix-generated widget bridge
  -> Mendix Pluggable Widgets Tools / Rollup
  -> dist/*.mpk
```

## External React components

Install the npm package and list the exports in `gleam.toml`:

```toml
[tools.glendix.bindings]
recharts = ["PieChart", "Pie", "Tooltip"]
```

Glendix 5.1.0 returns typed lookup errors:

```gleam
import gleam/result
import glendix/binding
import redraw
import redraw/dom/attribute

pub fn pie_chart(
  attributes: List(attribute.Attribute),
  children: List(redraw.Element),
) -> Result(redraw.Element, binding.BindingError) {
  use module <- result.try(binding.module("recharts"))
  use component <- result.try(binding.resolve(module, "PieChart"))
  Ok(binding.element(component, attributes, children))
}
```

Run `gleam run -m glendix/install --runtime bun` again after changing npm
bindings.

## Project generator

```sh
npx create-mendix-widget-gleam my-widget
```

The command above installs npm's published `latest` release. Registry
publication and Git tagging remain explicit release steps, so they may trail
the synchronized 5.0.0 source metadata on `main`.

The CLI generates the widget, tests, `AGENTS.md`, and project-scoped
`.codex/config.toml`, then installs dependencies and proves that the generated
project builds an MPK with the selected npm, Yarn, pnpm, Bun, or Deno path. It
exits non-zero when installation or packaging fails.

## End-to-end verification

Inside the Glendix Family workspace, run:

```sh
../scripts/family.sh widget-build "$PWD"
../scripts/family.sh downstream-e2e
```

The downstream route covers the checked-in widget, CLI-generated project,
MPK inspection, Lustre browser embedding, and the managed Mendix runtime path.
Do not claim browser or Mendix compatibility unless that route passes.

## License

[MIT License](LICENSE)
