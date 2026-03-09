# create-mendix-widget-gleam

Gleam 언어로 Mendix Pluggable Widget 프로젝트를 스케폴딩하는 CLI 도구.

JSX 없이, **오직 Gleam + FFI**로 React 컴포넌트를 작성하여 Mendix Studio Pro에서 동작하는 위젯을 만든다.

## 사용법

```bash
npx create-mendix-widget-gleam my-widget
```

대화형 프롬프트를 통해 프로젝트명과 패키지 매니저를 선택하면, 즉시 개발 가능한 위젯 프로젝트가 생성된다.

## 사전 요구사항

- [Gleam](https://gleam.run/getting-started/installing/) (최신 버전)
- [Node.js](https://nodejs.org/) (v18+)

## 생성되는 프로젝트 구조

```
my-widget/
  src/
    widget/                    # Gleam 위젯 코드
      my_widget.gleam          #   메인 위젯 모듈
      react_ffi.mjs            #   React FFI 어댑터
      mendix_ffi.mjs           #   Mendix FFI 어댑터
      react.gleam + react/     #   React 바인딩 (타입, Props, Hooks, HTML)
      mendix.gleam + mendix/   #   Mendix API 바인딩 (전체 Pluggable Widget API)
      editor_config.gleam      #   Studio Pro 속성 패널
    scripts/                   #   빌드/개발 스크립트
  gleam.toml                   # Gleam 프로젝트 설정
  CLAUDE.md                    # AI 어시스턴트용 프로젝트 컨텍스트
```

## 생성 후 시작하기

```bash
cd my-widget
gleam run -m scripts/install   # 의존성 설치
gleam run -m scripts/dev       # 개발 서버 시작
gleam run -m scripts/build     # 프로덕션 빌드 (.mpk 생성)
```

## 포함된 Mendix API 바인딩

생성된 프로젝트에는 Mendix Pluggable Widget API 전체에 대한 Gleam 바인딩이 포함되어 있다:

- **EditableValue** — 텍스트, 숫자, 날짜 등 편집 가능한 값
- **ActionValue** — 마이크로플로우/나노플로우 실행
- **ListValue** — 데이터 목록 (필터, 정렬, 페이지네이션)
- **SelectionValue** — 단일/다중 선택
- **ReferenceValue** — 연관 관계 (단일/다중 참조)
- **JsDate / Big** — JS Date, Big.js 고정밀 십진수 래퍼
- **Filter** — 필터 조건 빌더
- **그 외** — DynamicValue, FileValue, WebIcon, ValueFormatter 등

## 라이선스

Apache-2.0
