import { CustomType as $CustomType } from "../../gleam.mjs";
import { enter_raw, exit_raw, is_raw_mode, window_size } from "./terminal_ffi.mjs";

export { enter_raw, exit_raw, is_raw_mode, window_size };

export class FailedToEnterRawMode extends $CustomType {}
export const TerminalError$FailedToEnterRawMode$const =
  new FailedToEnterRawMode();
export const TerminalError$FailedToEnterRawMode = () =>
  TerminalError$FailedToEnterRawMode$const;
export const TerminalError$isFailedToEnterRawMode = (value) =>
  value instanceof FailedToEnterRawMode;

export class FailedToExitRawMode extends $CustomType {}
export const TerminalError$FailedToExitRawMode$const =
  new FailedToExitRawMode();
export const TerminalError$FailedToExitRawMode = () =>
  TerminalError$FailedToExitRawMode$const;
export const TerminalError$isFailedToExitRawMode = (value) =>
  value instanceof FailedToExitRawMode;

export class CouldNotGetWindowSize extends $CustomType {}
export const TerminalError$CouldNotGetWindowSize$const =
  new CouldNotGetWindowSize();
export const TerminalError$CouldNotGetWindowSize = () =>
  TerminalError$CouldNotGetWindowSize$const;
export const TerminalError$isCouldNotGetWindowSize = (value) =>
  value instanceof CouldNotGetWindowSize;
