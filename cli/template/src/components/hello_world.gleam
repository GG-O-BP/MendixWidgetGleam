// Hello World 컴포넌트
// 위젯 런타임과 Studio Pro 미리보기에서 공유

import glendix/react.{type ReactElement}
import glendix/react/html
import glendix/react/prop

/// Hello World UI 렌더링
pub fn render(sample_text: String) -> ReactElement {
  html.div(prop.new() |> prop.class("widget-hello-world"), [
    react.text("Hello " <> sample_text),
  ])
}
