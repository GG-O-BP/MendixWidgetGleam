{{I18N:counter_module}}

import gleam/int
import glendix/lustre as glendix_lustre
import lustre/attribute
import lustre/element
import lustre/element/html
import lustre/event
import redraw

pub type Model {
  Model(label: String, count: Int)
}

pub type Message {
  Increment
}

@internal
pub fn init(label: String) -> Model {
  let label = case label {
    "" -> "Gleam + Mendix"
    value -> value
  }
  Model(label: label, count: 0)
}

@internal
pub fn update(model: Model, message: Message) -> Model {
  case message {
    Increment -> Model(..model, count: model.count + 1)
  }
}

fn view(model: Model) -> element.Element(Message) {
  html.section([attribute.class("widget-counter")], [
    html.p([attribute.class("widget-counter__label")], [
      html.text(model.label),
    ]),
    html.button(
      [
        attribute.class("widget-counter__button"),
        event.on_click(Increment),
      ],
      [html.text("Count: " <> int.to_string(model.count))],
    ),
  ])
}

{{I18N:counter_doc}}
pub fn render(label: String) -> redraw.Element {
  glendix_lustre.use_simple(init(label), update, view)
}
