// npm 의존성 설치
// Gleam 의존성은 gleam run 실행 시 자동으로 다운로드됨

import scripts/cmd

pub fn main() {
  cmd.exec("npm install")
}
