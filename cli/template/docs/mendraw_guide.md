# mendraw 사용 가이드

Mendix 위젯 Gleam/[redraw](https://hexdocs.pm/redraw/) 바인딩 라이브러리.
Classic(Dojo) 위젯 지원과 Marketplace 검색/다운로드 기능을 제공한다.

---

## 목차

- [사전 준비](#사전-준비)
- [설치](#설치)
- [Marketplace에서 위젯 다운로드](#marketplace에서-위젯-다운로드)
- [Classic (Dojo) 위젯](#classic-dojo-위젯)
  - [Classic 위젯 직접 렌더링](#classic-위젯-직접-렌더링)
- [JsProps 다루기](#jsprops-다루기)
  - [Prop 접근자](#prop-접근자)
  - [ValueStatus](#valuestatus)
  - [Option 변환](#option-변환)
- [API 레퍼런스](#api-레퍼런스)
  - [mendraw/mendix](#mendrawmendix)
  - [mendraw/interop](#mendrawinterop)
  - [mendraw/classic](#mendrawclassic)
  - [mendraw/marketplace](#mendrawmarketplace)
- [glendix 프로젝트에서 사용하기](#glendix-프로젝트에서-사용하기)
- [문제 해결](#문제-해결)

---

## 사전 준비

- [Gleam](https://gleam.run/) v1.15 이상
- [Erlang/OTP](https://www.erlang.org/) 28 이상
- Gleam 프로젝트의 타겟이 `javascript`여야 한다 (`gleam.toml`의 `target = "javascript"`)
- [redraw](https://hexdocs.pm/redraw/) 기반 UI 프로젝트

---

## 설치

```sh
gleam add mendraw@1
```

`gleam.toml`에 다음 의존성이 추가된다:

```toml
[dependencies]
mendraw = ">= 1.1.11 and < 2.0.0"
```

mendraw는 `gleam_stdlib`, `gleam_javascript`, `redraw`, `redraw_dom`을 함께 가져온다.
이미 프로젝트에 이들이 있다면 버전 호환성만 확인하면 된다.

---

## Marketplace에서 위젯 다운로드

Mendix Marketplace에서 위젯을 검색하고 다운로드할 수 있는 TUI를 제공한다.

### 사전 설정

`.env` 파일에 Mendix Personal Access Token을 설정한다:

```
MENDIX_PAT=your_personal_access_token
```

PAT는 Mendix Portal → Settings → Personal Access Tokens에서 발급한다.
필요한 scope: `mx:marketplace-content:read`

### 실행

```sh
gleam run -m mendraw/marketplace
```

### TUI 모드 (터미널)

터미널에서 실행하면 인터랙티브 TUI가 표시된다:

| 키 | 동작 |
|---|---|
| `↑` `↓` | 위젯 목록 이동 |
| `←` `→` | 페이지 이동 |
| `Space` | 위젯 선택/해제 (복수 선택) |
| `Enter` | 선택한 위젯 다운로드 → 버전 선택 화면 |
| `Esc` | 검색/선택 초기화 |
| 문자 입력 | 이름/퍼블리셔 검색 |
| `q` | 종료 |

버전 선택 화면에서:

| 키 | 동작 |
|---|---|
| `↑` `↓` | 버전 이동 |
| `Enter` | 선택한 버전 다운로드 |
| `Esc` | 목록으로 돌아가기 |

### 프롬프트 모드 (비-TTY)

파이프 등 비-TTY 환경에서는 텍스트 프롬프트 모드로 동작한다:

```
> 0        ← 0번 위젯 다운로드
> 0,3,5    ← 여러 위젯 동시 선택
> switch   ← "switch" 검색
> n        ← 다음 페이지
> p        ← 이전 페이지
> r        ← 검색 초기화
> q        ← 종료
```

### 다운로드 후

다운로드한 위젯은 `gleam.toml`의 `[tools.mendraw.widgets.*]`에 자동 추가된다.

> **참고**: 첫 다운로드 시 chrobot_extra 사이드카를 통한 Mendix 로그인이 필요할 수 있다.
> 로그인 세션은 `.marketplace-cache/session.json`에 캐시된다.
> 사이드카가 처음 실행될 때 자동으로 설정된다 (Erlang/OTP가 필요).

---

## Classic (Dojo) 위젯

### Classic 위젯 직접 렌더링

```gleam
import mendraw/classic

// 기본 렌더링
classic.render("CameraWidget.widget.CameraWidget", [
  #("mfToExecute", classic.to_dynamic(mf_value)),
  #("preferRearCamera", classic.to_dynamic(True)),
])

// CSS 클래스 지정
classic.render_with_class(
  "CameraWidget.widget.CameraWidget",
  [#("mfToExecute", classic.to_dynamic(mf_value))],
  "my-camera-wrapper",
)
```

`widget_id`는 Classic 위젯의 정규화된 ID이다 (예: `"CameraWidget.widget.CameraWidget"`).

---

## JsProps 다루기

Mendix 런타임이 위젯에 전달하는 props 객체를 `JsProps` 타입으로 다룬다.

### Prop 접근자

```gleam
import mendraw/mendix.{type JsProps}
import gleam/option.{type Option, None, Some}

fn handle_props(props: JsProps) {
  // 필수 속성 — 항상 존재한다고 가정
  let name: String = mendix.get_prop_required(props, "name")

  // 선택 속성 — 없으면 None
  let caption: Option(String) = mendix.get_prop(props, "caption")

  // 문자열 속성 — 없으면 빈 문자열 ""
  let label: String = mendix.get_string_prop(props, "label")

  // 속성 존재 여부 확인
  let has_icon: Bool = mendix.has_prop(props, "icon")
}
```

| 함수 | 반환 타입 | 없을 때 |
|------|----------|---------|
| `get_prop_required(props, key)` | `a` | 런타임 에러 |
| `get_prop(props, key)` | `Option(a)` | `None` |
| `get_string_prop(props, key)` | `String` | `""` |
| `has_prop(props, key)` | `Bool` | `False` |

### ValueStatus

Mendix의 `DynamicValue`, `EditableValue` 등은 `status` 속성을 가진다.
데이터 로딩 상태를 확인할 때 사용한다:

```gleam
import mendraw/mendix

let value = mendix.get_prop_required(props, "textAttr")

case mendix.get_status(value) {
  mendix.Available -> // 값 사용 가능
    use_value(value)
  mendix.Loading -> // 로딩 중
    show_spinner()
  mendix.Unavailable -> // 사용 불가
    show_placeholder()
}
```

### Option 변환

JS/Gleam 경계에서 `undefined`/`null`을 안전하게 처리한다:

```gleam
import mendraw/mendix

// JS undefined/null → Gleam None, 값이 있으면 Some(값)
let maybe_value = mendix.to_option(js_value)

// Gleam Option → JS 값 (None → undefined)
let js_value = mendix.from_option(gleam_option)
```

---

## API 레퍼런스

### mendraw/mendix

Mendix Pluggable Widget API의 핵심 타입과 props 접근자.

#### 타입

| 타입 | 설명 |
|------|------|
| `JsProps` | Mendix가 위젯에 전달하는 props 객체 (opaque) |
| `ValueStatus` | `Available \| Unavailable \| Loading` |
| `ObjectItem` | Mendix 데이터 객체 (opaque) |

#### 함수

| 함수 | 시그니처 | 설명 |
|------|----------|------|
| `get_prop` | `(JsProps, String) -> Option(a)` | 선택 속성 추출 (없으면 `None`) |
| `get_prop_required` | `(JsProps, String) -> a` | 필수 속성 추출 |
| `get_string_prop` | `(JsProps, String) -> String` | 문자열 속성 (없으면 `""`) |
| `has_prop` | `(JsProps, String) -> Bool` | 속성 존재 여부 |
| `get_status` | `(a) -> ValueStatus` | 값 객체의 로딩 상태 |
| `object_id` | `(ObjectItem) -> String` | 데이터 객체 ID |
| `to_value_status` | `(String) -> ValueStatus` | 문자열 → `ValueStatus` 변환 |
| `to_option` | `(a) -> Option(a)` | JS undefined/null → `None` |
| `from_option` | `(Option(a)) -> a` | Gleam `Option` → JS 값 (`None` → undefined) |

### mendraw/interop

외부 JS React 컴포넌트를 redraw Element로 변환하는 브릿지.

| 함수 | 시그니처 | 설명 |
|------|----------|------|
| `component_el` | `(JsComponent, List(Attribute), List(Element)) -> Element` | 속성 + 자식으로 렌더링 |
| `component_el_` | `(JsComponent, List(Element)) -> Element` | 자식만으로 렌더링 |
| `void_component_el` | `(JsComponent, List(Attribute)) -> Element` | self-closing 렌더링 |

#### 타입

| 타입 | 설명 |
|------|------|
| `JsComponent` | 외부 React 컴포넌트 참조 (opaque) |

### mendraw/classic

Classic (Dojo) 위젯을 React 내부에서 렌더링.

| 함수 | 시그니처 | 설명 |
|------|----------|------|
| `render` | `(String, List(#(String, Dynamic))) -> Element` | Classic 위젯 렌더링 |
| `render_with_class` | `(String, List(#(String, Dynamic)), String) -> Element` | CSS 클래스 지정 렌더링 |
| `to_dynamic` | `(a) -> Dynamic` | 값을 `Dynamic`으로 변환 |

### mendraw/cmd

위젯 바인딩 생성 + TOML 위젯 관리 API.

| 함수 | 시그니처 | 설명 |
|------|----------|------|
| `file_exists` | `(String) -> Bool` | 파일 존재 여부 |
| `resolve_toml_widgets` | `() -> Nil` | gleam.toml [tools.mendraw.widgets.*] 다운로드 |
| `write_widget_toml` | `(String, String, Option(Int), Option(String)) -> Nil` | gleam.toml에 위젯 항목 쓰기 |

### mendraw/marketplace

Mendix Marketplace 위젯 검색·다운로드 TUI. `gleam run -m mendraw/marketplace`로 실행한다.

#### 주요 기능

| 기능 | 설명 |
|------|------|
| 위젯 검색 | 이름/퍼블리셔로 실시간 필터링 |
| 백그라운드 로딩 | 전체 위젯 목록을 백그라운드에서 점진적으로 로드 |
| 버전 선택 | Content API + chrobot_extra 사이드카(XAS)로 버전별 다운로드 정보 조회 |
| 자동 TOML 기록 | 다운로드 시 gleam.toml에 위젯 항목 자동 추가 |

#### 의존성

- `etch` — 터미널 raw mode, 커서 제어, ANSI 스타일링
- `chrobot_extra` — Mendix 로그인 세션 관리, 버전 다운로드 정보 추출 (HTTP 사이드카, Erlang 타겟)
- `curl` — Content API 호출 (시스템 명령)

---

## glendix 프로젝트에서 사용하기

[glendix](https://github.com/) 프로젝트에서 mendraw를 의존성으로 추가하면,
위젯 TOML 해석을 mendraw에 위임할 수 있다:

```gleam
// glendix의 install.gleam
import mendraw/cmd as mendraw_cmd

pub fn main() {
  cmd.exec(cmd.detect_install_command())
  cmd.generate_bindings()
  mendraw_cmd.resolve_toml_widgets()
}
```

---

## 문제 해결

### Classic 위젯이 렌더링되지 않는다

- Classic 위젯은 DOM 컨테이너를 생성하고 imperative하게 마운트한다
- `classic_ffi.mjs`가 빌드 경로에 정상적으로 생성되었는지 확인
- `widget_id`가 정확한지 확인 (예: `"CameraWidget.widget.CameraWidget"`)


사용자가 별도로 지정할 필요 없다.
