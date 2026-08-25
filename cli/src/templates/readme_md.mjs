/** README.md template for English, Korean, and Japanese projects. */

export function generateReadmeContent(lang, names, pm, license) {
  const addCommand = {
    npm: "npm install",
    yarn: "yarn add",
    pnpm: "pnpm add",
    bun: "bun add",
  }[pm] ?? "npm install";

  switch (lang) {
    case "ko":
      return generateKo(names, pm, addCommand, license);
    case "ja":
      return generateJa(names, pm, addCommand, license);
    default:
      return generateEn(names, pm, addCommand, license);
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
gleam.toml                     # Glendix 5 / Mendraw 2 dependencies
package.json                   # Mendix Tools 11.12 / React 19 dependencies
\`\`\``;
}

function bindingExample(addCommand) {
  return `\`\`\`sh
${addCommand} recharts
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
gleam run -m glendix/install
\`\`\``;
}

function generateEn(names, pm, addCommand, license) {
  return `# ${names.pascalCase}

A Mendix Pluggable Widget written in Gleam. The starter renders an interactive
Lustre counter through Glendix's React bridge and reads Mendix properties through
Mendraw.

## Requirements

- Gleam 1.17 or newer
- Node.js 22.18.x
- ${pm}
- Mendix Studio Pro when testing inside a Mendix application

## Start

\`\`\`sh
gleam run -m glendix/install
gleam test
gleam run -m glendix/build
\`\`\`

The build writes one or more \`.mpk\` files below \`dist/\`.

## Commands

| Command | Purpose |
| --- | --- |
| \`gleam run -m glendix/install\` | Install JavaScript dependencies and generate npm bindings |
| \`gleam run -m glendix/dev\` | Start the development build/server |
| \`gleam run -m glendix/build\` | Build and package the production MPK |
| \`gleam run -m glendix/start\` | Connect to the configured Mendix test project |
| \`gleam run -m glendix/define\` | Edit the widget property definition |
| \`gleam run -m glendix/lint\` | Run the Mendix toolchain lint task |
| \`gleam run -m glendix/release\` | Create a release build |
| \`gleam test\` | Run Gleam tests |

## Package boundaries

- [Glendix](https://hexdocs.pm/glendix/) owns Mendix build orchestration,
  external npm bindings, definition editing, and the Lustre bridge.
- [Mendraw](https://hexdocs.pm/mendraw/) owns Mendix client values and bindings
  generated from already-installed MPK assets.
- [mxpak](https://github.com/glendix-labs/mxpak) owns Marketplace search,
  downloads, caching, and lockfiles. For Marketplace widgets, run \`mxp install\`
  and then \`gleam run -m mendraw/install\` before the Glendix install/build steps.

## Project layout

${architecture(names)}

## External React components

${bindingExample(addCommand)}

Do not hand-write JSX or widget bridge files. The source entry point remains
\`fn(mendix.JsProps) -> redraw.Element\`, while Glendix generates the JavaScript
bridge consumed by Mendix Pluggable Widgets Tools.

## License

${license}
`;
}

function generateKo(names, pm, addCommand, license) {
  return `# ${names.pascalCase}

Gleam으로 작성한 Mendix Pluggable Widget이다. 기본 예제는 Glendix의 React
브리지를 통해 대화형 Lustre 카운터를 렌더링하고 Mendraw로 Mendix property를
읽는다.

## 요구사항

- Gleam 1.17 이상
- Node.js 22.18.x
- ${pm}
- Mendix 애플리케이션 안에서 검증할 때 Mendix Studio Pro

## 시작

\`\`\`sh
gleam run -m glendix/install
gleam test
gleam run -m glendix/build
\`\`\`

빌드 결과인 \`.mpk\`는 \`dist/\` 아래에 생성된다.

## 명령

| 명령 | 역할 |
| --- | --- |
| \`gleam run -m glendix/install\` | JavaScript 의존성 설치 및 npm 바인딩 생성 |
| \`gleam run -m glendix/dev\` | 개발 빌드/서버 시작 |
| \`gleam run -m glendix/build\` | production MPK 빌드 |
| \`gleam run -m glendix/start\` | 설정된 Mendix 테스트 프로젝트 연결 |
| \`gleam run -m glendix/define\` | 위젯 property 정의 편집 |
| \`gleam run -m glendix/lint\` | Mendix 도구 lint 실행 |
| \`gleam run -m glendix/release\` | release 빌드 생성 |
| \`gleam test\` | Gleam 테스트 실행 |

## 패키지 경계

- [Glendix](https://hexdocs.pm/glendix/): Mendix 빌드 실행, 외부 npm 바인딩,
  definition 편집, Lustre 브리지
- [Mendraw](https://hexdocs.pm/mendraw/): Mendix client value와 이미 설치된 MPK
  자산에서 생성하는 바인딩
- [mxpak](https://github.com/glendix-labs/mxpak): Marketplace 검색·다운로드·캐시·
  락파일. Marketplace 위젯은 \`mxp install\`, \`gleam run -m mendraw/install\`
  순서로 준비한 뒤 Glendix install/build를 실행한다.

## 프로젝트 구조

${architecture(names)}

## 외부 React 컴포넌트

${bindingExample(addCommand)}

JSX나 위젯 bridge 파일을 직접 작성하지 않는다. 소스 진입점은
\`fn(mendix.JsProps) -> redraw.Element\`이며, Mendix Pluggable Widgets Tools가
사용할 JavaScript bridge는 Glendix가 생성한다.

## 라이선스

${license}
`;
}

function generateJa(names, pm, addCommand, license) {
  return `# ${names.pascalCase}

Gleamで作成するMendix Pluggable Widget。スターターはGlendixのReactブリッジで
対話型Lustreカウンターを描画し、MendrawでMendix propertyを読み取る。

## 必要環境

- Gleam 1.17以上
- Node.js 22.18.x
- ${pm}
- Mendixアプリ内で検証する場合はMendix Studio Pro

## 開始

\`\`\`sh
gleam run -m glendix/install
gleam test
gleam run -m glendix/build
\`\`\`

ビルドされた\`.mpk\`は\`dist/\`以下に生成される。

## コマンド

| コマンド | 役割 |
| --- | --- |
| \`gleam run -m glendix/install\` | JavaScript依存関係とnpm bindingを生成 |
| \`gleam run -m glendix/dev\` | 開発ビルド/サーバーを開始 |
| \`gleam run -m glendix/build\` | production MPKをビルド |
| \`gleam run -m glendix/start\` | 設定済みMendixテストプロジェクトへ接続 |
| \`gleam run -m glendix/define\` | widget property定義を編集 |
| \`gleam run -m glendix/lint\` | Mendix toolchainのlintを実行 |
| \`gleam run -m glendix/release\` | releaseビルドを作成 |
| \`gleam test\` | Gleamテストを実行 |

## パッケージ境界

- [Glendix](https://hexdocs.pm/glendix/)：Mendixビルド、外部npm binding、
  definition編集、Lustre bridge
- [Mendraw](https://hexdocs.pm/mendraw/)：Mendix client valueとインストール済み
  MPK assetから生成するbinding
- [mxpak](https://github.com/glendix-labs/mxpak)：Marketplace検索、ダウンロード、
  cache、lockfile。Marketplace widgetは\`mxp install\`、
  \`gleam run -m mendraw/install\`の後にGlendix install/buildを実行する。

## プロジェクト構成

${architecture(names)}

## 外部Reactコンポーネント

${bindingExample(addCommand)}

JSXやwidget bridgeファイルを手書きしない。ソースのentry pointは
\`fn(mendix.JsProps) -> redraw.Element\`であり、Mendix Pluggable Widgets Toolsが
利用するJavaScript bridgeはGlendixが生成する。

## ライセンス

${license}
`;
}
