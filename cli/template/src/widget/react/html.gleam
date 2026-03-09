// HTML 태그 편의 함수 - 순수 Gleam, FFI 없음
// react.el / react.el_ / react.void 래퍼

import widget/react.{type Props, type ReactElement}

// === 컨테이너 ===

pub fn div(props: Props, children: List(ReactElement)) -> ReactElement {
  react.el("div", props, children)
}

pub fn div_(children: List(ReactElement)) -> ReactElement {
  react.el_("div", children)
}

pub fn span(props: Props, children: List(ReactElement)) -> ReactElement {
  react.el("span", props, children)
}

pub fn span_(children: List(ReactElement)) -> ReactElement {
  react.el_("span", children)
}

pub fn section(props: Props, children: List(ReactElement)) -> ReactElement {
  react.el("section", props, children)
}

pub fn main(props: Props, children: List(ReactElement)) -> ReactElement {
  react.el("main", props, children)
}

// === 텍스트 ===

pub fn p(props: Props, children: List(ReactElement)) -> ReactElement {
  react.el("p", props, children)
}

pub fn p_(children: List(ReactElement)) -> ReactElement {
  react.el_("p", children)
}

pub fn h1(props: Props, children: List(ReactElement)) -> ReactElement {
  react.el("h1", props, children)
}

pub fn h2(props: Props, children: List(ReactElement)) -> ReactElement {
  react.el("h2", props, children)
}

pub fn h3(props: Props, children: List(ReactElement)) -> ReactElement {
  react.el("h3", props, children)
}

pub fn h4(props: Props, children: List(ReactElement)) -> ReactElement {
  react.el("h4", props, children)
}

pub fn h5(props: Props, children: List(ReactElement)) -> ReactElement {
  react.el("h5", props, children)
}

pub fn h6(props: Props, children: List(ReactElement)) -> ReactElement {
  react.el("h6", props, children)
}

// === 리스트 ===

pub fn ul(props: Props, children: List(ReactElement)) -> ReactElement {
  react.el("ul", props, children)
}

pub fn ol(props: Props, children: List(ReactElement)) -> ReactElement {
  react.el("ol", props, children)
}

pub fn li(props: Props, children: List(ReactElement)) -> ReactElement {
  react.el("li", props, children)
}

// === 폼 ===

pub fn form(props: Props, children: List(ReactElement)) -> ReactElement {
  react.el("form", props, children)
}

pub fn button(props: Props, children: List(ReactElement)) -> ReactElement {
  react.el("button", props, children)
}

pub fn label(props: Props, children: List(ReactElement)) -> ReactElement {
  react.el("label", props, children)
}

pub fn input(props: Props) -> ReactElement {
  react.void("input", props)
}

pub fn textarea(props: Props, children: List(ReactElement)) -> ReactElement {
  react.el("textarea", props, children)
}

pub fn select(props: Props, children: List(ReactElement)) -> ReactElement {
  react.el("select", props, children)
}

pub fn option(props: Props, children: List(ReactElement)) -> ReactElement {
  react.el("option", props, children)
}

// === 테이블 ===

pub fn table(props: Props, children: List(ReactElement)) -> ReactElement {
  react.el("table", props, children)
}

pub fn thead(props: Props, children: List(ReactElement)) -> ReactElement {
  react.el("thead", props, children)
}

pub fn tbody(props: Props, children: List(ReactElement)) -> ReactElement {
  react.el("tbody", props, children)
}

pub fn tr(props: Props, children: List(ReactElement)) -> ReactElement {
  react.el("tr", props, children)
}

pub fn td(props: Props, children: List(ReactElement)) -> ReactElement {
  react.el("td", props, children)
}

pub fn th(props: Props, children: List(ReactElement)) -> ReactElement {
  react.el("th", props, children)
}

// === 기타 ===

pub fn a(props: Props, children: List(ReactElement)) -> ReactElement {
  react.el("a", props, children)
}

pub fn img(props: Props) -> ReactElement {
  react.void("img", props)
}

pub fn br() -> ReactElement {
  react.void("br", empty_props())
}

pub fn hr(props: Props) -> ReactElement {
  react.void("hr", props)
}

// br에서 사용할 빈 props (순환 의존 방지용 내부 FFI)
@external(javascript, "../react_ffi.mjs", "empty_props")
fn empty_props() -> Props
