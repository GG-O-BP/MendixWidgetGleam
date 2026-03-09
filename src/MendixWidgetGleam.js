// 브릿지: Gleam 컴파일 출력을 Mendix 빌드 진입점으로 연결
// 위젯 로직 없음 - re-export와 CSS import만 담당
import { widget } from "../build/dev/javascript/mendix_widget_gleam/widget/mendix_widget_gleam.mjs";
import "./ui/MendixWidgetGleam.css";

export const MendixWidgetGleam = widget;
