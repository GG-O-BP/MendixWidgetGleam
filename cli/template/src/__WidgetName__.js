// 브릿지: Gleam 컴파일 출력을 Mendix 빌드 진입점으로 연결
// 위젯 로직 없음 - re-export와 CSS import만 담당
import { widget } from "../build/dev/javascript/{{SNAKE_CASE}}/widget/{{SNAKE_CASE}}.mjs";
import "./ui/{{PASCAL_CASE}}.css";

export const {{PASCAL_CASE}} = widget;
