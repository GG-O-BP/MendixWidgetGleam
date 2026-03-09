// 브릿지: Gleam 컴파일 출력을 Mendix editorConfig 진입점으로 연결
// Gleam(snake_case) → Mendix(camelCase) 이름 변환만 담당
import { get_properties } from "../build/dev/javascript/mendix_widget_gleam/widget/editor_config.mjs";

export const getProperties = get_properties;
