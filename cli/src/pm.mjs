/**
 * 패키지 매니저 설정
 */

const PM_CONFIG = {
  npm: { install: "npm install", runner: "npx" },
  yarn: { install: "yarn install", runner: "npx" },
  pnpm: { install: "pnpm install", runner: "pnpm exec" },
  bun: { install: "bun install", runner: "bunx" },
};

export const PM_CHOICES = Object.keys(PM_CONFIG);

/** 패키지 매니저별 명령어 반환 */
export function getPmConfig(pm) {
  return PM_CONFIG[pm] || PM_CONFIG.npm;
}

/** 실행 환경에서 패키지 매니저 자동 감지 */
export function detectPm() {
  const ua = process.env.npm_config_user_agent || "";
  if (ua.startsWith("pnpm/")) return "pnpm";
  if (ua.startsWith("yarn/")) return "yarn";
  if (ua.startsWith("bun/")) return "bun";
  return "npm";
}
