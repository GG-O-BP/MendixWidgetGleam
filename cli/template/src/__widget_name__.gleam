{{I18N:widget_main_1}}

import components/counter
import mendraw/mendix.{type JsProps}
import redraw.{type Element}

{{I18N:widget_main_doc}}
pub fn widget(props: JsProps) -> Element {
  let sample_text = mendix.get_string_prop(props, "sampleText")
  counter.render(sample_text)
}
