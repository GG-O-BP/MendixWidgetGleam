// Mendix Pluggable Widget - "Hello World"
// React 함수형 컴포넌트: fn(JsProps) -> ReactElement

import components/hello_world
import glendix/mendix
import glendix/react.{type JsProps, type ReactElement}

/// 위젯 메인 함수 - Mendix 런타임이 React 컴포넌트로 호출
pub fn widget(props: JsProps) -> ReactElement {
  let sample_text = mendix.get_string_prop(props, "sampleText")
  hello_world.render(sample_text)
}
