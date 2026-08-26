/** README.md template for English, Korean, and Japanese projects. */

export function generateReadmeContent(lang, names, pm) {
  const runtime = pm === "bun" || pm === "deno" ? pm : "node";
  const addCommand = {
    npm: "npm install recharts",
    yarn: "yarn add recharts",
    pnpm: "pnpm add recharts",
    bun: "bun add recharts",
    deno: "deno add npm:recharts",
  }[pm] ?? "npm install recharts";
  const runtimeRequirement = {
    npm: "Node.js 22.20+ on 22.x, 24.12+, or 25+, and npm",
    yarn: "Node.js 22.20+ on 22.x, 24.12+, or 25+, and Yarn",
    pnpm: "Node.js 22.20+ on 22.x, 24.12+, or 25+, and pnpm",
    bun: "Bun 1.4 or newer",
    deno: "Deno 2.9 or newer",
  }[pm] ?? "Node.js 22.20+ on 22.x, 24.12+, or 25+, and npm";

  switch (lang) {
    case "ko":
      return generateKo(names, addCommand, runtime, runtimeRequirement);
    case "ja":
      return generateJa(names, addCommand, runtime, runtimeRequirement);
    default:
      return generateEn(names, addCommand, runtime, runtimeRequirement);
  }
}

function architecture(names) {
  return `\`\`\`
src/
  ${names.snakeCase}.gleam       # Mendix runtime entry point
  editor_config.gleam          # Studio Pro property configuration
  editor_preview.gleam         # Studio Pro design preview
  components/counter.gleam     # Interactive Lustre component
  ${names.pascalCase}.xml        # Widget definition
  package.xml                  # MPK manifest
test/counter_test.gleam        # State-transition tests
.codex/config.toml             # Project-scoped Codex policy
AGENTS.md                      # Agent invariants and verification contract
gleam.toml                     # Glendix 5.1.0 / Mendraw 2 dependencies
package.json                   # Mendix Tools 11.12 / React 19 dependencies
\`\`\``;
}

function bindingExample(addCommand, runtime) {
  return `\`\`\`sh
${addCommand}
\`\`\`

\`\`\`toml
[tools.glendix.bindings]
recharts = ["PieChart", "Pie", "Tooltip"]
\`\`\`

\`\`\`gleam
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
\`\`\`

Regenerate the binding after installation:

\`\`\`sh
gleam run -m glendix/install --runtime ${runtime}
\`\`\``;
}

function generateEn(names, addCommand, runtime, runtimeRequirement) {
  return `# ${names.pascalCase}

A Mendix Pluggable Widget written in Gleam. The starter renders an interactive
Lustre counter through Glendix's React bridge and reads Mendix properties through
Mendraw.

## Requirements

- Gleam 1.17 or newer
- ${runtimeRequirement}
- Mendix Studio Pro when testing inside a Mendix application

This project sets \`[tools.glendix].compatibility = "experimental-native"\`.
Glendix runs Mendix Pluggable Widgets Tools with temporary, process-scoped
Node/npm shims and removes them after the command finishes.
The generated package-manager configuration permits only the lifecycle scripts
needed by the Mendix toolchain where the selected manager requires approval.

## Start

\`\`\`sh
gleam run -m glendix/install --runtime ${runtime}
gleam test --runtime ${runtime}
gleam run -m glendix/build --runtime ${runtime}
\`\`\`

The build writes one or more \`.mpk\` files below \`dist/\`.

## Commands

| Command | Purpose |
| --- | --- |
| \`gleam run -m glendix/install --runtime ${runtime}\` | Install JavaScript dependencies and generate npm bindings |
| \`gleam run -m glendix/dev --runtime ${runtime}\` | Start the development build/server |
| \`gleam run -m glendix/build --runtime ${runtime}\` | Build and package the production MPK |
| \`gleam run -m glendix/start --runtime ${runtime}\` | Connect to the configured Mendix test project |
| \`gleam run -m glendix/define --runtime ${runtime}\` | Edit the widget property definition |
| \`gleam run -m glendix/lint --runtime ${runtime}\` | Run the Mendix toolchain lint task |
| \`gleam run -m glendix/release --runtime ${runtime}\` | Create a release build |
| \`gleam test --runtime ${runtime}\` | Run Gleam tests |

## Package boundaries

- [Glendix](https://hexdocs.pm/glendix/) owns Mendix build orchestration,
  external npm bindings, definition editing, and the Lustre bridge.
- [Mendraw](https://hexdocs.pm/mendraw/) owns Mendix client values and bindings
  generated from already-installed MPK assets.
- [mxpak](https://github.com/glendix-labs/mxpak) owns Marketplace search,
  downloads, caching, and lockfiles. For Marketplace widgets, run \`mxp install\`
  and then \`gleam run -m mendraw/install --runtime ${runtime}\` before the
  Glendix install/build steps.

## Project layout

${architecture(names)}

## External React components

${bindingExample(addCommand, runtime)}

Do not hand-write JSX or widget bridge files. The source entry point remains
\`fn(mendix.JsProps) -> redraw.Element\`, while Glendix generates the JavaScript
bridge consumed by Mendix Pluggable Widgets Tools.

## License

MIT
`;
}

function generateKo(names, addCommand, runtime, runtimeRequirement) {
  return `# ${names.pascalCase}

Gleam으로 작성한 Mendix Pluggable Widget이다. 기본 예제는 Glendix의 React
브리지를 통해 대화형 Lustre 카운터를 렌더링하고 Mendraw로 Mendix property를
읽는다.

## 요구사항

- Gleam 1.17 이상
- ${runtimeRequirement}
- Mendix 애플리케이션 안에서 검증할 때 Mendix Studio Pro

이 프로젝트는 \`[tools.glendix].compatibility = "experimental-native"\`를
사용한다. Glendix는 Mendix Pluggable Widgets Tools를 실행할 때만 임시 Node/npm
shim을 적용하고 명령이 끝나면 제거한다.
생성된 패키지 매니저 설정은 선택한 매니저가 승인을 요구할 때 Mendix 도구 체인에
필요한 lifecycle script만 허용한다.

## 시작

\`\`\`sh
gleam run -m glendix/install --runtime ${runtime}
gleam test --runtime ${runtime}
gleam run -m glendix/build --runtime ${runtime}
\`\`\`

빌드 결과인 \`.mpk\`는 \`dist/\` 아래에 생성된다.

## 명령

| 명령 | 역할 |
| --- | --- |
| \`gleam run -m glendix/install --runtime ${runtime}\` | JavaScript 의존성 설치 및 npm 바인딩 생성 |
| \`gleam run -m glendix/dev --runtime ${runtime}\` | 개발 빌드/서버 시작 |
| \`gleam run -m glendix/build --runtime ${runtime}\` | production MPK 빌드 |
| \`gleam run -m glendix/start --runtime ${runtime}\` | 설정된 Mendix 테스트 프로젝트 연결 |
| \`gleam run -m glendix/define --runtime ${runtime}\` | 위젯 property 정의 편집 |
| \`gleam run -m glendix/lint --runtime ${runtime}\` | Mendix 도구 lint 실행 |
| \`gleam run -m glendix/release --runtime ${runtime}\` | release 빌드 생성 |
| \`gleam test --runtime ${runtime}\` | Gleam 테스트 실행 |

## 패키지 경계

- [Glendix](https://hexdocs.pm/glendix/): Mendix 빌드 실행, 외부 npm 바인딩,
  definition 편집, Lustre 브리지
- [Mendraw](https://hexdocs.pm/mendraw/): Mendix client value와 이미 설치된 MPK
  자산에서 생성하는 바인딩
- [mxpak](https://github.com/glendix-labs/mxpak): Marketplace 검색·다운로드·캐시·
  락파일. Marketplace 위젯은 \`mxp install\`,
  \`gleam run -m mendraw/install --runtime ${runtime}\` 순서로 준비한 뒤 Glendix
  install/build를 실행한다.

## 프로젝트 구조

${architecture(names)}

## 외부 React 컴포넌트

${bindingExample(addCommand, runtime)}

JSX나 위젯 bridge 파일을 직접 작성하지 않는다. 소스 진입점은
\`fn(mendix.JsProps) -> redraw.Element\`이며, Mendix Pluggable Widgets Tools가
사용할 JavaScript bridge는 Glendix가 생성한다.

## 라이선스

MIT
`;
}

function generateJa(names, addCommand, runtime, runtimeRequirement) {
  return `# ${names.pascalCase}

Gleamで作成するMendix Pluggable Widget。スターターはGlendixのReactブリッジで
対話型Lustreカウンターを描画し、MendrawでMendix propertyを読み取る。

## 必要環境

- Gleam 1.17以上
- ${runtimeRequirement}
- Mendixアプリ内で検証する場合はMendix Studio Pro

このプロジェクトは\`[tools.glendix].compatibility = "experimental-native"\`を
使用する。GlendixはMendix Pluggable Widgets Toolsの実行時だけ一時的な
Node/npm shimを適用し、コマンド終了時に削除する。
生成されたパッケージマネージャー設定は、選択した manager が承認を要求する
場合に Mendix toolchain が必要とする lifecycle script だけを許可する。

## 開始

\`\`\`sh
gleam run -m glendix/install --runtime ${runtime}
gleam test --runtime ${runtime}
gleam run -m glendix/build --runtime ${runtime}
\`\`\`

ビルドされた\`.mpk\`は\`dist/\`以下に生成される。

## コマンド

| コマンド | 役割 |
| --- | --- |
| \`gleam run -m glendix/install --runtime ${runtime}\` | JavaScript依存関係とnpm bindingを生成 |
| \`gleam run -m glendix/dev --runtime ${runtime}\` | 開発ビルド/サーバーを開始 |
| \`gleam run -m glendix/build --runtime ${runtime}\` | production MPKをビルド |
| \`gleam run -m glendix/start --runtime ${runtime}\` | 設定済みMendixテストプロジェクトへ接続 |
| \`gleam run -m glendix/define --runtime ${runtime}\` | widget property定義を編集 |
| \`gleam run -m glendix/lint --runtime ${runtime}\` | Mendix toolchainのlintを実行 |
| \`gleam run -m glendix/release --runtime ${runtime}\` | releaseビルドを作成 |
| \`gleam test --runtime ${runtime}\` | Gleamテストを実行 |

## パッケージ境界

- [Glendix](https://hexdocs.pm/glendix/)：Mendixビルド、外部npm binding、
  definition編集、Lustre bridge
- [Mendraw](https://hexdocs.pm/mendraw/)：Mendix client valueとインストール済み
  MPK assetから生成するbinding
- [mxpak](https://github.com/glendix-labs/mxpak)：Marketplace検索、ダウンロード、
  cache、lockfile。Marketplace widgetは\`mxp install\`、
  \`gleam run -m mendraw/install --runtime ${runtime}\`の後にGlendix
  install/buildを実行する。

## プロジェクト構成

${architecture(names)}

## 外部Reactコンポーネント

${bindingExample(addCommand, runtime)}

JSXやwidget bridgeファイルを手書きしない。ソースのentry pointは
\`fn(mendix.JsProps) -> redraw.Element\`であり、Mendix Pluggable Widgets Toolsが
利用するJavaScript bridgeはGlendixが生成する。

## ライセンス

MIT
`;
}
