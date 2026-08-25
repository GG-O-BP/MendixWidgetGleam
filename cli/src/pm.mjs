/**
 * 패키지 매니저 설정
 */

export const PM_CHOICES = ["npm", "yarn", "pnpm", "bun", "deno"];

/** 선택한 패키지 관리자의 네이티브 JavaScript 런타임 */
export function runtimeForPm(pm) {
  if (pm === "bun" || pm === "deno") return pm;
  return "node";
}

/** 실행 환경에서 패키지 매니저 자동 감지 */
export function detectPm() {
  const ua = process.env.npm_config_user_agent || "";
  if (ua.startsWith("pnpm/")) return "pnpm";
  if (ua.startsWith("yarn/")) return "yarn";
  if (ua.startsWith("bun/")) return "bun";
  if (globalThis.Deno?.version?.deno) return "deno";
  if (globalThis.Bun?.version) return "bun";
  return "npm";
}
