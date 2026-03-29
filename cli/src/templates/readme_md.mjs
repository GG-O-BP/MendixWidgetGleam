/**
 * README.md template — 3 language versions
 */

export function generateReadmeContent(lang, names, pm, pmConfig, license) {
  const installCmd =
    pm === "npm"
      ? "npm install"
      : pm === "yarn"
        ? "yarn add"
        : pm === "pnpm"
          ? "pnpm add"
          : "bun add";

  switch (lang) {
    case "ko":
      return generateKo(names, pm, installCmd, license);
    case "ja":
      return generateJa(names, pm, installCmd, license);
    default:
      return generateEn(names, pm, installCmd, license);
  }
}

// ---------------------------------------------------------------------------
// English
// ---------------------------------------------------------------------------

function generateEn(names, pm, installCmd, license) {
  return `# ${names.pascalCase}

A Mendix Pluggable Widget written in Gleam.

## Core Principles

The Gleam function \`fn(JsProps) -> Element\` has the same signature as a React functional component. React bindings come from the \`redraw\`/\`redraw_dom\` packages, while mendraw handles Mendix API access and JS interop, so widget projects only need to focus on business logic.

\`\`\`gleam
// src/${names.snakeCase}.gleam
import mendraw/mendix.{type JsProps}
import redraw.{type Element}
import redraw/dom/attribute
import redraw/dom/html

pub fn widget(props: JsProps) -> Element {
  let sample_text = mendix.get_string_prop(props, "sampleText")
  html.div([attribute.class("widget-hello-world")], [
    html.text("Hello " <> sample_text),
  ])
}
\`\`\`

Mendix complex types can also be used type-safely from Gleam:

\`\`\`gleam
import mendraw/mendix.{type JsProps}
import mendraw/mendix/editable_value
import mendraw/mendix/action
import redraw.{type Element}

pub fn widget(props: JsProps) -> Element {
  // Access EditableValue
  let name_attr: EditableValue = mendix.get_prop_required(props, "name")
  let display = editable_value.display_value(name_attr)

  // Execute ActionValue
  let on_save: Option(ActionValue) = mendix.get_prop(props, "onSave")
  action.execute_action(on_save)
  // ...
}
\`\`\`

## Getting Started

### Prerequisites

- [Gleam](https://gleam.run/getting-started/installing/) (latest version)
- [Node.js](https://nodejs.org/) (v18+)
- ${pm}

### Installation

\`\`\`bash
gleam run -m glendix/install
\`\`\`

### Development

\`\`\`bash
gleam run -m glendix/dev
\`\`\`

### Build

\`\`\`bash
gleam run -m glendix/build
\`\`\`

Build artifacts (\`.mpk\`) are generated in the \`dist/\` directory.

### Other Commands

\`\`\`bash
gleam run -m glendix/start      # Link with Mendix test project
gleam run -m glendix/lint       # Run ESLint
gleam run -m glendix/lint_fix   # ESLint auto-fix
gleam run -m glendix/release    # Release build
gleam run -m mendraw/marketplace # Search/download Marketplace widgets
gleam run -m glendix/define     # Widget property definition TUI editor
gleam build --target javascript # Gleam → JS compilation only
gleam test                      # Run tests
gleam format                    # Format code
\`\`\`

## Project Structure

\`\`\`
src/
  ${names.snakeCase}.gleam           # Main widget module
  editor_config.gleam              # Studio Pro property panel
  editor_preview.gleam             # Studio Pro design view preview
  components/
    hello_world.gleam            # Shared Hello World component
  ${names.pascalCase}.xml            # Widget property definitions
package.json                       # npm dependencies (React, external libraries, etc.)
\`\`\`

React bindings come from [redraw](https://hexdocs.pm/redraw/)/[redraw_dom](https://hexdocs.pm/redraw_dom/), Mendix API bindings from [mendraw](https://hexdocs.pm/mendraw/), and JS Interop from [glendix](https://hexdocs.pm/glendix/).

## Using External React Components

React component libraries distributed as npm packages can be used from pure Gleam without writing any \`.mjs\` FFI files.

### Step 1: Install the npm package

\`\`\`bash
${installCmd} recharts
\`\`\`

### Step 2: Add bindings to \`gleam.toml\`

Add a \`[tools.glendix.bindings]\` section to your \`gleam.toml\`:

\`\`\`toml
[tools.glendix.bindings.recharts]
components = ["PieChart", "Pie", "Cell", "Tooltip", "ResponsiveContainer"]
\`\`\`

### Step 3: Generate bindings

\`\`\`bash
gleam run -m glendix/install
\`\`\`

\`binding_ffi.mjs\` is generated automatically. It is also regenerated on subsequent builds via \`gleam run -m glendix/build\`.

### Step 4: Use from Gleam

\`\`\`gleam
import glendix/binding
import mendraw/interop
import redraw.{type Element}
import redraw/dom/attribute.{type Attribute}

fn m() { binding.module("recharts") }

pub fn pie_chart(attrs: List(Attribute), children: List(Element)) -> Element {
  interop.component_el(binding.resolve(m(), "PieChart"), attrs, children)
}

pub fn tooltip(attrs: List(Attribute)) -> Element {
  interop.void_component_el(binding.resolve(m(), "Tooltip"), attrs)
}
\`\`\`

External React components follow the same calling pattern as \`html.div\`.

## Tech Stack

- **Gleam** → JavaScript compilation
- **[glendix](https://hexdocs.pm/glendix/)** — Build tools + JS Interop Gleam bindings
- **[mendraw](https://hexdocs.pm/mendraw/)** — Mendix API Gleam bindings
- **[redraw](https://hexdocs.pm/redraw/)** / **[redraw_dom](https://hexdocs.pm/redraw_dom/)** — React Gleam bindings
- **Mendix Pluggable Widget** (React 19)
- **${pm}** — Package manager

## License

${license}
`;
}

// ---------------------------------------------------------------------------
// Korean
// ---------------------------------------------------------------------------

function generateKo(names, pm, installCmd, license) {
  return `# ${names.pascalCase}

Gleam 언어로 작성된 Mendix Pluggable Widget.

## 핵심 원리

Gleam 함수 \`fn(JsProps) -> Element\`는 React 함수형 컴포넌트와 동일한 시그니처다. React 바인딩은 \`redraw\`/\`redraw_dom\` 패키지가, Mendix API 접근과 JS interop은 mendraw가 제공하므로, 위젯 프로젝트에서는 비즈니스 로직에만 집중하면 된다.

\`\`\`gleam
// src/${names.snakeCase}.gleam
import mendraw/mendix.{type JsProps}
import redraw.{type Element}
import redraw/dom/attribute
import redraw/dom/html

pub fn widget(props: JsProps) -> Element {
  let sample_text = mendix.get_string_prop(props, "sampleText")
  html.div([attribute.class("widget-hello-world")], [
    html.text("Hello " <> sample_text),
  ])
}
\`\`\`

Mendix 복합 타입도 Gleam에서 타입 안전하게 사용할 수 있다:

\`\`\`gleam
import mendraw/mendix.{type JsProps}
import mendraw/mendix/editable_value
import mendraw/mendix/action
import redraw.{type Element}

pub fn widget(props: JsProps) -> Element {
  // EditableValue 접근
  let name_attr: EditableValue = mendix.get_prop_required(props, "name")
  let display = editable_value.display_value(name_attr)

  // ActionValue 실행
  let on_save: Option(ActionValue) = mendix.get_prop(props, "onSave")
  action.execute_action(on_save)
  // ...
}
\`\`\`

## 시작하기

### 사전 요구사항

- [Gleam](https://gleam.run/getting-started/installing/) (최신 버전)
- [Node.js](https://nodejs.org/) (v18+)
- ${pm}

### 설치

\`\`\`bash
gleam run -m glendix/install
\`\`\`

### 개발

\`\`\`bash
gleam run -m glendix/dev
\`\`\`

### 빌드

\`\`\`bash
gleam run -m glendix/build
\`\`\`

빌드 결과물(\`.mpk\`)은 \`dist/\` 디렉토리에 생성됩니다.

### 기타 명령어

\`\`\`bash
gleam run -m glendix/start      # Mendix 테스트 프로젝트 연동
gleam run -m glendix/lint       # ESLint 실행
gleam run -m glendix/lint_fix   # ESLint 자동 수정
gleam run -m glendix/release    # 릴리즈 빌드
gleam run -m mendraw/marketplace # Marketplace 위젯 검색/다운로드
gleam run -m glendix/define     # 위젯 프로퍼티 정의 TUI 에디터
gleam build --target javascript # Gleam → JS 컴파일만
gleam test                      # 테스트 실행
gleam format                    # 코드 포맷팅
\`\`\`

## 프로젝트 구조

\`\`\`
src/
  ${names.snakeCase}.gleam           # 메인 위젯 모듈
  editor_config.gleam              # Studio Pro 속성 패널
  editor_preview.gleam             # Studio Pro 디자인 뷰 미리보기
  components/
    hello_world.gleam            # Hello World 공유 컴포넌트
  ${names.pascalCase}.xml            # 위젯 속성 정의
package.json                       # npm 의존성 (React, 외부 라이브러리 등)
\`\`\`

React 바인딩은 [redraw](https://hexdocs.pm/redraw/)/[redraw_dom](https://hexdocs.pm/redraw_dom/)이, Mendix API 바인딩은 [mendraw](https://hexdocs.pm/mendraw/)가, JS Interop은 [glendix](https://hexdocs.pm/glendix/)가 제공합니다.

## 외부 React 컴포넌트 사용

npm 패키지로 제공되는 React 컴포넌트 라이브러리를 \`.mjs\` FFI 파일 작성 없이 순수 Gleam에서 사용할 수 있다.

### 1단계: npm 패키지 설치

\`\`\`bash
${installCmd} recharts
\`\`\`

### 2단계: \`gleam.toml\`에 바인딩 추가

\`gleam.toml\`에 \`[tools.glendix.bindings]\` 섹션을 추가한다:

\`\`\`toml
[tools.glendix.bindings.recharts]
components = ["PieChart", "Pie", "Cell", "Tooltip", "ResponsiveContainer"]
\`\`\`

### 3단계: 바인딩 생성

\`\`\`bash
gleam run -m glendix/install
\`\`\`

\`binding_ffi.mjs\`가 자동 생성된다. 이후 \`gleam run -m glendix/build\` 등 빌드 시에도 자동 갱신된다.

### 4단계: Gleam에서 사용

\`\`\`gleam
import glendix/binding
import mendraw/interop
import redraw.{type Element}
import redraw/dom/attribute.{type Attribute}

fn m() { binding.module("recharts") }

pub fn pie_chart(attrs: List(Attribute), children: List(Element)) -> Element {
  interop.component_el(binding.resolve(m(), "PieChart"), attrs, children)
}

pub fn tooltip(attrs: List(Attribute)) -> Element {
  interop.void_component_el(binding.resolve(m(), "Tooltip"), attrs)
}
\`\`\`

\`html.div\`와 동일한 호출 패턴으로 외부 React 컴포넌트를 사용할 수 있다.

## 기술 스택

- **Gleam** → JavaScript 컴파일
- **[glendix](https://hexdocs.pm/glendix/)** — 빌드 도구 + JS Interop Gleam 바인딩
- **[mendraw](https://hexdocs.pm/mendraw/)** — Mendix API Gleam 바인딩
- **[redraw](https://hexdocs.pm/redraw/)** / **[redraw_dom](https://hexdocs.pm/redraw_dom/)** — React Gleam 바인딩
- **Mendix Pluggable Widget** (React 19)
- **${pm}** — 패키지 매니저

## 라이센스

${license}
`;
}

// ---------------------------------------------------------------------------
// Japanese
// ---------------------------------------------------------------------------

function generateJa(names, pm, installCmd, license) {
  return `# ${names.pascalCase}

Gleam言語で作成されたMendix Pluggable Widget。

## 基本原理

Gleam関数 \`fn(JsProps) -> Element\` はReact関数コンポーネントと同一のシグネチャを持つ。Reactバインディングは\`redraw\`/\`redraw_dom\`パッケージが、Mendix APIアクセスとJS interopはmendrawが提供するため、ウィジェットプロジェクトではビジネスロジックにのみ集中すればよい。

\`\`\`gleam
// src/${names.snakeCase}.gleam
import mendraw/mendix.{type JsProps}
import redraw.{type Element}
import redraw/dom/attribute
import redraw/dom/html

pub fn widget(props: JsProps) -> Element {
  let sample_text = mendix.get_string_prop(props, "sampleText")
  html.div([attribute.class("widget-hello-world")], [
    html.text("Hello " <> sample_text),
  ])
}
\`\`\`

Mendixの複合型もGleamから型安全に使用できる：

\`\`\`gleam
import mendraw/mendix.{type JsProps}
import mendraw/mendix/editable_value
import mendraw/mendix/action
import redraw.{type Element}

pub fn widget(props: JsProps) -> Element {
  // EditableValueへのアクセス
  let name_attr: EditableValue = mendix.get_prop_required(props, "name")
  let display = editable_value.display_value(name_attr)

  // ActionValueの実行
  let on_save: Option(ActionValue) = mendix.get_prop(props, "onSave")
  action.execute_action(on_save)
  // ...
}
\`\`\`

## はじめに

### 前提条件

- [Gleam](https://gleam.run/getting-started/installing/)（最新バージョン）
- [Node.js](https://nodejs.org/)（v18以上）
- ${pm}

### インストール

\`\`\`bash
gleam run -m glendix/install
\`\`\`

### 開発

\`\`\`bash
gleam run -m glendix/dev
\`\`\`

### ビルド

\`\`\`bash
gleam run -m glendix/build
\`\`\`

ビルド成果物（\`.mpk\`）は\`dist/\`ディレクトリに生成される。

### その他のコマンド

\`\`\`bash
gleam run -m glendix/start      # Mendixテストプロジェクト連携
gleam run -m glendix/lint       # ESLint実行
gleam run -m glendix/lint_fix   # ESLint自動修正
gleam run -m glendix/release    # リリースビルド
gleam run -m mendraw/marketplace # Marketplaceウィジェット検索/ダウンロード
gleam run -m glendix/define     # ウィジェットプロパティ定義TUIエディター
gleam build --target javascript # Gleam → JSコンパイルのみ
gleam test                      # テスト実行
gleam format                    # コードフォーマット
\`\`\`

## プロジェクト構成

\`\`\`
src/
  ${names.snakeCase}.gleam           # メインウィジェットモジュール
  editor_config.gleam              # Studio Proプロパティパネル
  editor_preview.gleam             # Studio Proデザインビュープレビュー
  components/
    hello_world.gleam            # Hello World共有コンポーネント
  ${names.pascalCase}.xml            # ウィジェットプロパティ定義
package.json                       # npm依存関係（React、外部ライブラリなど）
\`\`\`

Reactバインディングは[redraw](https://hexdocs.pm/redraw/)/[redraw_dom](https://hexdocs.pm/redraw_dom/)が、Mendix APIバインディングは[mendraw](https://hexdocs.pm/mendraw/)が、JS Interopは[glendix](https://hexdocs.pm/glendix/)が提供する。

## 外部Reactコンポーネントの使用

npmパッケージとして提供されるReactコンポーネントライブラリを、\`.mjs\` FFIファイルを書くことなく純粋なGleamから使用できる。

### ステップ1：npmパッケージのインストール

\`\`\`bash
${installCmd} recharts
\`\`\`

### ステップ2：\`gleam.toml\`にバインディングを追加

\`gleam.toml\`に\`[tools.glendix.bindings]\`セクションを追加する：

\`\`\`toml
[tools.glendix.bindings.recharts]
components = ["PieChart", "Pie", "Cell", "Tooltip", "ResponsiveContainer"]
\`\`\`

### ステップ3：バインディングの生成

\`\`\`bash
gleam run -m glendix/install
\`\`\`

\`binding_ffi.mjs\`が自動生成される。以降の\`gleam run -m glendix/build\`等のビルド時にも自動更新される。

### ステップ4：Gleamから使用

\`\`\`gleam
import glendix/binding
import mendraw/interop
import redraw.{type Element}
import redraw/dom/attribute.{type Attribute}

fn m() { binding.module("recharts") }

pub fn pie_chart(attrs: List(Attribute), children: List(Element)) -> Element {
  interop.component_el(binding.resolve(m(), "PieChart"), attrs, children)
}

pub fn tooltip(attrs: List(Attribute)) -> Element {
  interop.void_component_el(binding.resolve(m(), "Tooltip"), attrs)
}
\`\`\`

\`html.div\`と同じ呼び出しパターンで外部Reactコンポーネントを使用できる。

## 技術スタック

- **Gleam** → JavaScriptコンパイル
- **[glendix](https://hexdocs.pm/glendix/)** — ビルドツール + JS Interop Gleamバインディング
- **[mendraw](https://hexdocs.pm/mendraw/)** — Mendix API Gleamバインディング
- **[redraw](https://hexdocs.pm/redraw/)** / **[redraw_dom](https://hexdocs.pm/redraw_dom/)** — React Gleamバインディング
- **Mendix Pluggable Widget**（React 19）
- **${pm}** — パッケージマネージャー

## ライセンス

${license}
`;
}
