import * as $event from "../../../etch/etch/event.mjs";
import { FailedToParseEvent, parse_events, parse_keyboard_enhancement_flags } from "../../../etch/etch/event.mjs";
import * as $array from "../../../gleam_javascript/gleam/javascript/array.mjs";
import * as $promise from "../../../gleam_javascript/gleam/javascript/promise.mjs";
import * as $list from "../../../gleam_stdlib/gleam/list.mjs";
import * as $option from "../../../gleam_stdlib/gleam/option.mjs";
import * as $result from "../../../gleam_stdlib/gleam/result.mjs";
import * as $string from "../../../gleam_stdlib/gleam/string.mjs";
import {
  Ok,
  Error,
  toList,
  Empty as $Empty,
  List$Empty$const as $List$Empty$const,
  makeError,
} from "../../gleam.mjs";
import {
  get_chars,
  push,
  poll as poll_ffi,
  read as read_ffi,
  ensure_running,
  handle_sigwinch,
  get_keyboard_enhancement_flags_code,
  get_cursor_position,
} from "./input_ffi.mjs";

export { get_cursor_position };

const FILEPATH = "src/etch/javascript/input.gleam";

function push_events(loop$events) {
  while (true) {
    let events = loop$events;
    if (events instanceof $Empty) {
      return undefined;
    } else {
      let e = events.head;
      let rest = events.tail;
      push(e);
      loop$events = rest;
    }
  }
}

function input_loop() {
  return $promise.await$(
    get_chars(),
    (bytes) => {
      let _block;
      let _pipe = $array.to_list(bytes);
      _block = $list.map(
        _pipe,
        (n) => {
          let _block$1;
          let _pipe$1 = $string.utf_codepoint(n);
          _block$1 = $result.lazy_unwrap(
            _pipe$1,
            () => {
              let $ = $string.utf_codepoint(65);
              let fallback;
              if ($ instanceof Ok) {
                fallback = $[0];
              } else {
                throw makeError(
                  "let_assert",
                  FILEPATH,
                  "etch/javascript/input",
                  61,
                  "input_loop",
                  "Pattern match failed, no pattern matched the value.",
                  {
                    value: $,
                    start: 1932,
                    end: 1982,
                    pattern_start: 1943,
                    pattern_end: 1955
                  }
                )
              }
              return fallback;
            },
          );
          let code = _block$1;
          return $string.from_utf_codepoints(toList([code]));
        },
      );
      let bytes$1 = _block;
      let events = parse_events(bytes$1, "", $List$Empty$const, false);
      push_events(events);
      return input_loop();
    },
  );
}

/**
 * Initializes the event server responsible for listening for events.
 *
 * @ignore
 */
function init_event_server() {
  handle_sigwinch();
  input_loop();
  return undefined;
}

/**
 * Checks if there is an [`Event`](https://hexdocs.pm/etch/etch/event.html#Event) available.
 * Returns None if no events were received within the timeout.
 * See also [`read`](input.html#read).
 */
export function poll(timeout) {
  ensure_running(init_event_server);
  return poll_ffi(timeout);
}

/**
 * Checks if there is an [`Event`](https://hexdocs.pm/etch/etch/event.html#Event) available.
 * Waits forever for an available event.
 * See also [`poll`](input.html#poll).
 */
export function read() {
  ensure_running(init_event_server);
  return read_ffi();
}

/**
 * Get keyboard enhancement flags. See <https://sw.kovidgoyal.net/kitty/keyboard-protocol/#progressive-enhancement>
 * This function shouldn't be called in a tight loop. It's fine to call it when
 * responding to specific user input (e.g., after a key press), but avoid calling
 * it on every loop iteration.
 */
export function get_keyboard_enhancement_flags() {
  return $promise.await$(
    get_keyboard_enhancement_flags_code(),
    (flags) => {
      let _block;
      if (flags instanceof Ok) {
        let code = flags[0];
        _block = new Ok(parse_keyboard_enhancement_flags(code));
      } else {
        _block = new Error(
          new FailedToParseEvent("Could not get enhancment flags"),
        );
      }
      let res = _block;
      return $promise.resolve(res);
    },
  );
}
