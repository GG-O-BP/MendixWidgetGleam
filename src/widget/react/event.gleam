// React 이벤트 타입 + 값 추출 함수

// === 이벤트 타입 (opaque) ===

pub type Event

pub type MouseEvent

pub type ChangeEvent

pub type KeyboardEvent

pub type FormEvent

pub type FocusEvent

// === 값 추출 ===

/// input/textarea의 현재 값 추출
@external(javascript, "../react_ffi.mjs", "get_target_value")
pub fn target_value(event: event) -> String

/// 기본 동작 방지
@external(javascript, "../react_ffi.mjs", "prevent_default")
pub fn prevent_default(event: event) -> Nil

/// 이벤트 전파 중지
@external(javascript, "../react_ffi.mjs", "stop_propagation")
pub fn stop_propagation(event: event) -> Nil

/// 키보드 이벤트의 키 값
@external(javascript, "../react_ffi.mjs", "get_event_key")
pub fn key(event: event) -> String
