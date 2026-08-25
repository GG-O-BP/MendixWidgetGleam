# MendixWidgetGleam

[English](README.md) | [한국어](README.ko.md) | **日本語**

Gleamで作るMendix Pluggable Widgetのリファレンスとプロジェクト生成CLI。
スターターはGlendixのReact bridgeで状態を持つLustre componentを描画し、
MendrawでMendix runtime valueへ型安全にアクセスする。

## 現在の基準

- Gleam 1.17以上
- HexのGlendix 5.x / Mendraw 2.x
- Lustre 5.7 / Redraw 19.2
- Node.js 22.18.x
- Mendix Pluggable Widgets Tools 11.12 / React 19.2

## パッケージ境界

- **Glendix**：widget build、definition編集、外部npm binding、Lustre→React bridge
- **Mendraw**：Mendix client valueとインストール済みMPK assetの生成binding
- **mxpak**：Marketplace検索、download、cache、lockfile
- **Glendam**：Glendix Family workspaceのbrowser automation

Marketplaceの順序は `mxp install` → `mendraw/install` → `glendix/install` →
`glendix/build`。

## 開始

```sh
gleam run -m glendix/install
gleam test --runtime bun
gleam run -m glendix/build --runtime bun
```

最後のコマンドが`dist/`以下に`.mpk`を生成する。

```sh
gleam format --check src test cli/tui/src
gleam check
gleam build --warnings-as-errors
gleam docs build
npm --prefix cli run build:tui
bun --cwd cli test
```

## Widget構成

Mendix runtimeは次のGleam関数をReact functional componentとして呼び出す。

```gleam
pub fn widget(props: mendix.JsProps) -> redraw.Element
```

`src/components/counter.gleam`は`glendix/lustre.use_simple`でmodel/updateを
管理し、runtime entry pointとStudio Pro previewが同じcomponentを利用する。
空labelのfallbackと順序付きstate transitionはGleam testで検証する。

## 外部React component

npm packageを追加し、`gleam.toml`にexportを登録する。

```toml
[tools.glendix.bindings]
recharts = ["PieChart", "Pie", "Tooltip"]
```

Glendix 5の`binding.module`/`binding.resolve`は`Result`を返す。binding変更後は
`gleam run -m glendix/install`を再実行する。

## Project generator

```sh
npx create-mendix-widget-gleam my-widget
```

CLIはwidget、test、`AGENTS.md`、project scoped `.codex/config.toml`を生成し、
dependency installとMPK buildまで確認する。install/packageが失敗した場合は
non-zeroで終了する。

## E2E検証

Glendix Family workspaceでは次を実行する。

```sh
../scripts/family.sh widget-build "$PWD"
../scripts/family.sh downstream-e2e
```

downstream routeは現在のwidget、CLI生成project、MPK検査、Lustre browser、
managed Mendix runtimeを検証する。このrouteが成功しない限りbrowser/Mendix
互換性を主張しない。

## License

[Apache License 2.0](LICENSE)
