// React 핵심 타입 + createElement + fragment/text/none

import gleam/option.{type Option, None, Some}

// === Opaque 타입 ===

/// React가 렌더링하는 요소
pub type ReactElement

/// Mendix가 전달하는 props 객체
pub type JsProps

/// React 컴포넌트 참조
pub type Component

/// React ref 객체
pub type Ref(a)

// Props 타입 (react/prop 모듈에서 빌더 제공)
pub type Props

// === 요소 생성 FFI 바인딩 ===

/// 범용 HTML 요소 생성
@external(javascript, "./react_ffi.mjs", "create_element")
pub fn el(tag: String, props: Props, children: List(ReactElement)) -> ReactElement

/// props 없이 자식만으로 요소 생성
@external(javascript, "./react_ffi.mjs", "create_element_no_props")
pub fn el_(tag: String, children: List(ReactElement)) -> ReactElement

/// self-closing 요소 (input, img, br 등)
@external(javascript, "./react_ffi.mjs", "create_void_element")
pub fn void(tag: String, props: Props) -> ReactElement

/// React 컴포넌트 합성
@external(javascript, "./react_ffi.mjs", "create_component")
pub fn component(
  comp: Component,
  props: Props,
  children: List(ReactElement),
) -> ReactElement

// === Fragment / null / text ===

/// Fragment로 여러 자식을 감싸기
@external(javascript, "./react_ffi.mjs", "fragment")
pub fn fragment(children: List(ReactElement)) -> ReactElement

/// key가 있는 Fragment
@external(javascript, "./react_ffi.mjs", "keyed_fragment")
pub fn keyed_fragment(key: String, children: List(ReactElement)) -> ReactElement

/// null 렌더링 (아무것도 표시하지 않음)
@external(javascript, "./react_ffi.mjs", "null_element")
pub fn none() -> ReactElement

/// 텍스트 노드
@external(javascript, "./react_ffi.mjs", "text")
pub fn text(content: String) -> ReactElement

// === 순수 Gleam 헬퍼 ===

/// Bool 기반 조건부 렌더링
pub fn when(condition: Bool, element_fn: fn() -> ReactElement) -> ReactElement {
  case condition {
    True -> element_fn()
    False -> none()
  }
}

/// Option 기반 조건부 렌더링
pub fn when_some(
  option: Option(a),
  render_fn: fn(a) -> ReactElement,
) -> ReactElement {
  case option {
    Some(value) -> render_fn(value)
    None -> none()
  }
}
