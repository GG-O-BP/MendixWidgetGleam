# MendixWidgetGleam

**Gleam 언어로 Mendix Pluggable Widget을 개발하는 실험적 프로젝트.**

JSX를 사용하지 않고, Gleam 코드만으로 React 컴포넌트를 작성하여 Mendix Studio Pro에서 동작하는 위젯을 만든다. Gleam을 JavaScript로 컴파일하고, Gleam FFI로 React API를 직접 바인딩하는 방식이다.

## 왜 Gleam인가?

- **정적 타입 안전성** — Gleam의 강력한 타입 시스템으로 런타임 에러를 컴파일 타임에 방지
- **불변 데이터** — 예측 가능한 상태 관리
- **JavaScript 타겟 지원** — `gleam build --target javascript`로 ES 모듈 출력
- **최소한의 FFI** — React API를 얇은 어댑터로 노출하여 위젯 로직 전체를 Gleam으로 작성

## 아키텍처

```
src/
  widget/                             # Gleam 소스 코드
    mendix_widget_gleam.gleam         #   위젯 메인 모듈 (컴포넌트 로직)
    mendix_widget_gleam_ffi.mjs       #   React FFI 어댑터 (createElement 등)
    editor_config.gleam               #   Studio Pro 속성 패널 설정
  MendixWidgetGleam.js                # 브릿지 (Gleam 출력 → Mendix 진입점)
  MendixWidgetGleam.editorConfig.js   # 브릿지 (editorConfig)
  MendixWidgetGleam.xml               # 위젯 속성 정의
  package.xml                         # Mendix 패키지 매니페스트
```

### 빌드 파이프라인

```
Gleam 소스 (.gleam) + FFI 어댑터 (.ffi.mjs)
    ↓  gleam build --target javascript
ES 모듈 (.mjs) — build/dev/javascript/...
    ↓  브릿지 JS가 import
    ↓  Rollup (pluggable-widgets-tools)
.mpk 위젯 패키지 — dist/
```

### 핵심 원리

Gleam 함수 `fn(JsProps) -> ReactElement`는 React 함수형 컴포넌트와 동일한 시그니처다. FFI 파일은 `React.createElement` 같은 원시 함수를 노출하는 얇은 래퍼일 뿐, 위젯의 UI 구조와 로직은 전부 Gleam 코드로 작성된다.

```gleam
// src/widget/mendix_widget_gleam.gleam
pub fn widget(props: JsProps) -> ReactElement {
  let sample_text = get_string_prop(props, "sampleText")
  create_div("widget-hello-world", "Hello " <> sample_text)
}
```

## 시작하기

### 사전 요구사항

- [Gleam](https://gleam.run/getting-started/installing/) (v1.0+)
- [Bun](https://bun.sh/) (패키지 매니저)
- [Mendix Studio Pro](https://marketplace.mendix.com/link/studiopro/) (위젯 테스트용)

### 설치

```bash
bun install        # Node 의존성 설치
gleam deps download  # Gleam 의존성 다운로드
```

### 빌드

```bash
bun run build      # Gleam 컴파일 + 위젯 빌드 (.mpk 생성)
```

빌드 결과물은 `dist/` 디렉토리에 `.mpk` 파일로 생성된다.

### 개발

```bash
bun run dev        # Gleam 컴파일 + 개발 서버 (HMR, port 3000)
bun run start      # Mendix 테스트 프로젝트와 연동 개발
```

## 명령어 모음

| 명령어 | 설명 |
|--------|------|
| `bun install` | 의존성 설치 |
| `bun run build` | 프로덕션 빌드 (.mpk 생성) |
| `bun run dev` | 개발 서버 (HMR) |
| `bun run start` | Mendix 테스트 프로젝트 연동 |
| `bun run lint` | ESLint 실행 |
| `bun run lint:fix` | ESLint 자동 수정 |
| `bun run release` | 릴리즈 빌드 |
| `gleam build --target javascript` | Gleam → JS 컴파일 |
| `gleam test` | Gleam 테스트 실행 |

## 기술 스택

- **Gleam** — 위젯 로직 및 UI (JavaScript 타겟 컴파일)
- **Gleam FFI** — React API 바인딩 (`@external` + `.ffi.mjs`)
- **React 19** — Mendix Pluggable Widget 런타임
- **Bun** — 패키지 매니저
- **Rollup** — `@mendix/pluggable-widgets-tools` 기반 번들링

## 제약사항

- Gleam → JS → Mendix Widget 파이프라인은 공식 지원되지 않는 실험적 조합이다
- JSX 파일을 사용하지 않는다 — 모든 React 로직은 Gleam + FFI로 구현
- Redraw 등 외부 Gleam React 라이브러리는 사용하지 않는다
- FFI 파일에는 React API 노출만 작성하고, 비즈니스 로직은 반드시 Gleam으로 작성

## 라이선스

Apache License 2.0 — [LICENSE](./LICENSE) 참조
