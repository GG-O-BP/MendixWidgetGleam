//// Mendix 런타임과 Lustre 카운터 사이의 위젯 진입점이다.

import components/counter
import mendraw/mendix.{type JsProps}
import redraw.{type Element}

/// Mendix 런타임이 React 함수형 컴포넌트로 호출한다.
pub fn widget(props: JsProps) -> Element {
  let sample_text = mendix.get_string_prop(props, "sampleText")
  counter.render(sample_text)
}
