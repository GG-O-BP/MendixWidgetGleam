// Props 빌더 - 파이프라인 API로 React props 구성

import widget/react.{type Props, type Ref}

// === Style 타입 ===

/// CSS 스타일 객체
pub type Style

// === Props 생성 ===

/// 빈 props 객체 생성
@external(javascript, "../react_ffi.mjs", "empty_props")
pub fn new() -> Props

// === 속성 설정 (모두 Props -> Props, 파이프라인 가능) ===

/// 문자열 속성
@external(javascript, "../react_ffi.mjs", "set_prop_string")
pub fn string(props: Props, key: String, value: String) -> Props

/// 정수 속성
@external(javascript, "../react_ffi.mjs", "set_prop_int")
pub fn int(props: Props, key: String, value: Int) -> Props

/// 실수 속성
@external(javascript, "../react_ffi.mjs", "set_prop_float")
pub fn float(props: Props, key: String, value: Float) -> Props

/// 불리언 속성
@external(javascript, "../react_ffi.mjs", "set_prop_bool")
pub fn bool(props: Props, key: String, value: Bool) -> Props

/// 임의 타입 속성
@external(javascript, "../react_ffi.mjs", "set_prop_any")
pub fn any(props: Props, key: String, value: a) -> Props

// === CSS 클래스 ===

/// className 설정
@external(javascript, "../react_ffi.mjs", "set_class_name")
pub fn class(props: Props, class_name: String) -> Props

/// 여러 클래스명을 공백으로 결합
@external(javascript, "../react_ffi.mjs", "set_class_names")
pub fn classes(props: Props, class_names: List(String)) -> Props

// === 특수 속성 ===

/// key 설정
@external(javascript, "../react_ffi.mjs", "set_key")
pub fn key(props: Props, key: String) -> Props

/// ref 설정
@external(javascript, "../react_ffi.mjs", "set_ref")
pub fn ref(props: Props, ref: Ref(a)) -> Props

/// style 객체 설정
@external(javascript, "../react_ffi.mjs", "set_style")
pub fn style(props: Props, style: Style) -> Props

// === 이벤트 핸들러 ===

/// 범용 이벤트 핸들러
@external(javascript, "../react_ffi.mjs", "set_prop_handler")
pub fn on(props: Props, event_name: String, handler: fn(e) -> Nil) -> Props

/// onClick
pub fn on_click(props: Props, handler: fn(e) -> Nil) -> Props {
  on(props, "onClick", handler)
}

/// onChange
pub fn on_change(props: Props, handler: fn(e) -> Nil) -> Props {
  on(props, "onChange", handler)
}

/// onSubmit
pub fn on_submit(props: Props, handler: fn(e) -> Nil) -> Props {
  on(props, "onSubmit", handler)
}

/// onKeyDown
pub fn on_key_down(props: Props, handler: fn(e) -> Nil) -> Props {
  on(props, "onKeyDown", handler)
}

/// onFocus
pub fn on_focus(props: Props, handler: fn(e) -> Nil) -> Props {
  on(props, "onFocus", handler)
}

/// onBlur
pub fn on_blur(props: Props, handler: fn(e) -> Nil) -> Props {
  on(props, "onBlur", handler)
}

// === Style 빌더 ===

/// 빈 스타일 객체 생성
@external(javascript, "../react_ffi.mjs", "empty_style")
pub fn new_style() -> Style

/// 스타일 속성 설정
@external(javascript, "../react_ffi.mjs", "set_style_prop")
pub fn set(style: Style, key: String, value: String) -> Style
