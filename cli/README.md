# create-mendix-widget-gleam

Gleam으로 Mendix Pluggable Widget 프로젝트를 만드는 대화형 CLI다.

`main`의 CLI·Gleam 패키지·위젯 릴리스 메타데이터는 5.0.0으로 맞춘다. npm 게시와
Git tag는 별도 릴리스 단계이며, 아래 실행 명령은 npm에 게시된 `latest`를 사용한다.

```sh
npx create-mendix-widget-gleam my-widget
```

같은 CLI를 선택한 도구로 시작할 수도 있다.

```sh
yarn dlx create-mendix-widget-gleam my-widget
pnpm dlx create-mendix-widget-gleam my-widget
bunx create-mendix-widget-gleam my-widget
deno x -A -p create-mendix-widget-gleam create-mendix-widget-gleam my-widget
```

## 요구사항

- Gleam 1.17 이상
- npm·Yarn·pnpm은 Node.js 22.x의 22.20 이상, 24.12 이상 또는 25 이상과 해당
  매니저
- 또는 Bun 1.4 이상, Deno 2.9 이상

CLI는 npm, Yarn, pnpm, Bun, Deno 중 선택한 패키지 매니저를
`[tools.glendix].pm`에 기록하고 모든 생성 프로젝트에
`compatibility = "experimental-native"`를 설정한다. npm/Yarn/pnpm은 Node,
Bun은 Bun, Deno는 Deno 런타임을 사용하며 모든 Glendix 명령에 일치하는
`--runtime`을 명시한다.

Glendix의 임시 프로세스 범위 `node`/`npm`/`npx` shim은 Mendix Tools의 강제
검사를 만족시키고 지원하는 호출을 선택한 매니저로 돌려보낸 뒤 제거된다. Yarn과
pnpm도 이 우회를 사용하지만 실제 실행 런타임은 Node다. Bun/Deno 경로는 Node나
npm 없이 빌드할 수 있다. 생성기는 npm `allowScripts`, Bun
`trustedDependencies`, Yarn용 `.yarnrc.yml`과 선택적 lifecycle-script
allowlist, pnpm용 `pnpm-workspace.yaml`, Deno용 Gleam 권한/설치 allowlist를 함께
만든다. pnpm 설정은 Mendix Tools의 Babel plugin 해석을 위한 선택적 `@babel/*`
public hoist도 포함한다.

생성 기준은 다음과 같다.

- Glendix 5.1.0 / Mendraw 2.x
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
Gleam 테스트와 실제 MPK 빌드를 실행한다. `GLENDIX_E2E_PM`을 `npm`, `yarn`,
`pnpm`, `bun`, `deno` 중 하나로 지정하면 해당 경로를 검증한다.

Marketplace 위젯이 필요한 생성 프로젝트에서는 `mxp install`로 자산을 설치하고
`gleam run -m mendraw/install`로 바인딩을 만든다. Marketplace 검색/다운로드는
Mendraw의 책임이 아니다.

외부 npm React 컴포넌트는 아래 형식으로 등록한다.

```toml
[tools.glendix.bindings]
recharts = ["PieChart", "Pie", "Tooltip"]
```

## 라이선스

MIT
