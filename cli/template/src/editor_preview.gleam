{{I18N:editor_preview_1}}
{{I18N:editor_preview_2}}

import components/counter
import mendraw/mendix.{type JsProps}
import redraw.{type Element}

{{I18N:editor_preview_doc}}
pub fn preview(props: JsProps) -> Element {
  let sample_text = mendix.get_string_prop(props, "sampleText")
  counter.render(sample_text)
}
