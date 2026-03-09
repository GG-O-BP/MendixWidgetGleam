// React FFI 어댑터 - React 원시 함수만 노출
import * as React from "react";

// div 요소에 텍스트 자식을 렌더링
export function create_div(class_name, text_content) {
  return React.createElement("div", { className: class_name }, text_content);
}

// props 객체에서 문자열 속성값 추출
export function get_string_prop(props, key) {
  const value = props[key];
  return value !== undefined && value !== null ? String(value) : "";
}
