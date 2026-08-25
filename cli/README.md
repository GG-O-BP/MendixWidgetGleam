# create-mendix-widget-gleam

Gleam으로 Mendix Pluggable Widget 프로젝트를 만드는 대화형 CLI다.

```sh
npx create-mendix-widget-gleam my-widget
```

## 요구사항

- Gleam 1.17 이상
- Node.js 22.18.x
- npm, yarn, pnpm, Bun 중 하나

CLI는 선택한 패키지 매니저를 `[tools.glendix].pm`에 기록하고 다음 기준으로
프로젝트를 만든다.

- Glendix 5.x / Mendraw 2.x
- Lustre 5.7 / Redraw 19.2
- Mendix Pluggable Widgets Tools 11.12 / React 19.2
- Lustre 카운터와 상태 전이 테스트
- 프로젝트 범위 `.codex/config.toml`과 `AGENTS.md`

생성 후 `glendix/install`과 `glendix/build`를 실행하므로 `.mpk` packaging까지
성공해야 CLI가 0으로 종료한다.

## 생성 구조

```text
my-widget/
  .codex/config.toml
  AGENTS.md
  CLAUDE.md
  README.md
  gleam.toml
  package.json
  src/
    my_widget.gleam
    editor_config.gleam
    editor_preview.gleam
    components/counter.gleam
    MyWidget.xml
    package.xml
  test/counter_test.gleam
```

## 개발

```sh
npm run build:tui
bun test
bun run test:e2e
```

`test:e2e`는 임시 프로젝트를 생성하고 placeholder/Codex 설정을 검사한 뒤,
Gleam 테스트와 실제 MPK 빌드를 실행한다.

Marketplace 위젯이 필요한 생성 프로젝트에서는 `mxp install`로 자산을 설치하고
`gleam run -m mendraw/install`로 바인딩을 만든다. Marketplace 검색/다운로드는
Mendraw의 책임이 아니다.

외부 npm React 컴포넌트는 아래 형식으로 등록한다.

```toml
[tools.glendix.bindings]
recharts = ["PieChart", "Pie", "Tooltip"]
```

## 라이선스

Apache-2.0
