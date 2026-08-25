import components/counter
import gleeunit/should

pub fn empty_label_uses_safe_default_test() -> Nil {
  counter.init("")
  |> should.equal(counter.Model(label: "Gleam + Mendix", count: 0))
}

pub fn label_is_preserved_test() -> Nil {
  counter.init("Orders")
  |> should.equal(counter.Model(label: "Orders", count: 0))
}

pub fn increments_are_ordered_test() -> Nil {
  counter.init("Orders")
  |> counter.update(counter.Increment)
  |> counter.update(counter.Increment)
  |> should.equal(counter.Model(label: "Orders", count: 2))
}
