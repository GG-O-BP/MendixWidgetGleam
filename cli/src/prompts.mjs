/**
 * 인터랙티브 프롬프트 (node:readline 기반)
 */

import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { splitWords } from "./naming.mjs";
import { PM_CHOICES, detectPm } from "./pm.mjs";

const BOLD = "\x1b[1m";
const DIM = "\x1b[2m";
const RESET = "\x1b[0m";
const CYAN = "\x1b[36m";
const YELLOW = "\x1b[33m";

/** 프로젝트 이름 검증 */
function validateName(name) {
  if (!name || name.trim().length === 0) {
    return "프로젝트 이름을 입력해주세요.";
  }
  const words = splitWords(name.trim());
  if (words.length === 0) {
    return "유효한 영문자를 포함해야 합니다.";
  }
  // 영문자, 숫자, -, _ 만 허용
  if (!/^[a-zA-Z][a-zA-Z0-9\-_]*$/.test(name.trim())) {
    return "영문자로 시작해야 하며, 영문자/숫자/-/_ 만 사용 가능합니다.";
  }
  return null;
}

/** 인터랙티브 프롬프트로 설정 수집 */
export async function collectOptions(cliProjectName) {
  const rl = createInterface({ input: stdin, output: stdout });
  let done = false;

  // Ctrl+C 처리 (프롬프트 완료 전에만)
  rl.on("close", () => {
    if (!done) {
      console.log("\n취소되었습니다.");
      process.exit(0);
    }
  });

  let projectName = cliProjectName;

  try {
    // 1. 프로젝트 이름
    if (!projectName) {
      projectName = await rl.question(
        `${BOLD}프로젝트 이름:${RESET} `,
      );
    }

    const nameError = validateName(projectName);
    if (nameError) {
      done = true;
      rl.close();
      console.error(`\n${YELLOW}오류: ${nameError}${RESET}`);
      process.exit(1);
    }

    projectName = projectName.trim();

    // 디렉토리 충돌 확인
    const targetDir = resolve(process.cwd(), projectName);
    if (existsSync(targetDir)) {
      done = true;
      rl.close();
      console.error(
        `\n${YELLOW}오류: '${projectName}' 디렉토리가 이미 존재합니다.${RESET}`,
      );
      process.exit(1);
    }

    // 2. 패키지 매니저 선택
    const detected = detectPm();
    console.log(
      `\n${BOLD}패키지 매니저 선택:${RESET} ${DIM}(감지: ${detected})${RESET}`,
    );
    PM_CHOICES.forEach((pm, i) => {
      const marker = pm === detected ? ` ${CYAN}← 감지됨${RESET}` : "";
      console.log(`  ${i + 1}) ${pm}${marker}`);
    });

    let pmAnswer = "";
    try {
      pmAnswer = await rl.question(
        `선택 ${DIM}(1-${PM_CHOICES.length}, 기본: ${detected})${RESET}: `,
      );
    } catch {
      // stdin이 닫혀도 기본값 사용
    }

    let pm = detected;
    const pmIndex = parseInt(pmAnswer, 10);
    if (pmIndex >= 1 && pmIndex <= PM_CHOICES.length) {
      pm = PM_CHOICES[pmIndex - 1];
    } else if (pmAnswer.trim() && PM_CHOICES.includes(pmAnswer.trim())) {
      pm = pmAnswer.trim();
    }

    done = true;
    rl.close();
    return { projectName, pm };
  } catch (err) {
    done = true;
    rl.close();
    if (err.code === "ERR_USE_AFTER_CLOSE") {
      process.exit(0);
    }
    throw err;
  }
}
