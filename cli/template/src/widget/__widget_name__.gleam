// Mendix Pluggable Widget - "Hello World"
// React 함수형 컴포넌트: fn(JsProps) -> ReactElement

import widget/react.{type JsProps, type ReactElement}
import widget/react/html
import widget/react/prop

// Props에서 문자열 속성값 추출
@external(javascript, "./react_ffi.mjs", "get_string_prop")
fn get_string_prop(props: JsProps, key: String) -> String

/// 위젯 메인 함수 - Mendix 런타임이 React 컴포넌트로 호출
pub fn widget(props: JsProps) -> ReactElement {
  let sample_text = get_string_prop(props, "sampleText")
  html.div(prop.new() |> prop.class("widget-hello-world"), [
    react.text("Hello " <> sample_text),
  ])
}
