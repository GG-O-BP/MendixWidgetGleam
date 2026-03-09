// Mendix Pluggable Widget - "Hello World"
// React 함수형 컴포넌트: fn(JsProps) -> ReactElement

// 외부 타입 (JS 값의 opaque 핸들)
pub type ReactElement

pub type JsProps

// FFI 바인딩
@external(javascript, "./mendix_widget_gleam_ffi.mjs", "create_div")
fn create_div(class_name: String, text_content: String) -> ReactElement

@external(javascript, "./mendix_widget_gleam_ffi.mjs", "get_string_prop")
fn get_string_prop(props: JsProps, key: String) -> String

/// 위젯 메인 함수 - Mendix 런타임이 React 컴포넌트로 호출
pub fn widget(props: JsProps) -> ReactElement {
  let sample_text = get_string_prop(props, "sampleText")
  create_div("widget-hello-world", "Hello " <> sample_text)
}
