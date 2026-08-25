import * as $int from "../../gleam_stdlib/gleam/int.mjs";
import * as $consts from "../etch/internal/consts.mjs";
import { csi, esc } from "../etch/internal/consts.mjs";
import { CustomType as $CustomType } from "../gleam.mjs";

/**
 * Clears the whole screen.
 */
export class All extends $CustomType {}
export const ClearType$All$const = new All();
export const ClearType$All = () => ClearType$All$const;
export const ClearType$isAll = (value) => value instanceof All;

/**
 * Clears the whole screen and the history.
 */
export class Purge extends $CustomType {}
export const ClearType$Purge$const = new Purge();
export const ClearType$Purge = () => ClearType$Purge$const;
export const ClearType$isPurge = (value) => value instanceof Purge;

/**
 * Clears cells from the cursor downwards.
 */
export class FromCursorDown extends $CustomType {}
export const ClearType$FromCursorDown$const = new FromCursorDown();
export const ClearType$FromCursorDown = () => ClearType$FromCursorDown$const;
export const ClearType$isFromCursorDown = (value) =>
  value instanceof FromCursorDown;

/**
 * Clears cells from the cursor upwards.
 */
export class FromCursorUp extends $CustomType {}
export const ClearType$FromCursorUp$const = new FromCursorUp();
export const ClearType$FromCursorUp = () => ClearType$FromCursorUp$const;
export const ClearType$isFromCursorUp = (value) =>
  value instanceof FromCursorUp;

/**
 * Clears cells at the current cursor row.
 */
export class CurrentLine extends $CustomType {}
export const ClearType$CurrentLine$const = new CurrentLine();
export const ClearType$CurrentLine = () => ClearType$CurrentLine$const;
export const ClearType$isCurrentLine = (value) => value instanceof CurrentLine;

/**
 * Clears cells from the cursor positon until the end.
 */
export class UntilNewLine extends $CustomType {}
export const ClearType$UntilNewLine$const = new UntilNewLine();
export const ClearType$UntilNewLine = () => ClearType$UntilNewLine$const;
export const ClearType$isUntilNewLine = (value) =>
  value instanceof UntilNewLine;

/**
 * Clears the terminal. See [`ClearType`](terminal.html#ClearType).
 * It is prefered not to use this directly. See [`Clear`](command.html#Clear).
 */
export function clear(t) {
  if (t instanceof All) {
    return csi + "2J";
  } else if (t instanceof Purge) {
    return csi + "3J";
  } else if (t instanceof FromCursorDown) {
    return csi + "J";
  } else if (t instanceof FromCursorUp) {
    return csi + "1J";
  } else if (t instanceof CurrentLine) {
    return csi + "2K";
  } else {
    return csi + "K";
  }
}

/**
 * Sets terminal title.
 * It is prefered not to use this directly. See [`SetTitle`](command.html#SetTitle).
 */
export function set_title(s) {
  return ((esc + "]0;") + s) + "\u{0007}";
}

/**
 * Disable line wrap.
 * It is prefered not to use this directly. See [`DisableLineWrap`](command.html#DisableLineWrap).
 */
export function disable_line_wrap() {
  return csi + "?7l";
}

/**
 * Enable line wrap.
 * It is prefered not to use this directly. See [`EnableLineWrap`](command.html#EnableLineWrap).
 */
export function enable_line_wrap() {
  return csi + "?7h";
}

/**
 * Scroll N rows up.
 * It is prefered not to use this directly. See [`ScrollUp`](command.html#ScrollUp).
 */
export function scroll_up(n) {
  return (csi + $int.to_string(n)) + "S";
}

/**
 * Scroll N rows down.
 * It is prefered not to use this directly. See [`ScrollDown`](command.html#ScrollDown).
 */
export function scroll_down(n) {
  return (csi + $int.to_string(n)) + "T";
}

/**
 * Enter alternative screen.
 * It is prefered not to use this directly. See [`EnterAlternative`](command.html#EnterAlternative).
 */
export function enter_alternative() {
  return csi + "?1049h";
}

/**
 * Leave alternative screen.
 * It is prefered not to use this directly. See [`LeaveAlternative`](command.html#LeaveAlternative).
 */
export function leave_alternative() {
  return csi + "?1049l";
}

/**
 * Set window size. It does not work on most modern terminals
 * due to security issues.
 * It is prefered not to use this directly. See [`SetSize`](command.html#SetSize).
 */
export function set_size(x, y) {
  return ((((csi + "8;") + $int.to_string(x)) + ";") + $int.to_string(y)) + "t";
}
