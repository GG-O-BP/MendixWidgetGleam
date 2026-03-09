/**
 * 이름 변환 유틸리티
 * 사용자 입력을 다양한 형식으로 변환한다.
 */

/** 입력 문자열을 단어 배열로 분리 */
export function splitWords(input) {
  // PascalCase / camelCase 경계에서 분리
  let result = input.replace(/([a-z])([A-Z])/g, "$1 $2");
  // 숫자-문자 경계
  result = result.replace(/([0-9])([a-zA-Z])/g, "$1 $2");
  result = result.replace(/([a-zA-Z])([0-9])/g, "$1 $2");
  // 구분자(-, _, 공백)로 분리
  return result
    .split(/[-_\s]+/)
    .map((w) => w.trim().toLowerCase())
    .filter((w) => w.length > 0);
}

/** PascalCase: MyCoolWidget */
export function toPascalCase(words) {
  return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("");
}

/** snake_case: my_cool_widget */
export function toSnakeCase(words) {
  return words.join("_");
}

/** lowercase: mycoolwidget */
export function toLowerCase(words) {
  return words.join("");
}

/** Display Name: My Cool Widget */
export function toDisplayName(words) {
  return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

/** kebab-case: my-cool-widget */
export function toKebabCase(words) {
  return words.join("-");
}

/** 모든 형식을 한 번에 생성 */
export function generateNames(input) {
  const words = splitWords(input);
  if (words.length === 0) return null;
  return {
    pascalCase: toPascalCase(words),
    snakeCase: toSnakeCase(words),
    lowerCase: toLowerCase(words),
    displayName: toDisplayName(words),
    kebabCase: toKebabCase(words),
  };
}
