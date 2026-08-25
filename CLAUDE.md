# MendixWidgetGleam

Gleam으로 Mendix Pluggable Widget과 스캐폴딩 CLI를 개발한다. 현재 기준은
Glendix 5, Mendraw 2, Lustre 5.7, Redraw 19.2, Mendix Tools 11.12, React 19.2다.

## Commands

```sh
gleam deps download
gleam format --check src test cli/tui/src
gleam check
gleam build --warnings-as-errors
gleam docs build
gleam test --runtime bun
npm --prefix cli run build:tui
bun --cwd cli test
bun --cwd cli run test:e2e
gleam run -m glendix/install --runtime bun
gleam run -m glendix/build --runtime bun
../scripts/family.sh widget-build "$PWD"
../scripts/family.sh downstream-e2e
```

## Hard rules

- 위젯 로직/UI는 Gleam으로 작성한다. JSX, 프로젝트 로컬 React/Mendix FFI,
  수동 `src/*.js` bridge를 추가하지 않는다.
- Glendix는 build/definition/npm binding/Lustre bridge를, Mendraw는 Mendix
  client value와 설치된 MPK binding을, mxpak은 Marketplace 설치를 담당한다.
- Marketplace 명령은 `mxp install`이며 Mendraw에서 검색/다운로드하지 않는다.
- `glendix`와 `mendraw`는 명시적인 요청 없이 sibling path로 바꾸지 않는다.
- `build/`, `dist/`, 생성 bridge/registry를 수동 편집하지 않는다.
- `mendix-token`과 모든 API key/token/secret을 출력하거나 저장하지 않는다.
- 브라우저 E2E는 Glendam을 사용하고 모든 runtime/browser/server를 정리한다.

## Source layout

- `src/mendix_widget_gleam.gleam`: Mendix runtime entry point
- `src/components/counter.gleam`: Lustre model/update/view와 React bridge
- `src/editor_config.gleam`: Studio Pro property configuration
- `src/editor_preview.gleam`: Studio Pro design preview
- `src/MendixWidget.xml`, `src/package.xml`: widget/MPK manifests
- `cli/`: `create-mendix-widget-gleam` 패키지
- `cli/template/`: 생성 프로젝트 원본; placeholder가 있으므로 생성 후 포맷한다
- `cli/tui/`: Etch 1.4 + etch_javascript 기반 prompt

## Completion

소스 체크만으로 MPK나 Mendix 호환성을 주장하지 않는다. 현재 프로젝트와 CLI가
생성한 프로젝트의 MPK를 각각 빌드/검사하고, UI 변경은 Lustre browser 및 관리형
Mendix runtime의 selector/text/click assertion까지 통과해야 완료다.
