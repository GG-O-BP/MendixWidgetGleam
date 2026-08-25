# MendixWidgetGleam

[English](README.md) | **한국어** | [日本語](README.ja.md)

Gleam으로 만든 Mendix Pluggable Widget 기준 프로젝트와 생성기다. 기본 위젯은
Glendix의 React 브리지를 통해 상태를 가진 Lustre 컴포넌트를 렌더링하고,
Mendraw로 Mendix 런타임 값을 타입 안전하게 읽는다.

## 현재 기준

- Gleam 1.17 이상
- Hex의 Glendix 5.1.0 / Mendraw 2.x
- Lustre 5.7 / Redraw 19.2
- 현재 저장소는 Bun 1.4, 생성 프로젝트는 Node.js 22.18 이상·Deno 2.9·Yarn·
  pnpm도 선택 가능
- Mendix Pluggable Widgets Tools 11.12 / React 19.2

## 실험적 네이티브 호환

현재 기준 프로젝트와 모든 생성 프로젝트는 다음 모드를 명시적으로 선택한다.

```toml
[tools.glendix]
pm = "bun" # npm, yarn, pnpm, bun, deno
compatibility = "experimental-native"
```

Glendix는 npm·Yarn·pnpm 프로젝트를 Node로, Bun 프로젝트를 Bun으로, Deno
프로젝트를 Deno로 실행한다. 프로세스 범위의 임시 `node`/`npm`/`npx` shim이
Mendix 도구의 강제 버전 검사를 만족시키고 지원하는 패키지 매니저 호출을 선택한
매니저로 전달한다. 매 명령 후 shim을 제거하며 전역 도구를 바꾸지 않는다. 따라서
Node를 계속 사용하는 Yarn과 pnpm도 이 우회를 거치고, Bun과 Deno 위젯 빌드
경로에는 Node나 npm이 필요하지 않다.

생성기는 필요에 따라 npm `allowScripts`, Bun `trustedDependencies`, Yarn
`node-modules` linker, pnpm의 선택적 Babel public hoist와 native build-script
allowlist, Deno 권한/allowlist를 만든다. 의존 패키지 모듈은 항상 선택한
`--runtime`을 명시해 실행한다.

## 패키지 경계

- **Glendix**: 위젯 빌드, definition 편집, 외부 npm 바인딩, Lustre→React 브리지
- **Mendraw**: Mendix client value와 이미 설치된 MPK 자산의 생성 바인딩
- **mxpak**: Marketplace 검색·다운로드·캐시·락파일
- **Glendam**: Glendix Family 워크스페이스의 브라우저 자동화

Marketplace 전체 흐름은 `mxp install` → `mendraw/install` →
`glendix/install` → `glendix/build` 순서다.

## 시작

```sh
gleam run -m glendix/install --runtime bun
gleam test --runtime bun
gleam run -m glendix/build --runtime bun
```

마지막 명령은 `dist/` 아래에 `.mpk`를 만든다.

```sh
gleam format --check src test cli/tui/src
gleam check
gleam build --warnings-as-errors
gleam docs build
npm --prefix cli run build:tui
bun run --cwd cli test
```

## 위젯 구조

Mendix 런타임은 다음 Gleam 함수를 React 함수형 컴포넌트로 호출한다.

```gleam
pub fn widget(props: mendix.JsProps) -> redraw.Element
```

`src/components/counter.gleam`은 `glendix/lustre.use_simple`로 model/update를
관리하며 런타임 진입점과 Studio Pro preview가 같은 컴포넌트를 사용한다.
빈 label fallback과 순서가 있는 상태 전이는 Gleam 테스트로 검증한다.

## 외부 React 컴포넌트

npm 패키지를 설치하고 `gleam.toml`에 export를 등록한다.

```toml
[tools.glendix.bindings]
recharts = ["PieChart", "Pie", "Tooltip"]
```

Glendix 5.1.0의 `binding.module`/`binding.resolve`는 `Result`를 반환한다. 바인딩을
변경한 뒤 `gleam run -m glendix/install --runtime bun`을 다시 실행한다.

## 프로젝트 생성기

```sh
npx create-mendix-widget-gleam my-widget
```

CLI는 위젯, 테스트, `AGENTS.md`, 프로젝트 범위 `.codex/config.toml`을 만들고
npm·Yarn·pnpm·Bun·Deno 중 선택한 경로로 의존성 설치와 MPK 빌드까지 검증한다.
설치나 packaging이 실패하면 성공으로 보고하지 않고 non-zero로 종료한다.

## E2E 검증

Glendix Family 워크스페이스에서는 다음 경로를 사용한다.

```sh
../scripts/family.sh widget-build "$PWD"
../scripts/family.sh downstream-e2e
```

다운스트림 경로는 현재 위젯, CLI 생성 프로젝트, MPK 검사, Lustre 브라우저,
관리형 Mendix 런타임을 검증한다. 이 경로가 통과하지 않으면 브라우저/Mendix
호환성을 주장하지 않는다.

## 라이선스

[Apache License 2.0](LICENSE)
