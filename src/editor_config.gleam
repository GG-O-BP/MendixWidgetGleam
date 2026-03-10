// Mendix Studio Pro 속성 패널 설정
// getProperties, check, getPreview 등을 정의

// 외부 타입 (Mendix가 전달하는 JS 객체)
pub type Values

pub type Properties

pub type Target

/// 속성 패널 설정 - Studio Pro에서 위젯 속성의 가시성을 제어
pub fn get_properties(
  _values: Values,
  default_properties: Properties,
  _target: Target,
) -> Properties {
  default_properties
}
