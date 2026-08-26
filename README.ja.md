# MendixWidgetGleam

[English](README.md) | [한국어](README.ko.md) | **日本語**

Gleamで作るMendix Pluggable Widgetのリファレンスとプロジェクト生成CLI。
スターターはGlendixのReact bridgeで状態を持つLustre componentを描画し、
MendrawでMendix runtime valueへ型安全にアクセスする。

## 現在の基準

- Gleam 1.17以上
- HexのGlendix 5.1.0 / Mendraw 2.x
- Lustre 5.7 / Redraw 19.2
- Gleam package・CLI・widget metadata の source release version はすべて 5.0.0
- このリポジトリは Bun 1.4、生成 project は Node.js 22.x の 22.20 以降・
  24.12 以降・25 以降、または Deno 2.9・Yarn・pnpm も選択可能
- Mendix Pluggable Widgets Tools 11.12 / React 19.2

## 実験的ネイティブ互換

reference project とすべての生成 project は次のモードを明示的に選択する。

```toml
[tools.glendix]
pm = "bun" # npm, yarn, pnpm, bun, deno
compatibility = "experimental-native"
```

Glendix は npm・Yarn・pnpm project を Node、Bun project を Bun、Deno project
を Deno で実行する。process scoped の一時 `node`/`npm`/`npx` shim が Mendix
tool の強制 version check を満たし、対応する package-manager call を選択した
manager へ転送する。各 command 後に shim を削除し、global tool は置き換えない。
したがって Node を使い続ける Yarn と pnpm もこの bypass を通り、Bun と Deno
の widget build path は Node や npm を必要としない。

generator は必要に応じて npm `allowScripts`、Bun `trustedDependencies`、
Yarn の `node-modules` linker と選択的 lifecycle-script allowlist、pnpm の
選択的 Babel public hoist と native build-script allowlist、Deno の
permission/allowlist を生成する。dependency module は必ず選択した
`--runtime` を明示して実行する。

## パッケージ境界

- **Glendix**：widget build、definition編集、外部npm binding、Lustre→React bridge
- **Mendraw**：Mendix client valueとインストール済みMPK assetの生成binding
- **mxpak**：Marketplace検索、download、cache、lockfile
- **Glendam**：Glendix Family workspaceのbrowser automation

Marketplaceの順序は `mxp install` → `mendraw/install` → `glendix/install` →
`glendix/build`。

## 開始

```sh
gleam run -m glendix/install --runtime bun
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
bun run --cwd cli test
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

Glendix 5.1.0の`binding.module`/`binding.resolve`は`Result`を返す。binding変更後は
`gleam run -m glendix/install --runtime bun`を再実行する。

## Project generator

```sh
npx create-mendix-widget-gleam my-widget
```

上の command は npm で公開済みの `latest` を install する。registry publish と
Git tag は明示的な別 release step のため、`main` で同期した 5.0.0 source
metadata より遅れる場合がある。

CLIはwidget、test、`AGENTS.md`、project scoped `.codex/config.toml`を生成し、
npm・Yarn・pnpm・Bun・Denoから選択した path で dependency install と MPK
build まで確認する。install/package が失敗した場合は non-zero で終了する。

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

[MIT License](LICENSE)
