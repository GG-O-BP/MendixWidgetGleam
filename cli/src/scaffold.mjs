/**
 * 파일 복사 + 템플릿 치환
 */

import { readdir, readFile, writeFile, mkdir, copyFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";

/** 바이너리 판별용 확장자 */
const BINARY_EXTS = new Set([".png", ".jpg", ".gif", ".ico", ".woff", ".woff2", ".ttf", ".eot"]);

/** 재귀적으로 디렉토리 내 모든 파일 경로를 수집 */
async function walkDir(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  entries.sort((left, right) => left.name.localeCompare(right.name));
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkDir(fullPath)));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

// npm publish 시 제외되는 dotfile을 언더스코어 접두사로 보관하고 복원
const DOTFILE_MAP = {
  _gitignore: ".gitignore",
  "_yarnrc.yml": ".yarnrc.yml",
};

function javascriptRuntime(packageManager) {
  if (packageManager === "bun" || packageManager === "deno") {
    return packageManager;
  }
  return "node";
}

function denoPermissions(packageManager) {
  if (packageManager !== "deno") return "";
  return "[javascript.deno]\nallow_all = true\n";
}

function packageManagerField(packageManager) {
  if (packageManager !== "yarn") return "";
  return '  "packageManager": "yarn@4.18.0",\n';
}

function includeTemplateFile(relativePath, options) {
  if (relativePath === "_yarnrc.yml") {
    return options?.packageManager === "yarn";
  }
  if (relativePath === "pnpm-workspace.yaml") {
    return options?.packageManager === "pnpm";
  }
  return true;
}

/** 파일명에서 플레이스홀더 치환 + dotfile 복원 */
function replaceFileName(name, names) {
  if (DOTFILE_MAP[name]) return DOTFILE_MAP[name];
  return name
    .replace(/__WidgetName__/g, names.pascalCase)
    .replace(/__widget_name__/g, names.snakeCase);
}

/** 파일 내용에서 플레이스홀더 치환 */
function replaceContent(content, names, templateComments, options) {
  const packageManager = options?.packageManager ?? "npm";
  let result = content
    .replace(/\{\{PASCAL_CASE\}\}/g, names.pascalCase)
    .replace(/\{\{SNAKE_CASE\}\}/g, names.snakeCase)
    .replace(/\{\{LOWERCASE\}\}/g, names.lowerCase)
    .replace(/\{\{DISPLAY_NAME\}\}/g, names.displayName)
    .replace(/\{\{KEBAB_CASE\}\}/g, names.kebabCase)
    .replace(/\{\{PACKAGE_MANAGER\}\}/g, packageManager)
    .replace(/\{\{JAVASCRIPT_RUNTIME\}\}/g, javascriptRuntime(packageManager))
    .replace(/\{\{DENO_PERMISSIONS\}\}/g, denoPermissions(packageManager))
    .replace(
      /\{\{PACKAGE_MANAGER_FIELD\}\}/g,
      packageManagerField(packageManager),
    );

  if (options) {
    result = result
      .replace(/\{\{ORGANIZATION\}\}/g, options.organization)
      .replace(/\{\{COPYRIGHT\}\}/g, options.copyright)
      .replace(/\{\{VERSION\}\}/g, options.version)
      .replace(/\{\{AUTHOR\}\}/g, options.author)
      .replace(/\{\{PROJECT_PATH\}\}/g, options.projectPath)
      .replace(/\{\{COPYRIGHT_JSON\}\}/g, JSON.stringify(options.copyright))
      .replace(/\{\{AUTHOR_JSON\}\}/g, JSON.stringify(options.author))
      .replace(/\{\{PROJECT_PATH_JSON\}\}/g, JSON.stringify(options.projectPath));
  }

  if (templateComments) {
    result = result.replace(/\{\{I18N:(\w+)\}\}/g, (_, key) => {
      return templateComments[key] ?? `{{I18N:${key}}}`;
    });
  }

  return result;
}

/**
 * 템플릿을 대상 디렉토리에 스케폴딩
 * @param {string} templateDir - 템플릿 디렉토리 경로
 * @param {string} targetDir - 생성할 프로젝트 디렉토리 경로
 * @param {object} names - 이름 변환 결과
 * @param {object} [templateComments] - i18n 템플릿 주석 ({{I18N:*}} 치환용)
 * @param {object} [options] - 추가 옵션 (organization, copyright, version, author, projectPath)
 */
export async function scaffold(templateDir, targetDir, names, templateComments, options) {
  const files = await walkDir(templateDir);
  const destinations = new Set();
  const plan = [];

  for (const srcPath of files) {
    // 템플릿 기준 상대 경로
    const relPath = relative(templateDir, srcPath);
    if (!includeTemplateFile(relPath, options)) continue;

    // 경로의 각 부분에서 파일명 치환
    const destRelPath = relPath
      .split(/[\\/]/)
      .map((part) => replaceFileName(part, names))
      .join("/");

    if (destinations.has(destRelPath)) {
      throw new Error(`Template paths collide after substitution: ${destRelPath}`);
    }
    destinations.add(destRelPath);

    const ext = srcPath.substring(srcPath.lastIndexOf(".")).toLowerCase();
    const binary = BINARY_EXTS.has(ext);
    let content;

    if (!binary) {
      const source = await readFile(srcPath, "utf-8");
      content = replaceContent(source, names, templateComments, options);
      const unresolved = content.match(/\{\{(?:[A-Z][A-Z0-9_]*|I18N:\w+)\}\}/);
      if (unresolved) {
        throw new Error(
          `Unresolved template placeholder ${unresolved[0]} in ${relPath}`,
        );
      }
    }

    plan.push({ srcPath, destRelPath, binary, content });
  }

  for (const item of plan) {
    const destPath = join(targetDir, item.destRelPath);
    await mkdir(dirname(destPath), { recursive: true });
    if (item.binary) {
      await copyFile(item.srcPath, destPath);
    } else {
      await writeFile(destPath, item.content, "utf-8");
    }
  }

  return plan.map((item) => item.destRelPath);
}
