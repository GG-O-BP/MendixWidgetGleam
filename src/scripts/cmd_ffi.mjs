// 셸 명령어 실행 FFI 어댑터
import { execSync } from "node:child_process";

export function exec(command) {
  execSync(command, { stdio: "inherit", shell: true });
}
