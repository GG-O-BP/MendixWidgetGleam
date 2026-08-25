/**
 * 패키지 매니저 설정
 */

export const PM_CHOICES = ["npm", "yarn", "pnpm", "bun"];

/** 실행 환경에서 패키지 매니저 자동 감지 */
export function detectPm() {
  const ua = process.env.npm_config_user_agent || "";
  if (ua.startsWith("pnpm/")) return "pnpm";
  if (ua.startsWith("yarn/")) return "yarn";
  if (ua.startsWith("bun/")) return "bun";
  return "npm";
}
