/**
 * Interactive prompts (node:readline based)
 */

import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { generateNames, splitWords } from "./naming.mjs";
import { PM_CHOICES, detectPm } from "./pm.mjs";
import { LANG_CHOICES, getLangLabel, t } from "./i18n.mjs";

const BOLD = "\x1b[1m";
const DIM = "\x1b[2m";
const RESET = "\x1b[0m";
const CYAN = "\x1b[36m";
const YELLOW = "\x1b[33m";

async function createPromptSession() {
  if (stdin.isTTY) {
    return createInterface({ input: stdin, output: stdout });
  }

  let input = "";
  stdin.setEncoding("utf8");
  for await (const chunk of stdin) input += chunk;

  const answers = input.split(/\r?\n/);
  let index = 0;
  return {
    async question(prompt) {
      stdout.write(prompt);
      const answer = answers[index] ?? "";
      index += 1;
      return answer;
    },
    close() {},
  };
}

/** Project name validation */
function validateName(lang, name) {
  if (!name || name.trim().length === 0) {
    return t(lang, "validate.nameRequired");
  }
  const words = splitWords(name.trim());
  if (words.length === 0) {
    return t(lang, "validate.needAlpha");
  }
  if (!/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(name.trim())) {
    return t(lang, "validate.invalidChars");
  }
  return null;
}

/** Collect options via interactive prompts */
export async function collectOptions(cliProjectName) {
  const rl = await createPromptSession();

  let projectName = cliProjectName;

  try {
    // 1. Language selection (multilingual labels — shown before language is chosen)
    console.log(
      `\n${BOLD}Language / 언어 / 言語:${RESET}`,
    );
    LANG_CHOICES.forEach((code, i) => {
      const label = getLangLabel(code);
      console.log(`  ${i + 1}) ${label}`);
    });

    let langAnswer = "";
    try {
      langAnswer = await rl.question(
        `${DIM}(1-${LANG_CHOICES.length}, default: 1)${RESET}: `,
      );
    } catch {
      // stdin closed — use default
    }

    let lang = "en";
    const langIndex = parseInt(langAnswer, 10);
    if (langIndex >= 1 && langIndex <= LANG_CHOICES.length) {
      lang = LANG_CHOICES[langIndex - 1];
    }

    // 2. Project name
    if (!projectName) {
      projectName = await rl.question(
        `${BOLD}${t(lang, "prompt.projectName")}${RESET} `,
      );
    }

    const nameError = validateName(lang, projectName);
    if (nameError) {
      rl.close();
      console.error(`\n${YELLOW}${nameError}${RESET}`);
      process.exit(1);
    }

    projectName = projectName.trim();

    // Check directory conflict
    const names = generateNames(projectName);
    const targetDir = resolve(process.cwd(), names.kebabCase);
    if (existsSync(targetDir)) {
      rl.close();
      console.error(
        `\n${YELLOW}${t(lang, "error.dirExists", { name: projectName })}${RESET}`,
      );
      process.exit(1);
    }

    // 3. Organization
    const defaultOrg = "example";
    let orgAnswer = "";
    try {
      orgAnswer = await rl.question(
        `\n${BOLD}${t(lang, "prompt.orgName")}${RESET} ${DIM}[${defaultOrg}]${RESET}: `,
      );
    } catch {
      // stdin closed — use default
    }
    const organization = orgAnswer.trim() || defaultOrg;

    if (!/^[a-z][a-z0-9]*$/.test(organization)) {
      rl.close();
      console.error(`\n${YELLOW}${t(lang, "validate.orgInvalid")}${RESET}`);
      process.exit(1);
    }

    // 4. Copyright
    const year = new Date().getFullYear();
    const defaultCopyright = `${year} A.N. Other`;
    let copyrightAnswer = "";
    try {
      copyrightAnswer = await rl.question(
        `\n${BOLD}${t(lang, "prompt.copyright")}${RESET} ${DIM}[${defaultCopyright}]${RESET}:\n  `,
      );
    } catch {
      // stdin closed — use default
    }
    const copyright = copyrightAnswer.trim() || defaultCopyright;

    // 5. Version
    const defaultVersion = "0.0.1";
    let versionAnswer = "";
    try {
      versionAnswer = await rl.question(
        `\n${BOLD}${t(lang, "prompt.version")}${RESET} ${DIM}[${defaultVersion}]${RESET}: `,
      );
    } catch {
      // stdin closed — use default
    }
    const version = versionAnswer.trim() || defaultVersion;

    if (!/^\d+\.\d+\.\d+$/.test(version)) {
      rl.close();
      console.error(`\n${YELLOW}${t(lang, "validate.versionInvalid")}${RESET}`);
      process.exit(1);
    }

    // 6. Author
    const defaultAuthor = "A.N. Other";
    let authorAnswer = "";
    try {
      authorAnswer = await rl.question(
        `\n${BOLD}${t(lang, "prompt.author")}${RESET} ${DIM}[${defaultAuthor}]${RESET}: `,
      );
    } catch {
      // stdin closed — use default
    }
    const author = authorAnswer.trim() || defaultAuthor;

    // 7. Project Path
    const defaultPath = "./tests/testProject";
    let pathAnswer = "";
    try {
      pathAnswer = await rl.question(
        `\n${BOLD}${t(lang, "prompt.projectPath")}${RESET} ${DIM}[${defaultPath}]${RESET}: `,
      );
    } catch {
      // stdin closed — use default
    }
    const projectPath = pathAnswer.trim() || defaultPath;

    // 8. Package manager selection
    const detected = detectPm();
    console.log(
      `\n${BOLD}${t(lang, "prompt.pmSelect")}${RESET} ${DIM}(${t(lang, "prompt.pmDetected", { detected })})${RESET}`,
    );
    PM_CHOICES.forEach((pm, i) => {
      const marker =
        pm === detected
          ? ` ${CYAN}${t(lang, "prompt.pmDetectedMarker")}${RESET}`
          : "";
      console.log(`  ${i + 1}) ${pm}${marker}`);
    });

    let pmAnswer = "";
    try {
      pmAnswer = await rl.question(
        `${t(lang, "prompt.pmChoose", { count: PM_CHOICES.length, default: detected })}: `,
      );
    } catch {
      // stdin closed — use default
    }

    let pm = detected;
    const pmIndex = parseInt(pmAnswer, 10);
    if (pmIndex >= 1 && pmIndex <= PM_CHOICES.length) {
      pm = PM_CHOICES[pmIndex - 1];
    } else if (pmAnswer.trim() && PM_CHOICES.includes(pmAnswer.trim())) {
      pm = pmAnswer.trim();
    }

    rl.close();
    return { projectName, organization, copyright, version, author, projectPath, pm, lang };
  } catch (err) {
    rl.close();
    if (err.code === "ERR_USE_AFTER_CLOSE") {
      console.error(`\n${YELLOW}${t("en", "prompt.cancelled")}${RESET}`);
      process.exit(1);
    }
    throw err;
  }
}
