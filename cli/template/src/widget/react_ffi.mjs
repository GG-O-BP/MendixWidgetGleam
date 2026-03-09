// React FFI 어댑터 - 모든 React 원시 함수를 Gleam에 노출
import * as React from "react";
import { toList } from "../gleam.mjs";

// === 요소 생성 ===

// 범용 요소 생성: tag + props + children(Gleam List)
export function create_element(tag, props, children) {
  return React.createElement(tag, props, ...children.toArray());
}

// props 없이 자식만
export function create_element_no_props(tag, children) {
  return React.createElement(tag, null, ...children.toArray());
}

// self-closing 요소 (input, img, br 등)
export function create_void_element(tag, props) {
  return React.createElement(tag, props);
}

// React 컴포넌트 합성
export function create_component(component, props, children) {
  return React.createElement(component, props, ...children.toArray());
}

// === Fragment / null / text ===

export function fragment(children) {
  return React.createElement(React.Fragment, null, ...children.toArray());
}

export function keyed_fragment(key, children) {
  return React.createElement(React.Fragment, { key }, ...children.toArray());
}

export function null_element() {
  return null;
}

export function text(content) {
  return content;
}

// === Props 빌더 ===

export function empty_props() {
  return {};
}

export function set_prop_string(props, key, value) {
  return { ...props, [key]: value };
}

export function set_prop_int(props, key, value) {
  return { ...props, [key]: value };
}

export function set_prop_float(props, key, value) {
  return { ...props, [key]: value };
}

export function set_prop_bool(props, key, value) {
  return { ...props, [key]: value };
}

export function set_prop_handler(props, key, handler) {
  return { ...props, [key]: handler };
}

export function set_prop_any(props, key, value) {
  return { ...props, [key]: value };
}

export function set_class_name(props, class_name) {
  return { ...props, className: class_name };
}

export function set_class_names(props, class_names) {
  return { ...props, className: class_names.toArray().join(" ") };
}

export function set_key(props, key) {
  return { ...props, key };
}

export function set_ref(props, ref) {
  return { ...props, ref };
}

export function set_style(props, style_obj) {
  return { ...props, style: style_obj };
}

// === Style 빌더 ===

export function empty_style() {
  return {};
}

export function set_style_prop(style, key, value) {
  return { ...style, [key]: value };
}

// === Props 읽기 (Mendix props에서 값 추출) ===

export function get_string_prop(props, key) {
  const value = props[key];
  return value !== undefined && value !== null ? String(value) : "";
}

export function get_prop(props, key) {
  return props[key];
}

export function has_prop(props, key) {
  return key in props && props[key] !== undefined && props[key] !== null;
}

// === React Hooks ===

export function use_state(initial) {
  return React.useState(initial);
}

export function use_effect(effect_fn, deps) {
  React.useEffect(effect_fn, deps.toArray());
}

export function use_effect_always(effect_fn) {
  React.useEffect(effect_fn);
}

export function use_effect_once(effect_fn) {
  React.useEffect(effect_fn, []);
}

export function use_memo(compute_fn, deps) {
  return React.useMemo(compute_fn, deps.toArray());
}

export function use_callback(callback, deps) {
  return React.useCallback(callback, deps.toArray());
}

export function use_ref(initial) {
  return React.useRef(initial);
}

export function get_ref_current(ref) {
  return ref.current;
}

export function set_ref_current(ref, value) {
  ref.current = value;
}

// === 이벤트 ===

export function get_target_value(event) {
  return event.target.value ?? "";
}

export function prevent_default(event) {
  event.preventDefault();
}

export function stop_propagation(event) {
  event.stopPropagation();
}

export function get_event_key(event) {
  return event.key;
}

// === 유틸리티 ===

export function list_to_array(gleam_list) {
  return gleam_list.toArray();
}

export function array_to_list(js_array) {
  return toList(js_array);
}
