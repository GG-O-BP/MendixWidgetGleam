// Mendix 테스트 프로젝트와 연동 개발
// gleam run 시 Gleam 컴파일이 먼저 자동 수행됨

import scripts/cmd

pub fn main() {
  cmd.exec("npx pluggable-widgets-tools start:server")
}
