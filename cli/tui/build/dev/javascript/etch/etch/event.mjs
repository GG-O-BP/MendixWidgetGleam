import * as $int from "../../gleam_stdlib/gleam/int.mjs";
import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $option from "../../gleam_stdlib/gleam/option.mjs";
import { Some, Option$None$const } from "../../gleam_stdlib/gleam/option.mjs";
import * as $result from "../../gleam_stdlib/gleam/result.mjs";
import { try$ } from "../../gleam_stdlib/gleam/result.mjs";
import * as $string from "../../gleam_stdlib/gleam/string.mjs";
import * as $consts from "../etch/internal/consts.mjs";
import { csi } from "../etch/internal/consts.mjs";
import {
  Ok,
  Error,
  toList,
  Empty as $Empty,
  List$Empty$const as $List$Empty$const,
  prepend as listPrepend,
  CustomType as $CustomType,
  makeError,
} from "../gleam.mjs";

const FILEPATH = "src/etch/event.gleam";

export class FailedToParseEvent extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const EventError$FailedToParseEvent = ($0) => new FailedToParseEvent($0);
export const EventError$isFailedToParseEvent = (value) =>
  value instanceof FailedToParseEvent;
export const EventError$FailedToParseEvent$0 = (value) => value[0];

export class DisambiguateEscapeCode extends $CustomType {}
export const KeyboardEnhancementFlag$DisambiguateEscapeCode$const =
  new DisambiguateEscapeCode();
export const KeyboardEnhancementFlag$DisambiguateEscapeCode = () =>
  KeyboardEnhancementFlag$DisambiguateEscapeCode$const;
export const KeyboardEnhancementFlag$isDisambiguateEscapeCode = (value) =>
  value instanceof DisambiguateEscapeCode;

export class ReportEventTypes extends $CustomType {}
export const KeyboardEnhancementFlag$ReportEventTypes$const =
  new ReportEventTypes();
export const KeyboardEnhancementFlag$ReportEventTypes = () =>
  KeyboardEnhancementFlag$ReportEventTypes$const;
export const KeyboardEnhancementFlag$isReportEventTypes = (value) =>
  value instanceof ReportEventTypes;

export class ReportAlternateKeys extends $CustomType {}
export const KeyboardEnhancementFlag$ReportAlternateKeys$const =
  new ReportAlternateKeys();
export const KeyboardEnhancementFlag$ReportAlternateKeys = () =>
  KeyboardEnhancementFlag$ReportAlternateKeys$const;
export const KeyboardEnhancementFlag$isReportAlternateKeys = (value) =>
  value instanceof ReportAlternateKeys;

export class ReportAllKeysAsEscapeCode extends $CustomType {}
export const KeyboardEnhancementFlag$ReportAllKeysAsEscapeCode$const =
  new ReportAllKeysAsEscapeCode();
export const KeyboardEnhancementFlag$ReportAllKeysAsEscapeCode = () =>
  KeyboardEnhancementFlag$ReportAllKeysAsEscapeCode$const;
export const KeyboardEnhancementFlag$isReportAllKeysAsEscapeCode = (value) =>
  value instanceof ReportAllKeysAsEscapeCode;

export class ReportAssociatedText extends $CustomType {}
export const KeyboardEnhancementFlag$ReportAssociatedText$const =
  new ReportAssociatedText();
export const KeyboardEnhancementFlag$ReportAssociatedText = () =>
  KeyboardEnhancementFlag$ReportAssociatedText$const;
export const KeyboardEnhancementFlag$isReportAssociatedText = (value) =>
  value instanceof ReportAssociatedText;

/**
 * Modifiers.
 */
export class Modifiers extends $CustomType {
  constructor(shift, alt, control, super$, hyper, meta) {
    super();
    this.shift = shift;
    this.alt = alt;
    this.control = control;
    this.super = super$;
    this.hyper = hyper;
    this.meta = meta;
  }
}
export const Modifiers$Modifiers = (shift, alt, control, super$, hyper, meta) =>
  new Modifiers(shift, alt, control, super$, hyper, meta);
export const Modifiers$isModifiers = (value) => value instanceof Modifiers;
export const Modifiers$Modifiers$shift = (value) => value.shift;
export const Modifiers$Modifiers$0 = (value) => value.shift;
export const Modifiers$Modifiers$alt = (value) => value.alt;
export const Modifiers$Modifiers$1 = (value) => value.alt;
export const Modifiers$Modifiers$control = (value) => value.control;
export const Modifiers$Modifiers$2 = (value) => value.control;
export const Modifiers$Modifiers$super = (value) => value.super;
export const Modifiers$Modifiers$3 = (value) => value.super;
export const Modifiers$Modifiers$hyper = (value) => value.hyper;
export const Modifiers$Modifiers$4 = (value) => value.hyper;
export const Modifiers$Modifiers$meta = (value) => value.meta;
export const Modifiers$Modifiers$5 = (value) => value.meta;

export class Left extends $CustomType {}
export const MouseButton$Left$const = new Left();
export const MouseButton$Left = () => MouseButton$Left$const;
export const MouseButton$isLeft = (value) => value instanceof Left;

export class Right extends $CustomType {}
export const MouseButton$Right$const = new Right();
export const MouseButton$Right = () => MouseButton$Right$const;
export const MouseButton$isRight = (value) => value instanceof Right;

export class Middle extends $CustomType {}
export const MouseButton$Middle$const = new Middle();
export const MouseButton$Middle = () => MouseButton$Middle$const;
export const MouseButton$isMiddle = (value) => value instanceof Middle;

/**
 * Down (pressing).
 */
export class Down extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const MouseEventKind$Down = ($0) => new Down($0);
export const MouseEventKind$isDown = (value) => value instanceof Down;
export const MouseEventKind$Down$0 = (value) => value[0];

/**
 * Up (releasing).
 */
export class Up extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const MouseEventKind$Up = ($0) => new Up($0);
export const MouseEventKind$isUp = (value) => value instanceof Up;
export const MouseEventKind$Up$0 = (value) => value[0];

/**
 * Drag (moving cursor while holding a button).
 */
export class Drag extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const MouseEventKind$Drag = ($0) => new Drag($0);
export const MouseEventKind$isDrag = (value) => value instanceof Drag;
export const MouseEventKind$Drag$0 = (value) => value[0];

/**
 * Moved cursor.
 */
export class Moved extends $CustomType {}
export const MouseEventKind$Moved$const = new Moved();
export const MouseEventKind$Moved = () => MouseEventKind$Moved$const;
export const MouseEventKind$isMoved = (value) => value instanceof Moved;

/**
 * Scroll down.
 */
export class ScrollDown extends $CustomType {}
export const MouseEventKind$ScrollDown$const = new ScrollDown();
export const MouseEventKind$ScrollDown = () => MouseEventKind$ScrollDown$const;
export const MouseEventKind$isScrollDown = (value) =>
  value instanceof ScrollDown;

/**
 * Scroll up.
 */
export class ScrollUp extends $CustomType {}
export const MouseEventKind$ScrollUp$const = new ScrollUp();
export const MouseEventKind$ScrollUp = () => MouseEventKind$ScrollUp$const;
export const MouseEventKind$isScrollUp = (value) => value instanceof ScrollUp;

/**
 * Scroll left.
 */
export class ScrollLeft extends $CustomType {}
export const MouseEventKind$ScrollLeft$const = new ScrollLeft();
export const MouseEventKind$ScrollLeft = () => MouseEventKind$ScrollLeft$const;
export const MouseEventKind$isScrollLeft = (value) =>
  value instanceof ScrollLeft;

/**
 * Scroll right.
 */
export class ScrollRight extends $CustomType {}
export const MouseEventKind$ScrollRight$const = new ScrollRight();
export const MouseEventKind$ScrollRight = () =>
  MouseEventKind$ScrollRight$const;
export const MouseEventKind$isScrollRight = (value) =>
  value instanceof ScrollRight;

/**
 * Mouse event.
 */
export class MouseEvent extends $CustomType {
  constructor(kind, column, row, modifiers) {
    super();
    this.kind = kind;
    this.column = column;
    this.row = row;
    this.modifiers = modifiers;
  }
}
export const MouseEvent$MouseEvent = (kind, column, row, modifiers) =>
  new MouseEvent(kind, column, row, modifiers);
export const MouseEvent$isMouseEvent = (value) => value instanceof MouseEvent;
export const MouseEvent$MouseEvent$kind = (value) => value.kind;
export const MouseEvent$MouseEvent$0 = (value) => value.kind;
export const MouseEvent$MouseEvent$column = (value) => value.column;
export const MouseEvent$MouseEvent$1 = (value) => value.column;
export const MouseEvent$MouseEvent$row = (value) => value.row;
export const MouseEvent$MouseEvent$2 = (value) => value.row;
export const MouseEvent$MouseEvent$modifiers = (value) => value.modifiers;
export const MouseEvent$MouseEvent$3 = (value) => value.modifiers;

export class Play extends $CustomType {}
export const MediaKeyCode$Play$const = new Play();
export const MediaKeyCode$Play = () => MediaKeyCode$Play$const;
export const MediaKeyCode$isPlay = (value) => value instanceof Play;

export class Pause extends $CustomType {}
export const MediaKeyCode$Pause$const = new Pause();
export const MediaKeyCode$Pause = () => MediaKeyCode$Pause$const;
export const MediaKeyCode$isPause = (value) => value instanceof Pause;

export class PlayPause extends $CustomType {}
export const MediaKeyCode$PlayPause$const = new PlayPause();
export const MediaKeyCode$PlayPause = () => MediaKeyCode$PlayPause$const;
export const MediaKeyCode$isPlayPause = (value) => value instanceof PlayPause;

export class Reverse extends $CustomType {}
export const MediaKeyCode$Reverse$const = new Reverse();
export const MediaKeyCode$Reverse = () => MediaKeyCode$Reverse$const;
export const MediaKeyCode$isReverse = (value) => value instanceof Reverse;

export class Stop extends $CustomType {}
export const MediaKeyCode$Stop$const = new Stop();
export const MediaKeyCode$Stop = () => MediaKeyCode$Stop$const;
export const MediaKeyCode$isStop = (value) => value instanceof Stop;

export class FastForward extends $CustomType {}
export const MediaKeyCode$FastForward$const = new FastForward();
export const MediaKeyCode$FastForward = () => MediaKeyCode$FastForward$const;
export const MediaKeyCode$isFastForward = (value) =>
  value instanceof FastForward;

export class Rewind extends $CustomType {}
export const MediaKeyCode$Rewind$const = new Rewind();
export const MediaKeyCode$Rewind = () => MediaKeyCode$Rewind$const;
export const MediaKeyCode$isRewind = (value) => value instanceof Rewind;

export class TrackNext extends $CustomType {}
export const MediaKeyCode$TrackNext$const = new TrackNext();
export const MediaKeyCode$TrackNext = () => MediaKeyCode$TrackNext$const;
export const MediaKeyCode$isTrackNext = (value) => value instanceof TrackNext;

export class TrackPrevious extends $CustomType {}
export const MediaKeyCode$TrackPrevious$const = new TrackPrevious();
export const MediaKeyCode$TrackPrevious = () =>
  MediaKeyCode$TrackPrevious$const;
export const MediaKeyCode$isTrackPrevious = (value) =>
  value instanceof TrackPrevious;

export class Record extends $CustomType {}
export const MediaKeyCode$Record$const = new Record();
export const MediaKeyCode$Record = () => MediaKeyCode$Record$const;
export const MediaKeyCode$isRecord = (value) => value instanceof Record;

export class LowerVolume extends $CustomType {}
export const MediaKeyCode$LowerVolume$const = new LowerVolume();
export const MediaKeyCode$LowerVolume = () => MediaKeyCode$LowerVolume$const;
export const MediaKeyCode$isLowerVolume = (value) =>
  value instanceof LowerVolume;

export class RaiseVolume extends $CustomType {}
export const MediaKeyCode$RaiseVolume$const = new RaiseVolume();
export const MediaKeyCode$RaiseVolume = () => MediaKeyCode$RaiseVolume$const;
export const MediaKeyCode$isRaiseVolume = (value) =>
  value instanceof RaiseVolume;

export class MuteVolume extends $CustomType {}
export const MediaKeyCode$MuteVolume$const = new MuteVolume();
export const MediaKeyCode$MuteVolume = () => MediaKeyCode$MuteVolume$const;
export const MediaKeyCode$isMuteVolume = (value) => value instanceof MuteVolume;

export class LeftShift extends $CustomType {}
export const ModifierKeyCode$LeftShift$const = new LeftShift();
export const ModifierKeyCode$LeftShift = () => ModifierKeyCode$LeftShift$const;
export const ModifierKeyCode$isLeftShift = (value) =>
  value instanceof LeftShift;

export class LeftControl extends $CustomType {}
export const ModifierKeyCode$LeftControl$const = new LeftControl();
export const ModifierKeyCode$LeftControl = () =>
  ModifierKeyCode$LeftControl$const;
export const ModifierKeyCode$isLeftControl = (value) =>
  value instanceof LeftControl;

export class LeftAlt extends $CustomType {}
export const ModifierKeyCode$LeftAlt$const = new LeftAlt();
export const ModifierKeyCode$LeftAlt = () => ModifierKeyCode$LeftAlt$const;
export const ModifierKeyCode$isLeftAlt = (value) => value instanceof LeftAlt;

export class LeftSuper extends $CustomType {}
export const ModifierKeyCode$LeftSuper$const = new LeftSuper();
export const ModifierKeyCode$LeftSuper = () => ModifierKeyCode$LeftSuper$const;
export const ModifierKeyCode$isLeftSuper = (value) =>
  value instanceof LeftSuper;

export class LeftHyper extends $CustomType {}
export const ModifierKeyCode$LeftHyper$const = new LeftHyper();
export const ModifierKeyCode$LeftHyper = () => ModifierKeyCode$LeftHyper$const;
export const ModifierKeyCode$isLeftHyper = (value) =>
  value instanceof LeftHyper;

export class LeftMeta extends $CustomType {}
export const ModifierKeyCode$LeftMeta$const = new LeftMeta();
export const ModifierKeyCode$LeftMeta = () => ModifierKeyCode$LeftMeta$const;
export const ModifierKeyCode$isLeftMeta = (value) => value instanceof LeftMeta;

export class RightShift extends $CustomType {}
export const ModifierKeyCode$RightShift$const = new RightShift();
export const ModifierKeyCode$RightShift = () =>
  ModifierKeyCode$RightShift$const;
export const ModifierKeyCode$isRightShift = (value) =>
  value instanceof RightShift;

export class RightControl extends $CustomType {}
export const ModifierKeyCode$RightControl$const = new RightControl();
export const ModifierKeyCode$RightControl = () =>
  ModifierKeyCode$RightControl$const;
export const ModifierKeyCode$isRightControl = (value) =>
  value instanceof RightControl;

export class RightAlt extends $CustomType {}
export const ModifierKeyCode$RightAlt$const = new RightAlt();
export const ModifierKeyCode$RightAlt = () => ModifierKeyCode$RightAlt$const;
export const ModifierKeyCode$isRightAlt = (value) => value instanceof RightAlt;

export class RightSuper extends $CustomType {}
export const ModifierKeyCode$RightSuper$const = new RightSuper();
export const ModifierKeyCode$RightSuper = () =>
  ModifierKeyCode$RightSuper$const;
export const ModifierKeyCode$isRightSuper = (value) =>
  value instanceof RightSuper;

export class RightHyper extends $CustomType {}
export const ModifierKeyCode$RightHyper$const = new RightHyper();
export const ModifierKeyCode$RightHyper = () =>
  ModifierKeyCode$RightHyper$const;
export const ModifierKeyCode$isRightHyper = (value) =>
  value instanceof RightHyper;

export class RightMeta extends $CustomType {}
export const ModifierKeyCode$RightMeta$const = new RightMeta();
export const ModifierKeyCode$RightMeta = () => ModifierKeyCode$RightMeta$const;
export const ModifierKeyCode$isRightMeta = (value) =>
  value instanceof RightMeta;

export class IsoLevel3Shift extends $CustomType {}
export const ModifierKeyCode$IsoLevel3Shift$const = new IsoLevel3Shift();
export const ModifierKeyCode$IsoLevel3Shift = () =>
  ModifierKeyCode$IsoLevel3Shift$const;
export const ModifierKeyCode$isIsoLevel3Shift = (value) =>
  value instanceof IsoLevel3Shift;

export class IsoLevel5Shift extends $CustomType {}
export const ModifierKeyCode$IsoLevel5Shift$const = new IsoLevel5Shift();
export const ModifierKeyCode$IsoLevel5Shift = () =>
  ModifierKeyCode$IsoLevel5Shift$const;
export const ModifierKeyCode$isIsoLevel5Shift = (value) =>
  value instanceof IsoLevel5Shift;

export class Char extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const KeyCode$Char = ($0) => new Char($0);
export const KeyCode$isChar = (value) => value instanceof Char;
export const KeyCode$Char$0 = (value) => value[0];

export class UpArrow extends $CustomType {}
export const KeyCode$UpArrow$const = new UpArrow();
export const KeyCode$UpArrow = () => KeyCode$UpArrow$const;
export const KeyCode$isUpArrow = (value) => value instanceof UpArrow;

export class LeftArrow extends $CustomType {}
export const KeyCode$LeftArrow$const = new LeftArrow();
export const KeyCode$LeftArrow = () => KeyCode$LeftArrow$const;
export const KeyCode$isLeftArrow = (value) => value instanceof LeftArrow;

export class DownArrow extends $CustomType {}
export const KeyCode$DownArrow$const = new DownArrow();
export const KeyCode$DownArrow = () => KeyCode$DownArrow$const;
export const KeyCode$isDownArrow = (value) => value instanceof DownArrow;

export class RightArrow extends $CustomType {}
export const KeyCode$RightArrow$const = new RightArrow();
export const KeyCode$RightArrow = () => KeyCode$RightArrow$const;
export const KeyCode$isRightArrow = (value) => value instanceof RightArrow;

export class Home extends $CustomType {}
export const KeyCode$Home$const = new Home();
export const KeyCode$Home = () => KeyCode$Home$const;
export const KeyCode$isHome = (value) => value instanceof Home;

export class End extends $CustomType {}
export const KeyCode$End$const = new End();
export const KeyCode$End = () => KeyCode$End$const;
export const KeyCode$isEnd = (value) => value instanceof End;

export class PageDown extends $CustomType {}
export const KeyCode$PageDown$const = new PageDown();
export const KeyCode$PageDown = () => KeyCode$PageDown$const;
export const KeyCode$isPageDown = (value) => value instanceof PageDown;

export class Insert extends $CustomType {}
export const KeyCode$Insert$const = new Insert();
export const KeyCode$Insert = () => KeyCode$Insert$const;
export const KeyCode$isInsert = (value) => value instanceof Insert;

export class Delete extends $CustomType {}
export const KeyCode$Delete$const = new Delete();
export const KeyCode$Delete = () => KeyCode$Delete$const;
export const KeyCode$isDelete = (value) => value instanceof Delete;

export class PageUp extends $CustomType {}
export const KeyCode$PageUp$const = new PageUp();
export const KeyCode$PageUp = () => KeyCode$PageUp$const;
export const KeyCode$isPageUp = (value) => value instanceof PageUp;

export class KeypadBegin extends $CustomType {}
export const KeyCode$KeypadBegin$const = new KeypadBegin();
export const KeyCode$KeypadBegin = () => KeyCode$KeypadBegin$const;
export const KeyCode$isKeypadBegin = (value) => value instanceof KeypadBegin;

export class Enter extends $CustomType {}
export const KeyCode$Enter$const = new Enter();
export const KeyCode$Enter = () => KeyCode$Enter$const;
export const KeyCode$isEnter = (value) => value instanceof Enter;

export class Backspace extends $CustomType {}
export const KeyCode$Backspace$const = new Backspace();
export const KeyCode$Backspace = () => KeyCode$Backspace$const;
export const KeyCode$isBackspace = (value) => value instanceof Backspace;

export class Esc extends $CustomType {}
export const KeyCode$Esc$const = new Esc();
export const KeyCode$Esc = () => KeyCode$Esc$const;
export const KeyCode$isEsc = (value) => value instanceof Esc;

export class Media extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const KeyCode$Media = ($0) => new Media($0);
export const KeyCode$isMedia = (value) => value instanceof Media;
export const KeyCode$Media$0 = (value) => value[0];

export class Modifier extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const KeyCode$Modifier = ($0) => new Modifier($0);
export const KeyCode$isModifier = (value) => value instanceof Modifier;
export const KeyCode$Modifier$0 = (value) => value[0];

export class F extends $CustomType {
  constructor(n) {
    super();
    this.n = n;
  }
}
export const KeyCode$F = (n) => new F(n);
export const KeyCode$isF = (value) => value instanceof F;
export const KeyCode$F$n = (value) => value.n;
export const KeyCode$F$0 = (value) => value.n;

export class CapsLock extends $CustomType {}
export const KeyCode$CapsLock$const = new CapsLock();
export const KeyCode$CapsLock = () => KeyCode$CapsLock$const;
export const KeyCode$isCapsLock = (value) => value instanceof CapsLock;

export class ScrollLock extends $CustomType {}
export const KeyCode$ScrollLock$const = new ScrollLock();
export const KeyCode$ScrollLock = () => KeyCode$ScrollLock$const;
export const KeyCode$isScrollLock = (value) => value instanceof ScrollLock;

export class NumLock extends $CustomType {}
export const KeyCode$NumLock$const = new NumLock();
export const KeyCode$NumLock = () => KeyCode$NumLock$const;
export const KeyCode$isNumLock = (value) => value instanceof NumLock;

export class PrintScreen extends $CustomType {}
export const KeyCode$PrintScreen$const = new PrintScreen();
export const KeyCode$PrintScreen = () => KeyCode$PrintScreen$const;
export const KeyCode$isPrintScreen = (value) => value instanceof PrintScreen;

export class PauseKeyCode extends $CustomType {}
export const KeyCode$PauseKeyCode$const = new PauseKeyCode();
export const KeyCode$PauseKeyCode = () => KeyCode$PauseKeyCode$const;
export const KeyCode$isPauseKeyCode = (value) => value instanceof PauseKeyCode;

export class Tab extends $CustomType {}
export const KeyCode$Tab$const = new Tab();
export const KeyCode$Tab = () => KeyCode$Tab$const;
export const KeyCode$isTab = (value) => value instanceof Tab;

export class Backtab extends $CustomType {}
export const KeyCode$Backtab$const = new Backtab();
export const KeyCode$Backtab = () => KeyCode$Backtab$const;
export const KeyCode$isBacktab = (value) => value instanceof Backtab;

export class Menu extends $CustomType {}
export const KeyCode$Menu$const = new Menu();
export const KeyCode$Menu = () => KeyCode$Menu$const;
export const KeyCode$isMenu = (value) => value instanceof Menu;

export class Press extends $CustomType {}
export const KeyEventKind$Press$const = new Press();
export const KeyEventKind$Press = () => KeyEventKind$Press$const;
export const KeyEventKind$isPress = (value) => value instanceof Press;

export class Repeat extends $CustomType {}
export const KeyEventKind$Repeat$const = new Repeat();
export const KeyEventKind$Repeat = () => KeyEventKind$Repeat$const;
export const KeyEventKind$isRepeat = (value) => value instanceof Repeat;

export class Release extends $CustomType {}
export const KeyEventKind$Release$const = new Release();
export const KeyEventKind$Release = () => KeyEventKind$Release$const;
export const KeyEventKind$isRelease = (value) => value instanceof Release;

export class KeyEventState extends $CustomType {
  constructor(keypad, capslock, numlock) {
    super();
    this.keypad = keypad;
    this.capslock = capslock;
    this.numlock = numlock;
  }
}
export const KeyEventState$KeyEventState = (keypad, capslock, numlock) =>
  new KeyEventState(keypad, capslock, numlock);
export const KeyEventState$isKeyEventState = (value) =>
  value instanceof KeyEventState;
export const KeyEventState$KeyEventState$keypad = (value) => value.keypad;
export const KeyEventState$KeyEventState$0 = (value) => value.keypad;
export const KeyEventState$KeyEventState$capslock = (value) => value.capslock;
export const KeyEventState$KeyEventState$1 = (value) => value.capslock;
export const KeyEventState$KeyEventState$numlock = (value) => value.numlock;
export const KeyEventState$KeyEventState$2 = (value) => value.numlock;

export class KeyEvent extends $CustomType {
  constructor(code, modifiers, kind, state, text) {
    super();
    this.code = code;
    this.modifiers = modifiers;
    this.kind = kind;
    this.state = state;
    this.text = text;
  }
}
export const KeyEvent$KeyEvent = (code, modifiers, kind, state, text) =>
  new KeyEvent(code, modifiers, kind, state, text);
export const KeyEvent$isKeyEvent = (value) => value instanceof KeyEvent;
export const KeyEvent$KeyEvent$code = (value) => value.code;
export const KeyEvent$KeyEvent$0 = (value) => value.code;
export const KeyEvent$KeyEvent$modifiers = (value) => value.modifiers;
export const KeyEvent$KeyEvent$1 = (value) => value.modifiers;
export const KeyEvent$KeyEvent$kind = (value) => value.kind;
export const KeyEvent$KeyEvent$2 = (value) => value.kind;
export const KeyEvent$KeyEvent$state = (value) => value.state;
export const KeyEvent$KeyEvent$3 = (value) => value.state;
export const KeyEvent$KeyEvent$text = (value) => value.text;
export const KeyEvent$KeyEvent$4 = (value) => value.text;

export class FocusGained extends $CustomType {}
export const Event$FocusGained$const = new FocusGained();
export const Event$FocusGained = () => Event$FocusGained$const;
export const Event$isFocusGained = (value) => value instanceof FocusGained;

export class FocusLost extends $CustomType {}
export const Event$FocusLost$const = new FocusLost();
export const Event$FocusLost = () => Event$FocusLost$const;
export const Event$isFocusLost = (value) => value instanceof FocusLost;

export class Key extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Event$Key = ($0) => new Key($0);
export const Event$isKey = (value) => value instanceof Key;
export const Event$Key$0 = (value) => value[0];

export class Mouse extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Event$Mouse = ($0) => new Mouse($0);
export const Event$isMouse = (value) => value instanceof Mouse;
export const Event$Mouse$0 = (value) => value[0];

export class Resize extends $CustomType {
  constructor($0, $1) {
    super();
    this[0] = $0;
    this[1] = $1;
  }
}
export const Event$Resize = ($0, $1) => new Resize($0, $1);
export const Event$isResize = (value) => value instanceof Resize;
export const Event$Resize$0 = (value) => value[0];
export const Event$Resize$1 = (value) => value[1];

function char_to_key_code(char) {
  if (char === "\r") {
    return KeyCode$Enter$const;
  } else if (char === "\n") {
    return KeyCode$Enter$const;
  } else if (char === "\u{001b}") {
    return KeyCode$Esc$const;
  } else if (char === "\u{007f}") {
    return KeyCode$Backspace$const;
  } else if (char === "\u{0008}") {
    return KeyCode$Backspace$const;
  } else if (char === "\t") {
    return KeyCode$Tab$const;
  } else {
    return new Char(char);
  }
}

function default_key_event(key_code) {
  return new KeyEvent(
    key_code,
    new Modifiers(false, false, false, false, false, false),
    KeyEventKind$Press$const,
    new KeyEventState(false, false, false),
    "",
  );
}

export function parse_kind(kind) {
  if (kind === 1) {
    return KeyEventKind$Press$const;
  } else if (kind === 2) {
    return KeyEventKind$Repeat$const;
  } else if (kind === 3) {
    return KeyEventKind$Release$const;
  } else {
    return KeyEventKind$Press$const;
  }
}

export function parse_modifiers(code) {
  let _block;
  let $ = code - 1;
  {
    let x = $;
    if (x < 0) {
      _block = 0;
    } else {
      _block = $;
    }
  }
  let mask = _block;
  return new Modifiers(
    $int.bitwise_and(mask, 1) !== 0,
    $int.bitwise_and(mask, 2) !== 0,
    $int.bitwise_and(mask, 4) !== 0,
    $int.bitwise_and(mask, 8) !== 0,
    $int.bitwise_and(mask, 16) !== 0,
    $int.bitwise_and(mask, 32) !== 0,
  );
}

export function parse_modifier_and_kind(code) {
  let split = $string.split(code, ":");
  if (split instanceof $Empty) {
    return new Error(new FailedToParseEvent("Failed to parse modifiers"));
  } else {
    let $ = split.tail;
    if ($ instanceof $Empty) {
      let modifier_mask = split.head;
      let _block;
      let _pipe = $int.parse(modifier_mask);
      _block = $result.unwrap(_pipe, 0);
      let modifier_mask$1 = _block;
      return new Ok([modifier_mask$1, 0]);
    } else {
      let $1 = $.tail;
      if ($1 instanceof $Empty) {
        let modifier_mask = split.head;
        let kind_mask = $.head;
        let _block;
        let _pipe = $int.parse(modifier_mask);
        _block = $result.unwrap(_pipe, 0);
        let modifier_mask$1 = _block;
        let _block$1;
        let _pipe$1 = $int.parse(kind_mask);
        _block$1 = $result.unwrap(_pipe$1, 0);
        let kind_mask$1 = _block$1;
        return new Ok([modifier_mask$1, kind_mask$1]);
      } else {
        return new Error(new FailedToParseEvent("Failed to parse modifiers"));
      }
    }
  }
}

export function parse_modifier_key_code(code) {
  let _block;
  let _pipe = $string.last(code);
  _block = $result.unwrap(_pipe, "fallback");
  let key = _block;
  let code$1 = $string.drop_end(code, 1);
  let split = $string.split(code$1, ";");
  let _block$1;
  if (split instanceof $Empty) {
    _block$1 = new Error(
      new FailedToParseEvent("Failed to parse special key code (CSI <..> ~)"),
    );
  } else {
    let $ = split.tail;
    if ($ instanceof $Empty) {
      _block$1 = new Error(
        new FailedToParseEvent("Failed to parse special key code (CSI <..> ~)"),
      );
    } else {
      let $1 = $.tail;
      if ($1 instanceof $Empty) {
        let modifiers = $.head;
        _block$1 = new Ok(modifiers);
      } else {
        _block$1 = new Error(
          new FailedToParseEvent(
            "Failed to parse special key code (CSI <..> ~)",
          ),
        );
      }
    }
  }
  let res = _block$1;
  return try$(
    res,
    (modifiers) => {
      return try$(
        parse_modifier_and_kind(modifiers),
        (_use0) => {
          let modifier_mask = _use0[0];
          let kind_mask = _use0[1];
          let $ = [parse_modifiers(modifier_mask), parse_kind(kind_mask)];
          let modifiers$1 = $[0];
          let kind = $[1];
          let _block$2;
          if (key === "A") {
            _block$2 = new Ok(KeyCode$UpArrow$const);
          } else if (key === "B") {
            _block$2 = new Ok(KeyCode$DownArrow$const);
          } else if (key === "C") {
            _block$2 = new Ok(KeyCode$RightArrow$const);
          } else if (key === "D") {
            _block$2 = new Ok(KeyCode$LeftArrow$const);
          } else if (key === "F") {
            _block$2 = new Ok(KeyCode$End$const);
          } else if (key === "H") {
            _block$2 = new Ok(KeyCode$Home$const);
          } else if (key === "P") {
            _block$2 = new Ok(new F(1));
          } else if (key === "Q") {
            _block$2 = new Ok(new F(2));
          } else if (key === "R") {
            _block$2 = new Ok(new F(3));
          } else if (key === "S") {
            _block$2 = new Ok(new F(4));
          } else {
            _block$2 = new Error(
              new FailedToParseEvent("Failed to parse modifier key code"),
            );
          }
          let res$1 = _block$2;
          return try$(
            res$1,
            (key) => {
              return new Ok(
                new Key(
                  new KeyEvent(
                    key,
                    modifiers$1,
                    kind,
                    new KeyEventState(false, false, false),
                    "",
                  ),
                ),
              );
            },
          );
        },
      );
    },
  );
}

export function translate_functional_key_code(code) {
  let _block;
  if (code === "57399") {
    _block = new Some(new Char("0"));
  } else if (code === "57400") {
    _block = new Some(new Char("1"));
  } else if (code === "57401") {
    _block = new Some(new Char("2"));
  } else if (code === "57402") {
    _block = new Some(new Char("3"));
  } else if (code === "57403") {
    _block = new Some(new Char("4"));
  } else if (code === "57404") {
    _block = new Some(new Char("5"));
  } else if (code === "57405") {
    _block = new Some(new Char("6"));
  } else if (code === "57406") {
    _block = new Some(new Char("7"));
  } else if (code === "57407") {
    _block = new Some(new Char("8"));
  } else if (code === "57408") {
    _block = new Some(new Char("9"));
  } else if (code === "57409") {
    _block = new Some(new Char("."));
  } else if (code === "57410") {
    _block = new Some(new Char("/"));
  } else if (code === "57411") {
    _block = new Some(new Char("*"));
  } else if (code === "57412") {
    _block = new Some(new Char("-"));
  } else if (code === "57413") {
    _block = new Some(new Char("+"));
  } else if (code === "57414") {
    _block = new Some(KeyCode$Enter$const);
  } else if (code === "57415") {
    _block = new Some(new Char("="));
  } else if (code === "57416") {
    _block = new Some(new Char(","));
  } else if (code === "57417") {
    _block = new Some(KeyCode$LeftArrow$const);
  } else if (code === "57418") {
    _block = new Some(KeyCode$RightArrow$const);
  } else if (code === "57419") {
    _block = new Some(KeyCode$UpArrow$const);
  } else if (code === "57420") {
    _block = new Some(KeyCode$DownArrow$const);
  } else if (code === "57421") {
    _block = new Some(KeyCode$PageUp$const);
  } else if (code === "57422") {
    _block = new Some(KeyCode$PageDown$const);
  } else if (code === "57423") {
    _block = new Some(KeyCode$Home$const);
  } else if (code === "57424") {
    _block = new Some(KeyCode$End$const);
  } else if (code === "57425") {
    _block = new Some(KeyCode$Insert$const);
  } else if (code === "57426") {
    _block = new Some(KeyCode$Delete$const);
  } else if (code === "57427") {
    _block = new Some(KeyCode$KeypadBegin$const);
  } else {
    _block = Option$None$const;
  }
  let keycode = _block;
  if (keycode instanceof Some) {
    let c = keycode[0];
    return new Some([c, new KeyEventState(false, false, true)]);
  } else {
    let _block$1;
    if (code === "57358") {
      _block$1 = new Some(KeyCode$CapsLock$const);
    } else if (code === "57359") {
      _block$1 = new Some(KeyCode$ScrollLock$const);
    } else if (code === "57360") {
      _block$1 = new Some(KeyCode$NumLock$const);
    } else if (code === "57361") {
      _block$1 = new Some(KeyCode$PrintScreen$const);
    } else if (code === "57362") {
      _block$1 = new Some(KeyCode$PauseKeyCode$const);
    } else if (code === "57363") {
      _block$1 = new Some(KeyCode$Menu$const);
    } else if (code === "57376") {
      _block$1 = new Some(new F(13));
    } else if (code === "57377") {
      _block$1 = new Some(new F(14));
    } else if (code === "57378") {
      _block$1 = new Some(new F(15));
    } else if (code === "57379") {
      _block$1 = new Some(new F(16));
    } else if (code === "57380") {
      _block$1 = new Some(new F(17));
    } else if (code === "57381") {
      _block$1 = new Some(new F(18));
    } else if (code === "57382") {
      _block$1 = new Some(new F(19));
    } else if (code === "57383") {
      _block$1 = new Some(new F(20));
    } else if (code === "57384") {
      _block$1 = new Some(new F(21));
    } else if (code === "57385") {
      _block$1 = new Some(new F(22));
    } else if (code === "57386") {
      _block$1 = new Some(new F(23));
    } else if (code === "57387") {
      _block$1 = new Some(new F(24));
    } else if (code === "57388") {
      _block$1 = new Some(new F(25));
    } else if (code === "57389") {
      _block$1 = new Some(new F(26));
    } else if (code === "57390") {
      _block$1 = new Some(new F(27));
    } else if (code === "57391") {
      _block$1 = new Some(new F(28));
    } else if (code === "57392") {
      _block$1 = new Some(new F(29));
    } else if (code === "57393") {
      _block$1 = new Some(new F(30));
    } else if (code === "57394") {
      _block$1 = new Some(new F(31));
    } else if (code === "57395") {
      _block$1 = new Some(new F(32));
    } else if (code === "57396") {
      _block$1 = new Some(new F(33));
    } else if (code === "57397") {
      _block$1 = new Some(new F(34));
    } else if (code === "57398") {
      _block$1 = new Some(new F(35));
    } else if (code === "57428") {
      _block$1 = new Some(new Media(MediaKeyCode$Play$const));
    } else if (code === "57429") {
      _block$1 = new Some(new Media(MediaKeyCode$Pause$const));
    } else if (code === "57430") {
      _block$1 = new Some(new Media(MediaKeyCode$PlayPause$const));
    } else if (code === "57431") {
      _block$1 = new Some(new Media(MediaKeyCode$Reverse$const));
    } else if (code === "57432") {
      _block$1 = new Some(new Media(MediaKeyCode$Stop$const));
    } else if (code === "57433") {
      _block$1 = new Some(new Media(MediaKeyCode$FastForward$const));
    } else if (code === "57434") {
      _block$1 = new Some(new Media(MediaKeyCode$Rewind$const));
    } else if (code === "57435") {
      _block$1 = new Some(new Media(MediaKeyCode$TrackNext$const));
    } else if (code === "57436") {
      _block$1 = new Some(new Media(MediaKeyCode$TrackPrevious$const));
    } else if (code === "57437") {
      _block$1 = new Some(new Media(MediaKeyCode$Record$const));
    } else if (code === "57438") {
      _block$1 = new Some(new Media(MediaKeyCode$LowerVolume$const));
    } else if (code === "57439") {
      _block$1 = new Some(new Media(MediaKeyCode$RaiseVolume$const));
    } else if (code === "57440") {
      _block$1 = new Some(new Media(MediaKeyCode$MuteVolume$const));
    } else if (code === "57441") {
      _block$1 = new Some(new Modifier(ModifierKeyCode$LeftShift$const));
    } else if (code === "57442") {
      _block$1 = new Some(new Modifier(ModifierKeyCode$LeftControl$const));
    } else if (code === "57443") {
      _block$1 = new Some(new Modifier(ModifierKeyCode$LeftAlt$const));
    } else if (code === "57444") {
      _block$1 = new Some(new Modifier(ModifierKeyCode$LeftSuper$const));
    } else if (code === "57445") {
      _block$1 = new Some(new Modifier(ModifierKeyCode$LeftHyper$const));
    } else if (code === "57446") {
      _block$1 = new Some(new Modifier(ModifierKeyCode$LeftMeta$const));
    } else if (code === "57447") {
      _block$1 = new Some(new Modifier(ModifierKeyCode$RightShift$const));
    } else if (code === "57448") {
      _block$1 = new Some(new Modifier(ModifierKeyCode$RightControl$const));
    } else if (code === "57449") {
      _block$1 = new Some(new Modifier(ModifierKeyCode$RightAlt$const));
    } else if (code === "57450") {
      _block$1 = new Some(new Modifier(ModifierKeyCode$RightSuper$const));
    } else if (code === "57451") {
      _block$1 = new Some(new Modifier(ModifierKeyCode$RightHyper$const));
    } else if (code === "57452") {
      _block$1 = new Some(new Modifier(ModifierKeyCode$RightMeta$const));
    } else if (code === "57453") {
      _block$1 = new Some(new Modifier(ModifierKeyCode$IsoLevel3Shift$const));
    } else if (code === "57454") {
      _block$1 = new Some(new Modifier(ModifierKeyCode$IsoLevel5Shift$const));
    } else {
      _block$1 = Option$None$const;
    }
    let keycode$1 = _block$1;
    if (keycode$1 instanceof Some) {
      let c = keycode$1[0];
      return new Some([c, new KeyEventState(false, false, false)]);
    } else {
      return keycode$1;
    }
  }
}

export function parse_modifier_to_state(modifier_mask) {
  let state = new KeyEventState(false, false, false);
  let _block;
  let $ = modifier_mask - 1;
  {
    let n = $;
    if (n < 0) {
      _block = 0;
    } else {
      _block = $;
    }
  }
  let mask = _block;
  let _block$1;
  let $1 = $int.bitwise_and(mask, 64) !== 0;
  if ($1) {
    _block$1 = new KeyEventState(state.keypad, true, state.numlock);
  } else {
    _block$1 = state;
  }
  let state$1 = _block$1;
  let _block$2;
  let $2 = $int.bitwise_and(mask, 128) !== 0;
  if ($2) {
    _block$2 = new KeyEventState(state$1.keypad, state$1.capslock, true);
  } else {
    _block$2 = state$1;
  }
  let state$2 = _block$2;
  return state$2;
}

export function parse_u_encoded_key_code(code) {
  let code$1 = $string.drop_end(code, 1);
  let split = $string.split(code$1, ";");
  let _block;
  if (split instanceof $Empty) {
    _block = new Error(
      new FailedToParseEvent("Failed to parse u encoded code (CSI <..> u)"),
    );
  } else {
    let $ = split.tail;
    if ($ instanceof $Empty) {
      let code$2 = split.head;
      _block = new Ok([code$2, "0", Option$None$const]);
    } else {
      let $1 = $.tail;
      if ($1 instanceof $Empty) {
        let code$2 = split.head;
        let modifiers = $.head;
        _block = new Ok([code$2, modifiers, Option$None$const]);
      } else {
        let $2 = $1.tail;
        if ($2 instanceof $Empty) {
          let code$2 = split.head;
          let modifiers = $.head;
          let text = $1.head;
          _block = new Ok([code$2, modifiers, new Some(text)]);
        } else {
          _block = new Error(
            new FailedToParseEvent(
              "Failed to parse u encoded code (CSI <..> u)",
            ),
          );
        }
      }
    }
  }
  let res = _block;
  return try$(
    res,
    (_use0) => {
      let code$2 = _use0[0];
      let modifiers = _use0[1];
      let text = _use0[2];
      let _block$1;
      if (text instanceof Some) {
        let text$1 = text[0];
        let _block$2;
        let _pipe = $int.parse(text$1);
        let _pipe$1 = $result.unwrap(_pipe, 0);
        _block$2 = $string.utf_codepoint(_pipe$1);
        let $ = _block$2;
        let text$2;
        if ($ instanceof Ok) {
          text$2 = $[0];
        } else {
          throw makeError(
            "let_assert",
            FILEPATH,
            "etch/event",
            408,
            "parse_u_encoded_key_code",
            "Pattern match failed, no pattern matched the value.",
            {
              value: $,
              start: 9449,
              end: 9556,
              pattern_start: 9460,
              pattern_end: 9468
            }
          )
        }
        _block$1 = $string.from_utf_codepoints(toList([text$2]));
      } else {
        _block$1 = "";
      }
      let text$1 = _block$1;
      let code_parts = $string.split(code$2, ":");
      let _block$2;
      if (code_parts instanceof $Empty) {
        _block$2 = new Error(
          new FailedToParseEvent("Failed to parse u encoded code"),
        );
      } else {
        let $ = code_parts.tail;
        if ($ instanceof $Empty) {
          let unicode = code_parts.head;
          _block$2 = new Ok([unicode, Option$None$const, Option$None$const]);
        } else {
          let $1 = $.tail;
          if ($1 instanceof $Empty) {
            let unicode = code_parts.head;
            let alternate_code = $.head;
            _block$2 = new Ok(
              [unicode, new Some(alternate_code), Option$None$const],
            );
          } else {
            let $2 = $1.tail;
            if ($2 instanceof $Empty) {
              let unicode = code_parts.head;
              let alternate_code = $.head;
              let base_layout_key = $1.head;
              _block$2 = new Ok(
                [unicode, new Some(alternate_code), new Some(base_layout_key)],
              );
            } else {
              _block$2 = new Error(
                new FailedToParseEvent("Failed to parse u encoded code"),
              );
            }
          }
        }
      }
      let res$1 = _block$2;
      return try$(
        res$1,
        (_use0) => {
          let code$3 = _use0[0];
          let alternate_code = _use0[1];
          return try$(
            parse_modifier_and_kind(modifiers),
            (_use0) => {
              let modifier_mask = _use0[0];
              let kind_mask = _use0[1];
              let $ = [
                parse_modifiers(modifier_mask),
                parse_kind(kind_mask),
                parse_modifier_to_state(modifier_mask),
              ];
              let modifiers$1 = $[0];
              let kind = $[1];
              let state_from_modifier = $[2];
              let _block$3;
              let $2 = translate_functional_key_code(code$3);
              if ($2 instanceof Some) {
                let keycode = $2[0][0];
                let state = $2[0][1];
                _block$3 = [keycode, state];
              } else {
                let _block$4;
                let _pipe = $int.parse(code$3);
                let _pipe$1 = $result.unwrap(_pipe, 0);
                _block$4 = $string.utf_codepoint(_pipe$1);
                let $3 = _block$4;
                let c;
                if ($3 instanceof Ok) {
                  c = $3[0];
                } else {
                  throw makeError(
                    "let_assert",
                    FILEPATH,
                    "etch/event",
                    438,
                    "parse_u_encoded_key_code",
                    "Pattern match failed, no pattern matched the value.",
                    {
                      value: $3,
                      start: 10463,
                      end: 10567,
                      pattern_start: 10474,
                      pattern_end: 10479
                    }
                  )
                }
                let c$1 = $string.from_utf_codepoints(toList([c]));
                let _block$5;
                if (c$1 === "\r") {
                  _block$5 = KeyCode$Enter$const;
                } else if (c$1 === "\n") {
                  _block$5 = KeyCode$Enter$const;
                } else if (c$1 === "\u{001b}") {
                  _block$5 = KeyCode$Esc$const;
                } else if (c$1 === "\u{007f}") {
                  _block$5 = KeyCode$Backspace$const;
                } else if (c$1 === "\u{0008}") {
                  _block$5 = KeyCode$Backspace$const;
                } else if (c$1 === "\t") {
                  if (modifiers$1.shift) {
                    _block$5 = KeyCode$Backtab$const;
                  } else {
                    _block$5 = KeyCode$Tab$const;
                  }
                } else {
                  let c$2 = c$1;
                  _block$5 = new Char(c$2);
                }
                let keycode = _block$5;
                _block$3 = [keycode, new KeyEventState(false, false, false)];
              }
              let $1 = _block$3;
              let keycode = $1[0];
              let state_from_keycode = $1[1];
              let _block$4;
              if (keycode instanceof Modifier) {
                let x = keycode[0];
                if ((x instanceof LeftAlt) || (x instanceof RightAlt)) {
                  _block$4 = new Modifiers(
                    modifiers$1.shift,
                    true,
                    modifiers$1.control,
                    modifiers$1.super,
                    modifiers$1.hyper,
                    modifiers$1.meta,
                  );
                } else {
                  let x = keycode[0];
                  if ((x instanceof LeftShift) || (x instanceof RightShift)) {
                    _block$4 = new Modifiers(
                      true,
                      modifiers$1.alt,
                      modifiers$1.control,
                      modifiers$1.super,
                      modifiers$1.hyper,
                      modifiers$1.meta,
                    );
                  } else {
                    let x = keycode[0];
                    if (
                      (x instanceof LeftControl) || (x instanceof RightControl)
                    ) {
                      _block$4 = new Modifiers(
                        modifiers$1.shift,
                        modifiers$1.alt,
                        true,
                        modifiers$1.super,
                        modifiers$1.hyper,
                        modifiers$1.meta,
                      );
                    } else {
                      let x = keycode[0];
                      if ((x instanceof LeftSuper) || (x instanceof RightSuper)) {
                        _block$4 = new Modifiers(
                          modifiers$1.shift,
                          modifiers$1.alt,
                          modifiers$1.control,
                          true,
                          modifiers$1.hyper,
                          modifiers$1.meta,
                        );
                      } else {
                        let x = keycode[0];
                        if (
                          (x instanceof LeftHyper) || (x instanceof RightHyper)
                        ) {
                          _block$4 = new Modifiers(
                            modifiers$1.shift,
                            modifiers$1.alt,
                            modifiers$1.control,
                            modifiers$1.super,
                            true,
                            modifiers$1.meta,
                          );
                        } else {
                          let x = keycode[0];
                          if (
                            (x instanceof LeftMeta) || (x instanceof RightMeta)
                          ) {
                            _block$4 = new Modifiers(
                              modifiers$1.shift,
                              modifiers$1.alt,
                              modifiers$1.control,
                              modifiers$1.super,
                              modifiers$1.hyper,
                              true,
                            );
                          } else {
                            _block$4 = modifiers$1;
                          }
                        }
                      }
                    }
                  }
                }
              } else {
                _block$4 = modifiers$1;
              }
              let modifiers$2 = _block$4;
              let _block$5;
              let $3 = modifiers$2.shift;
              if ($3) {
                if (alternate_code instanceof Some) {
                  let c = alternate_code[0];
                  let _block$6;
                  let _pipe = $int.parse(c);
                  let _pipe$1 = $result.unwrap(_pipe, 0);
                  _block$6 = $string.utf_codepoint(_pipe$1);
                  let $4 = _block$6;
                  let c$1;
                  if ($4 instanceof Ok) {
                    c$1 = $4[0];
                  } else {
                    throw makeError(
                      "let_assert",
                      FILEPATH,
                      "etch/event",
                      478,
                      "parse_u_encoded_key_code",
                      "Pattern match failed, no pattern matched the value.",
                      {
                        value: $4,
                        start: 11706,
                        end: 11819,
                        pattern_start: 11717,
                        pattern_end: 11722
                      }
                    )
                  }
                  let c$2 = $string.from_utf_codepoints(toList([c$1]));
                  _block$5 = new Char(c$2);
                } else {
                  _block$5 = keycode;
                }
              } else {
                _block$5 = keycode;
              }
              let keycode$1 = _block$5;
              let state = new KeyEventState(
                state_from_modifier.keypad || state_from_keycode.keypad,
                state_from_modifier.capslock || state_from_keycode.capslock,
                state_from_modifier.numlock || state_from_keycode.numlock,
              );
              return new Ok(
                new Key(
                  new KeyEvent(keycode$1, modifiers$2, kind, state, text$1),
                ),
              );
            },
          );
        },
      );
    },
  );
}

export function parse_special_key_code(code) {
  let code$1 = $string.drop_end(code, 1);
  let split = $string.split(code$1, ";");
  let _block;
  if (split instanceof $Empty) {
    _block = new Error(
      new FailedToParseEvent("Failed to parse special key code (CSI <..> ~)"),
    );
  } else {
    let $ = split.tail;
    if ($ instanceof $Empty) {
      let key = split.head;
      _block = new Ok([key, "0"]);
    } else {
      let $1 = $.tail;
      if ($1 instanceof $Empty) {
        let key = split.head;
        let modifier = $.head;
        _block = new Ok([key, modifier]);
      } else {
        _block = new Error(
          new FailedToParseEvent(
            "Failed to parse special key code (CSI <..> ~)",
          ),
        );
      }
    }
  }
  let res = _block;
  return try$(
    res,
    (_use0) => {
      let key = _use0[0];
      let modifier = _use0[1];
      return try$(
        parse_modifier_and_kind(modifier),
        (_use0) => {
          let modifier_mask = _use0[0];
          let kind_mask = _use0[1];
          let $ = [
            parse_modifiers(modifier_mask),
            parse_kind(kind_mask),
            parse_modifier_to_state(modifier_mask),
          ];
          let modifiers = $[0];
          let kind = $[1];
          let state = $[2];
          let _block$1;
          let _pipe = $int.parse(key);
          _block$1 = $result.unwrap(_pipe, 1);
          let key$1 = _block$1;
          let _block$2;
          if (key$1 === 1) {
            _block$2 = new Ok(KeyCode$Home$const);
          } else if (key$1 === 7) {
            _block$2 = new Ok(KeyCode$Home$const);
          } else if (key$1 === 2) {
            _block$2 = new Ok(KeyCode$Insert$const);
          } else if (key$1 === 3) {
            _block$2 = new Ok(KeyCode$Delete$const);
          } else if (key$1 === 4) {
            _block$2 = new Ok(KeyCode$End$const);
          } else if (key$1 === 8) {
            _block$2 = new Ok(KeyCode$End$const);
          } else if (key$1 === 5) {
            _block$2 = new Ok(KeyCode$PageUp$const);
          } else if (key$1 === 6) {
            _block$2 = new Ok(KeyCode$PageDown$const);
          } else {
            let k = key$1;
            {
              let k$1 = k;
              if ((k$1 >= 11) && (k$1 <= 15)) {
                _block$2 = new Ok(new F(k$1 - 10));
              } else {
                let k$1 = k;
                if ((k$1 >= 17) && (k$1 <= 21)) {
                  _block$2 = new Ok(new F(k$1 - 11));
                } else {
                  let k$1 = k;
                  if ((k$1 >= 23) && (k$1 <= 26)) {
                    _block$2 = new Ok(new F(k$1 - 12));
                  } else if (k === 28) {
                    _block$2 = new Ok(new F(k - 15));
                  } else if (k === 29) {
                    _block$2 = new Ok(new F(k - 15));
                  } else {
                    let k$1 = k;
                    if ((k$1 >= 31) && (k$1 <= 34)) {
                      _block$2 = new Ok(new F(k$1 - 17));
                    } else {
                      _block$2 = new Error(
                        new FailedToParseEvent(
                          "Failed to parse special key code (CSI <..> ~)",
                        ),
                      );
                    }
                  }
                }
              }
            }
          }
          let key$2 = _block$2;
          return try$(
            key$2,
            (key) => {
              return new Ok(
                new Key(new KeyEvent(key, modifiers, kind, state, "")),
              );
            },
          );
        },
      );
    },
  );
}

export function parse_cb(code) {
  let _block;
  let _pipe = $int.parse(code);
  _block = $result.unwrap(_pipe, 0);
  let code$1 = _block;
  let _block$1;
  let _pipe$1 = $int.bitwise_and(code$1, 0b11);
  _block$1 = $int.bitwise_or(
    _pipe$1,
    (() => {
      let _pipe$2 = $int.bitwise_and(code$1, 0b1100_0000);
      return $int.bitwise_shift_right(_pipe$2, 4);
    })(),
  );
  let button_number = _block$1;
  let dragging = $int.bitwise_and(code$1, 0b10_0000) === 0b10_0000;
  let modifiers = new Modifiers(
    $int.bitwise_and(code$1, 4) !== 0,
    $int.bitwise_and(code$1, 8) !== 0,
    $int.bitwise_and(code$1, 16) !== 0,
    $int.bitwise_and(code$1, 32) !== 0,
    $int.bitwise_and(code$1, 64) !== 0,
    $int.bitwise_and(code$1, 128) !== 0,
  );
  let _block$2;
  if (button_number === 0) {
    _block$2 = MouseButton$Left$const;
  } else if (button_number === 1) {
    _block$2 = MouseButton$Middle$const;
  } else {
    _block$2 = MouseButton$Right$const;
  }
  let button = _block$2;
  let _block$3;
  if (dragging) {
    if (button_number === 0) {
      _block$3 = new Ok(new Drag(MouseButton$Left$const));
    } else if (button_number === 1) {
      _block$3 = new Ok(new Drag(MouseButton$Middle$const));
    } else if (button_number === 2) {
      _block$3 = new Ok(new Drag(MouseButton$Right$const));
    } else {
      let c = button_number;
      if (((c === 3) || (c === 4)) || (c === 5)) {
        _block$3 = new Ok(MouseEventKind$Moved$const);
      } else {
        _block$3 = new Ok(new Drag(button));
      }
    }
  } else if (button_number === 0) {
    _block$3 = new Ok(new Down(MouseButton$Left$const));
  } else if (button_number === 1) {
    _block$3 = new Ok(new Down(MouseButton$Middle$const));
  } else if (button_number === 2) {
    _block$3 = new Ok(new Down(MouseButton$Right$const));
  } else if (button_number === 3) {
    _block$3 = new Ok(new Up(MouseButton$Left$const));
  } else if (button_number === 4) {
    _block$3 = new Ok(MouseEventKind$ScrollUp$const);
  } else if (button_number === 5) {
    _block$3 = new Ok(MouseEventKind$ScrollDown$const);
  } else if (button_number === 6) {
    _block$3 = new Ok(MouseEventKind$ScrollLeft$const);
  } else if (button_number === 7) {
    _block$3 = new Ok(MouseEventKind$ScrollRight$const);
  } else {
    _block$3 = new Error(
      new FailedToParseEvent("Failed to parse sgr mouse code"),
    );
  }
  let res = _block$3;
  return try$(res, (kind) => { return new Ok([modifiers, kind]); });
}

export function parse_rxvt_mouse(s) {
  let s$1 = $string.drop_end(s, 1);
  let split = $string.split(s$1, ";");
  let _block;
  if (split instanceof $Empty) {
    _block = new Error(new FailedToParseEvent("Failed to parse sgr mouse code"));
  } else {
    let $ = split.tail;
    if ($ instanceof $Empty) {
      _block = new Error(
        new FailedToParseEvent("Failed to parse sgr mouse code"),
      );
    } else {
      let $1 = $.tail;
      if ($1 instanceof $Empty) {
        _block = new Error(
          new FailedToParseEvent("Failed to parse sgr mouse code"),
        );
      } else {
        let $2 = $1.tail;
        if ($2 instanceof $Empty) {
          let code = split.head;
          let column = $.head;
          let row = $1.head;
          _block = new Ok([code, column, row]);
        } else {
          _block = new Error(
            new FailedToParseEvent("Failed to parse sgr mouse code"),
          );
        }
      }
    }
  }
  let res = _block;
  return try$(
    res,
    (_use0) => {
      let code = _use0[0];
      let column = _use0[1];
      let row = _use0[2];
      let _block$1;
      let _pipe = $int.parse(column);
      _block$1 = $result.unwrap(_pipe, 0);
      let column$1 = _block$1;
      let _block$2;
      let _pipe$1 = $int.parse(row);
      _block$2 = $result.unwrap(_pipe$1, 0);
      let row$1 = _block$2;
      return try$(
        parse_cb(code),
        (_use0) => {
          let modifiers = _use0[0];
          let kind = _use0[1];
          return new Ok(
            new Mouse(new MouseEvent(kind, column$1 - 1, row$1 - 1, modifiers)),
          );
        },
      );
    },
  );
}

export function starts_with_number(s) {
  let _pipe = $string.first(s);
  let _pipe$1 = $result.unwrap(_pipe, "");
  let _pipe$2 = $int.parse(_pipe$1);
  return $result.is_ok(_pipe$2);
}

export function parse_sgr_mouse(s) {
  let split = $string.split(s, ";");
  let _block;
  if (split instanceof $Empty) {
    _block = new Error(new FailedToParseEvent("Failed to parse sgr mouse code"));
  } else {
    let $ = split.tail;
    if ($ instanceof $Empty) {
      _block = new Error(
        new FailedToParseEvent("Failed to parse sgr mouse code"),
      );
    } else {
      let $1 = $.tail;
      if ($1 instanceof $Empty) {
        _block = new Error(
          new FailedToParseEvent("Failed to parse sgr mouse code"),
        );
      } else {
        let $2 = $1.tail;
        if ($2 instanceof $Empty) {
          let code = split.head;
          let column = $.head;
          let row = $1.head;
          _block = new Ok([code, column, row]);
        } else {
          _block = new Error(
            new FailedToParseEvent("Failed to parse sgr mouse code"),
          );
        }
      }
    }
  }
  let res = _block;
  return try$(
    res,
    (_use0) => {
      let code = _use0[0];
      let column = _use0[1];
      let row = _use0[2];
      let _block$1;
      let _pipe = $int.parse(column);
      _block$1 = $result.unwrap(_pipe, 0);
      let column$1 = _block$1;
      let is_release = $string.ends_with(row, "m");
      let _block$2;
      let _pipe$1 = $string.drop_end(row, 1);
      let _pipe$2 = $int.parse(_pipe$1);
      _block$2 = $result.unwrap(_pipe$2, 0);
      let row$1 = _block$2;
      return try$(
        parse_cb(code),
        (_use0) => {
          let modifiers = _use0[0];
          let kind = _use0[1];
          let _block$3;
          if (is_release) {
            if (kind instanceof Down) {
              let b = kind[0];
              _block$3 = new Up(b);
            } else {
              _block$3 = kind;
            }
          } else {
            _block$3 = kind;
          }
          let kind$1 = _block$3;
          return new Ok(
            new Mouse(
              new MouseEvent(kind$1, column$1 - 1, row$1 - 1, modifiers),
            ),
          );
        },
      );
    },
  );
}

export function parse_normal_mouse(code) {
  let _block;
  let $ = $string.to_graphemes(code);
  if ($ instanceof $Empty) {
    _block = new Error(
      new FailedToParseEvent("Failed to parse normal mouse code"),
    );
  } else {
    let $1 = $.tail;
    if ($1 instanceof $Empty) {
      _block = new Error(
        new FailedToParseEvent("Failed to parse normal mouse code"),
      );
    } else {
      let $2 = $1.tail;
      if ($2 instanceof $Empty) {
        _block = new Error(
          new FailedToParseEvent("Failed to parse normal mouse code"),
        );
      } else {
        let $3 = $2.tail;
        if ($3 instanceof $Empty) {
          let cb = $.head;
          let cx = $1.head;
          let cy = $2.head;
          _block = new Ok([cb, cx, cy]);
        } else {
          _block = new Error(
            new FailedToParseEvent("Failed to parse normal mouse code"),
          );
        }
      }
    }
  }
  let res = _block;
  return try$(
    res,
    (_use0) => {
      let cb = _use0[0];
      let cx = _use0[1];
      let cy = _use0[2];
      let _block$1;
      let _pipe = $int.parse(cx);
      _block$1 = $result.unwrap(_pipe, 0);
      let column = _block$1;
      let _block$2;
      let _pipe$1 = $int.parse(cy);
      _block$2 = $result.unwrap(_pipe$1, 0);
      let row = _block$2;
      return try$(
        parse_cb(cb),
        (_use0) => {
          let modifiers = _use0[0];
          let kind = _use0[1];
          return new Ok(
            new Mouse(new MouseEvent(kind, column - 1, row - 1, modifiers)),
          );
        },
      );
    },
  );
}

export function handle_escape_code(s) {
  let $ = s.charCodeAt(0);
  if (s === "A") {
    return new Ok(new Key(default_key_event(KeyCode$UpArrow$const)));
  } else if (s === "B") {
    return new Ok(new Key(default_key_event(KeyCode$DownArrow$const)));
  } else if (s === "C") {
    return new Ok(new Key(default_key_event(KeyCode$RightArrow$const)));
  } else if (s === "D") {
    return new Ok(new Key(default_key_event(KeyCode$LeftArrow$const)));
  } else if (s === "H") {
    return new Ok(new Key(default_key_event(KeyCode$Home$const)));
  } else if (s === "F") {
    return new Ok(new Key(default_key_event(KeyCode$End$const)));
  } else if (s === "O") {
    return new Ok(Event$FocusLost$const);
  } else if (s === "I") {
    return new Ok(Event$FocusGained$const);
  } else if ($ === 77) {
    let code = s.slice(1);
    return parse_normal_mouse(code);
  } else if ($ === 60) {
    let code = s.slice(1);
    return parse_sgr_mouse(code);
  } else if ($ === 59) {
    let code = s.slice(1);
    return parse_modifier_key_code(code);
  } else if (s === "P") {
    return new Ok(new Key(default_key_event(new F(1))));
  } else if (s === "Q") {
    return new Ok(new Key(default_key_event(new F(2))));
  } else if (s === "S") {
    return new Ok(new Key(default_key_event(new F(4))));
  } else if ($ === 63) {
    return new Error(new FailedToParseEvent("Failed to parse escape code"));
  } else {
    let s$1 = s;
    let $1 = starts_with_number(s$1);
    if ($1) {
      let $2 = $string.last(s$1);
      if ($2 instanceof Ok) {
        let $3 = $2[0];
        if ($3 === "M") {
          return parse_rxvt_mouse(s$1);
        } else if ($3 === "~") {
          return parse_special_key_code(s$1);
        } else if ($3 === "u") {
          return parse_u_encoded_key_code(s$1);
        } else {
          let l = $3;
          if (l !== "R") {
            return parse_modifier_key_code(s$1);
          } else {
            return new Error(
              new FailedToParseEvent("Unsupported numbered escape code"),
            );
          }
        }
      } else {
        return new Error(
          new FailedToParseEvent("Unsupported numbered escape code"),
        );
      }
    } else {
      return new Error(new FailedToParseEvent("Failed to parse escape code"));
    }
  }
}

export function parse_events(
  loop$str,
  loop$esc_acc,
  loop$list_acc,
  loop$in_escape_sequence
) {
  while (true) {
    let str = loop$str;
    let esc_acc = loop$esc_acc;
    let list_acc = loop$list_acc;
    let in_escape_sequence = loop$in_escape_sequence;
    if (str instanceof $Empty) {
      return $list.reverse(list_acc);
    } else if (in_escape_sequence) {
      let $ = str.tail;
      if ($ instanceof $Empty) {
        let c = str.head;
        let rest = $;
        let _block;
        let _pipe = $string.to_utf_codepoints(c);
        _block = $list.first(_pipe);
        let $1 = _block;
        let x;
        if ($1 instanceof Ok) {
          x = $1[0];
        } else {
          throw makeError(
            "let_assert",
            FILEPATH,
            "etch/event",
            225,
            "parse_events",
            "Pattern match failed, no pattern matched the value.",
            {
              value: $1,
              start: 4101,
              end: 4163,
              pattern_start: 4112,
              pattern_end: 4117
            }
          )
        }
        let x$1 = $string.utf_codepoint_to_int(x);
        let x$2 = x$1;
        if ((x$2 >= 64) && (x$2 <= 126)) {
          let event = handle_escape_code(esc_acc + c);
          let list_acc$1 = listPrepend(event, list_acc);
          loop$str = rest;
          loop$esc_acc = "";
          loop$list_acc = list_acc$1;
          loop$in_escape_sequence = false;
        } else {
          loop$str = rest;
          loop$esc_acc = esc_acc + c;
          loop$list_acc = list_acc;
          loop$in_escape_sequence = true;
        }
      } else {
        let $1 = str.head;
        if ($1 === "\u{001b}") {
          let $2 = $.head;
          if ($2 === "[") {
            let rest = $.tail;
            let list_acc$1 = listPrepend(
              new Error(new FailedToParseEvent("Unterminated escape sequence")),
              list_acc,
            );
            loop$str = rest;
            loop$esc_acc = "";
            loop$list_acc = list_acc$1;
            loop$in_escape_sequence = true;
          } else {
            let c = $1;
            let rest = $;
            let _block;
            let _pipe = $string.to_utf_codepoints(c);
            _block = $list.first(_pipe);
            let $3 = _block;
            let x;
            if ($3 instanceof Ok) {
              x = $3[0];
            } else {
              throw makeError(
                "let_assert",
                FILEPATH,
                "etch/event",
                225,
                "parse_events",
                "Pattern match failed, no pattern matched the value.",
                {
                  value: $3,
                  start: 4101,
                  end: 4163,
                  pattern_start: 4112,
                  pattern_end: 4117
                }
              )
            }
            let x$1 = $string.utf_codepoint_to_int(x);
            let x$2 = x$1;
            if ((x$2 >= 64) && (x$2 <= 126)) {
              let event = handle_escape_code(esc_acc + c);
              let list_acc$1 = listPrepend(event, list_acc);
              loop$str = rest;
              loop$esc_acc = "";
              loop$list_acc = list_acc$1;
              loop$in_escape_sequence = false;
            } else {
              loop$str = rest;
              loop$esc_acc = esc_acc + c;
              loop$list_acc = list_acc;
              loop$in_escape_sequence = true;
            }
          }
        } else {
          let c = $1;
          let rest = $;
          let _block;
          let _pipe = $string.to_utf_codepoints(c);
          _block = $list.first(_pipe);
          let $2 = _block;
          let x;
          if ($2 instanceof Ok) {
            x = $2[0];
          } else {
            throw makeError(
              "let_assert",
              FILEPATH,
              "etch/event",
              225,
              "parse_events",
              "Pattern match failed, no pattern matched the value.",
              {
                value: $2,
                start: 4101,
                end: 4163,
                pattern_start: 4112,
                pattern_end: 4117
              }
            )
          }
          let x$1 = $string.utf_codepoint_to_int(x);
          let x$2 = x$1;
          if ((x$2 >= 64) && (x$2 <= 126)) {
            let event = handle_escape_code(esc_acc + c);
            let list_acc$1 = listPrepend(event, list_acc);
            loop$str = rest;
            loop$esc_acc = "";
            loop$list_acc = list_acc$1;
            loop$in_escape_sequence = false;
          } else {
            loop$str = rest;
            loop$esc_acc = esc_acc + c;
            loop$list_acc = list_acc;
            loop$in_escape_sequence = true;
          }
        }
      }
    } else {
      let $ = str.tail;
      if ($ instanceof $Empty) {
        let s = str.head;
        let rest = $;
        let list_acc$1 = listPrepend(
          new Ok(new Key(default_key_event(char_to_key_code(s)))),
          list_acc,
        );
        loop$str = rest;
        loop$esc_acc = esc_acc + s;
        loop$list_acc = list_acc$1;
        loop$in_escape_sequence = false;
      } else {
        let $1 = str.head;
        if ($1 === "\u{001b}") {
          let $2 = $.head;
          if ($2 === "[") {
            let rest = $.tail;
            loop$str = rest;
            loop$esc_acc = "";
            loop$list_acc = list_acc;
            loop$in_escape_sequence = true;
          } else {
            let s = $1;
            let rest = $;
            let list_acc$1 = listPrepend(
              new Ok(new Key(default_key_event(char_to_key_code(s)))),
              list_acc,
            );
            loop$str = rest;
            loop$esc_acc = esc_acc + s;
            loop$list_acc = list_acc$1;
            loop$in_escape_sequence = false;
          }
        } else {
          let s = $1;
          let rest = $;
          let list_acc$1 = listPrepend(
            new Ok(new Key(default_key_event(char_to_key_code(s)))),
            list_acc,
          );
          loop$str = rest;
          loop$esc_acc = esc_acc + s;
          loop$list_acc = list_acc$1;
          loop$in_escape_sequence = false;
        }
      }
    }
  }
}

/**
 * Convert [`KeyCode`](event.html#KeyCode) to a string.
 */
export function to_string(key_code) {
  if (key_code instanceof Char) {
    let s = key_code[0];
    return s;
  } else if (key_code instanceof UpArrow) {
    return "up arrow";
  } else if (key_code instanceof LeftArrow) {
    return "left arrow";
  } else if (key_code instanceof DownArrow) {
    return "down arrow";
  } else if (key_code instanceof RightArrow) {
    return "right arrow";
  } else if (key_code instanceof Home) {
    return "home";
  } else if (key_code instanceof End) {
    return "end";
  } else if (key_code instanceof PageDown) {
    return "page down";
  } else if (key_code instanceof Insert) {
    return "insert";
  } else if (key_code instanceof Delete) {
    return "delete";
  } else if (key_code instanceof PageUp) {
    return "page up";
  } else if (key_code instanceof KeypadBegin) {
    return "keypad begin";
  } else if (key_code instanceof Enter) {
    return "enter";
  } else if (key_code instanceof Backspace) {
    return "backspace";
  } else if (key_code instanceof Esc) {
    return "escape";
  } else if (key_code instanceof Media) {
    let m = key_code[0];
    if (m instanceof Play) {
      return "play";
    } else if (m instanceof Pause) {
      return "pause";
    } else if (m instanceof PlayPause) {
      return "play-pause";
    } else if (m instanceof Reverse) {
      return "reverse";
    } else if (m instanceof Stop) {
      return "stop";
    } else if (m instanceof FastForward) {
      return "fast forward";
    } else if (m instanceof Rewind) {
      return "rewind";
    } else if (m instanceof TrackNext) {
      return "track next";
    } else if (m instanceof TrackPrevious) {
      return "track previous";
    } else if (m instanceof Record) {
      return "record";
    } else if (m instanceof LowerVolume) {
      return "lower volume";
    } else if (m instanceof RaiseVolume) {
      return "raise volume";
    } else {
      return "mute volume";
    }
  } else if (key_code instanceof Modifier) {
    let m = key_code[0];
    if (m instanceof LeftShift) {
      return "left shift";
    } else if (m instanceof LeftControl) {
      return "left control";
    } else if (m instanceof LeftAlt) {
      return "left alt";
    } else if (m instanceof LeftSuper) {
      return "left super";
    } else if (m instanceof LeftHyper) {
      return "left hyper";
    } else if (m instanceof LeftMeta) {
      return "left meta";
    } else if (m instanceof RightShift) {
      return "right shift";
    } else if (m instanceof RightControl) {
      return "right control";
    } else if (m instanceof RightAlt) {
      return "right alt";
    } else if (m instanceof RightSuper) {
      return "right super";
    } else if (m instanceof RightHyper) {
      return "right hyper";
    } else if (m instanceof RightMeta) {
      return "right meta";
    } else if (m instanceof IsoLevel3Shift) {
      return "iso level-3 shift";
    } else {
      return "iso level-5 shift";
    }
  } else if (key_code instanceof F) {
    let n = key_code.n;
    return "F" + $int.to_string(n);
  } else if (key_code instanceof CapsLock) {
    return "capslock";
  } else if (key_code instanceof ScrollLock) {
    return "scroll lock";
  } else if (key_code instanceof NumLock) {
    return "num lock";
  } else if (key_code instanceof PrintScreen) {
    return "print screen";
  } else if (key_code instanceof PauseKeyCode) {
    return "pause";
  } else if (key_code instanceof Tab) {
    return "tab";
  } else if (key_code instanceof Backtab) {
    return "backtab";
  } else {
    return "menu";
  }
}

export function parse_cursor_position(s) {
  let code = $string.drop_end(s, 1);
  let split = $string.split(code, ";");
  let _block;
  if (split instanceof $Empty) {
    _block = new Error(
      new FailedToParseEvent("Failed to parse cursor position"),
    );
  } else {
    let $ = split.tail;
    if ($ instanceof $Empty) {
      _block = new Error(
        new FailedToParseEvent("Failed to parse cursor position"),
      );
    } else {
      let $1 = $.tail;
      if ($1 instanceof $Empty) {
        let x = split.head;
        let y = $.head;
        _block = new Ok([x, y]);
      } else {
        _block = new Error(
          new FailedToParseEvent("Failed to parse cursor position"),
        );
      }
    }
  }
  let res = _block;
  return try$(
    res,
    (_use0) => {
      let x = _use0[0];
      let y = _use0[1];
      let _block$1;
      let _pipe = $int.parse(x);
      _block$1 = $result.unwrap(_pipe, 0);
      let x$1 = _block$1;
      let _block$2;
      let _pipe$1 = $int.parse(y);
      _block$2 = $result.unwrap(_pipe$1, 0);
      let y$1 = _block$2;
      return new Ok([x$1, y$1]);
    },
  );
}

export function parse_keyboard_enhancement_flags(code) {
  let _block;
  let _pipe = $string.drop_end(code, 1);
  let _pipe$1 = $int.parse(_pipe);
  _block = $result.unwrap(_pipe$1, 0);
  let code$1 = _block;
  let list = $List$Empty$const;
  let _block$1;
  let $ = $int.bitwise_and(code$1, 1) !== 0;
  if ($) {
    _block$1 = listPrepend(
      KeyboardEnhancementFlag$DisambiguateEscapeCode$const,
      list,
    );
  } else {
    _block$1 = list;
  }
  let list$1 = _block$1;
  let _block$2;
  let $1 = $int.bitwise_and(code$1, 2) !== 0;
  if ($1) {
    _block$2 = listPrepend(
      KeyboardEnhancementFlag$ReportEventTypes$const,
      list$1,
    );
  } else {
    _block$2 = list$1;
  }
  let list$2 = _block$2;
  let _block$3;
  let $2 = $int.bitwise_and(code$1, 4) !== 0;
  if ($2) {
    _block$3 = listPrepend(
      KeyboardEnhancementFlag$ReportAlternateKeys$const,
      list$2,
    );
  } else {
    _block$3 = list$2;
  }
  let list$3 = _block$3;
  let _block$4;
  let $3 = $int.bitwise_and(code$1, 8) !== 0;
  if ($3) {
    _block$4 = listPrepend(
      KeyboardEnhancementFlag$ReportAllKeysAsEscapeCode$const,
      list$3,
    );
  } else {
    _block$4 = list$3;
  }
  let list$4 = _block$4;
  let _block$5;
  let $4 = $int.bitwise_and(code$1, 16) !== 0;
  if ($4) {
    _block$5 = listPrepend(
      KeyboardEnhancementFlag$ReportAssociatedText$const,
      list$4,
    );
  } else {
    _block$5 = list$4;
  }
  let list$5 = _block$5;
  return list$5;
}

/**
 * Enables mouse capture.
 * It is prefered not to use this directly. See [`EnableMouseCapture`](command.html#EnableMouseCapture).
 */
export function enable_mouse_capture() {
  return ((((((((csi + "?1000h") + csi) + "?1002h") + csi) + "?1003h") + csi) + "?1015h") + csi) + "?1006h";
}

/**
 * Disables mouse capture.
 * It is prefered not to use this directly. See [`DisableMouseCapture`](command.html#DisableMouseCapture).
 */
export function disable_mouse_capture() {
  return ((((((((csi + "?1000l") + csi) + "?1002l") + csi) + "?1003l") + csi) + "?1015l") + csi) + "?1006l";
}

/**
 * Enables focus change.
 * It is prefered not to use this directly. See [`EnableFocusChange`](command.html#EnableFocusChange).
 */
export function enable_focus_change() {
  return csi + "?1004h";
}

/**
 * Disables focus change.
 * It is prefered not to use this directly. See [`DisableFocusChange`](command.html#DisableFocusChange).
 */
export function disable_focus_change() {
  return csi + "?1004l";
}

function push_keyboard_enhancement_flags_inner(loop$flags, loop$acc) {
  while (true) {
    let flags = loop$flags;
    let acc = loop$acc;
    if (flags instanceof $Empty) {
      return ((csi + ">") + $int.to_string(acc)) + "u";
    } else {
      let $ = flags.head;
      if ($ instanceof DisambiguateEscapeCode) {
        let rest = flags.tail;
        loop$flags = rest;
        loop$acc = acc + 1;
      } else if ($ instanceof ReportEventTypes) {
        let rest = flags.tail;
        loop$flags = rest;
        loop$acc = acc + 2;
      } else if ($ instanceof ReportAlternateKeys) {
        let rest = flags.tail;
        loop$flags = rest;
        loop$acc = acc + 4;
      } else if ($ instanceof ReportAllKeysAsEscapeCode) {
        let rest = flags.tail;
        loop$flags = rest;
        loop$acc = acc + 8;
      } else {
        let rest = flags.tail;
        loop$flags = rest;
        loop$acc = acc + 16;
      }
    }
  }
}

/**
 * Pushes keyboard enhancement flags.
 * It is prefered not to use this directly. See [`PushKeyboardEnhancementFlags`](command.html#PushKeyboardEnhancementFlags).
 */
export function push_keyboard_enhancement_flags(flags) {
  return push_keyboard_enhancement_flags_inner(flags, 0);
}

/**
 * Pops keyboard enhancement flags.
 * It is prefered not to use this directly. See [`PopKeyboardEnhancementFlags`](command.html#PopKeyboardEnhancementFlags).
 */
export function pop_keyboard_enhancement_flags() {
  return csi + "<1u";
}
