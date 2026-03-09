// 위젯 프로덕션 빌드 (.mpk 생성)
// gleam run 시 Gleam 컴파일이 먼저 자동 수행됨

import scripts/cmd

pub fn main() {
  cmd.exec("{{RUNNER}} pluggable-widgets-tools build:web")
}
