// 릴리즈 빌드
// gleam run 시 Gleam 컴파일이 먼저 자동 수행됨

import scripts/cmd

pub fn main() {
  cmd.exec("{{RUNNER}} pluggable-widgets-tools release:web")
}
