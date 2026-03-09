// 셸 명령어 실행 유틸리티

@external(javascript, "./cmd_ffi.mjs", "exec")
pub fn exec(command: String) -> Nil
