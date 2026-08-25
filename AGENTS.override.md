# MendixWidgetGleam Codex instructions

This repository contains both the checked-in reference widget and the
`create-mendix-widget-gleam` CLI. Keep their source, templates, documentation,
and verification paths synchronized.

## Boundaries

- Write widget behavior in Gleam. Do not add JSX, project-local React/Mendix
  FFI, or hand-written generated bridges under `src/*.js`.
- Glendix 5 owns build, definition, external npm binding, and Lustre bridging;
  Mendraw 2 owns Mendix client values and bindings for installed MPKs; mxpak
  owns Marketplace installation.
- Preserve the published Hex sources for `glendix` and `mendraw` unless the
  user explicitly requests another source.
- Keep edits to the reference widget mirrored in `cli/template/` when they
  affect newly generated projects. Validate templates after substitution.
- Never edit generated `build/`, `dist/`, bridge, or registry files by hand.
- Never print or persist Mendix tokens, API keys, or other secrets.

## Required checks

```sh
gleam format --check src test cli/tui/src
gleam check
gleam build --warnings-as-errors
gleam test --runtime bun
npm --prefix cli run build:tui
bun --cwd cli test
bun --cwd cli run test:e2e
../scripts/family.sh downstream-check
```

For UI or shared-boundary work, run `../scripts/family.sh downstream-e2e`.
Do not claim MPK, Lustre, Mendix, or browser compatibility unless the matching
build and browser path passed end to end and cleaned up its processes.
