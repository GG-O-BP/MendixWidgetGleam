import * as $command from "../etch/etch/command.mjs";
import * as $event from "../etch/etch/event.mjs";
import * as $stdout from "../etch/etch/stdout.mjs";
import * as $terminal from "../etch/etch/terminal.mjs";
import * as $array from "../gleam_javascript/gleam/javascript/array.mjs";
import * as $promise from "../gleam_javascript/gleam/javascript/promise.mjs";
import * as $io from "../gleam_stdlib/gleam/io.mjs";
import * as $list from "../gleam_stdlib/gleam/list.mjs";
import * as $option from "../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../gleam_stdlib/gleam/option.mjs";
import * as $result from "../gleam_stdlib/gleam/result.mjs";
import * as $string from "../gleam_stdlib/gleam/string.mjs";
import { Ok, toList, Empty as $Empty, CustomType as $CustomType, makeError } from "./gleam.mjs";
import * as $prompt from "./tui/prompt.mjs";
import {
  dir_exists,
  detect_pm,
  process_exit,
  is_valid_name,
  get_current_year,
  is_valid_version,
  is_valid_org,
  split_words as split_words_ffi,
} from "./tui_ffi.mjs";

const FILEPATH = "src\\tui.gleam";

export class Options extends $CustomType {
  constructor(project_name, organization, copyright, license, version, author, project_path, pm, lang) {
    super();
    this.project_name = project_name;
    this.organization = organization;
    this.copyright = copyright;
    this.license = license;
    this.version = version;
    this.author = author;
    this.project_path = project_path;
    this.pm = pm;
    this.lang = lang;
  }
}
export const Options$Options = (project_name, organization, copyright, license, version, author, project_path, pm, lang) =>
  new Options(project_name,
  organization,
  copyright,
  license,
  version,
  author,
  project_path,
  pm,
  lang);
export const Options$isOptions = (value) => value instanceof Options;
export const Options$Options$project_name = (value) => value.project_name;
export const Options$Options$0 = (value) => value.project_name;
export const Options$Options$organization = (value) => value.organization;
export const Options$Options$1 = (value) => value.organization;
export const Options$Options$copyright = (value) => value.copyright;
export const Options$Options$2 = (value) => value.copyright;
export const Options$Options$license = (value) => value.license;
export const Options$Options$3 = (value) => value.license;
export const Options$Options$version = (value) => value.version;
export const Options$Options$4 = (value) => value.version;
export const Options$Options$author = (value) => value.author;
export const Options$Options$5 = (value) => value.author;
export const Options$Options$project_path = (value) => value.project_path;
export const Options$Options$6 = (value) => value.project_path;
export const Options$Options$pm = (value) => value.pm;
export const Options$Options$7 = (value) => value.pm;
export const Options$Options$lang = (value) => value.lang;
export const Options$Options$8 = (value) => value.lang;

function split_words(input) {
  let _pipe = split_words_ffi(input);
  return $array.to_list(_pipe);
}

function list_at(items, index) {
  let _pipe = items;
  let _pipe$1 = $list.drop(_pipe, index);
  return $list.first(_pipe$1);
}

function capitalize(word) {
  let $ = $string.first(word);
  if ($ instanceof Ok) {
    let first = $[0];
    return $string.uppercase(first) + $string.drop_start(word, 1);
  } else {
    return "";
  }
}

function to_pascal(words) {
  let _pipe = words;
  let _pipe$1 = $list.map(_pipe, capitalize);
  return $string.join(_pipe$1, "");
}

function to_snake(words) {
  return $string.join(words, "_");
}

function t(lang, key) {
  if (key === "lang.title") {
    return "Language / 언어 / 言語";
  } else if (key === "name.title") {
    if (lang === "en") {
      return "Project name";
    } else if (lang === "ko") {
      return "프로젝트 이름";
    } else if (lang === "ja") {
      return "プロジェクト名";
    } else {
      return key;
    }
  } else if (key === "name.widget") {
    if (lang === "en") {
      return "Widget";
    } else if (lang === "ko") {
      return "위젯";
    } else if (lang === "ja") {
      return "ウィジェット";
    } else {
      return key;
    }
  } else if (key === "name.module") {
    if (lang === "en") {
      return "Module";
    } else if (lang === "ko") {
      return "모듈";
    } else if (lang === "ja") {
      return "モジュール";
    } else {
      return key;
    }
  } else if (key === "name.empty") {
    if (lang === "en") {
      return "Please enter a project name.";
    } else if (lang === "ko") {
      return "프로젝트 이름을 입력해주세요.";
    } else if (lang === "ja") {
      return "プロジェクト名を入力してください。";
    } else {
      return key;
    }
  } else if (key === "name.invalid") {
    if (lang === "en") {
      return "Must start with a letter (a-z, A-Z, 0-9, -, _ only)";
    } else if (lang === "ko") {
      return "영문자로 시작, 영문자/숫자/-/_ 만 사용 가능";
    } else if (lang === "ja") {
      return "英字で始まり、英字/数字/-/_ のみ使用可能";
    } else {
      return key;
    }
  } else if (key === "name.exists") {
    if (lang === "en") {
      return "Directory already exists!";
    } else if (lang === "ko") {
      return "디렉토리가 이미 존재합니다!";
    } else if (lang === "ja") {
      return "ディレクトリは既に存在します！";
    } else {
      return key;
    }
  } else if (key === "org.title") {
    if (lang === "en") {
      return "Organization";
    } else if (lang === "ko") {
      return "조직";
    } else if (lang === "ja") {
      return "組織";
    } else {
      return key;
    }
  } else if (key === "org.empty") {
    if (lang === "en") {
      return "Please enter an organization name.";
    } else if (lang === "ko") {
      return "조직 이름을 입력해주세요.";
    } else if (lang === "ja") {
      return "組織名を入力してください。";
    } else {
      return key;
    }
  } else if (key === "org.invalid") {
    if (lang === "en") {
      return "Lowercase letters, numbers, and hyphens only (a-z start)";
    } else if (lang === "ko") {
      return "소문자로 시작, 소문자/숫자/하이픈만 사용 가능";
    } else if (lang === "ja") {
      return "小文字で始まり、小文字/数字/ハイフンのみ使用可能";
    } else {
      return key;
    }
  } else if (key === "copyright.title") {
    if (lang === "en") {
      return "Copyright";
    } else if (lang === "ko") {
      return "저작권";
    } else if (lang === "ja") {
      return "著作権";
    } else {
      return key;
    }
  } else if (key === "copyright.empty") {
    if (lang === "en") {
      return "Please enter copyright text.";
    } else if (lang === "ko") {
      return "저작권 문구를 입력해주세요.";
    } else if (lang === "ja") {
      return "著作権テキストを入力してください。";
    } else {
      return key;
    }
  } else if (key === "license.title") {
    if (lang === "en") {
      return "License";
    } else if (lang === "ko") {
      return "라이센스";
    } else if (lang === "ja") {
      return "ライセンス";
    } else {
      return key;
    }
  } else if (key === "version.title") {
    if (lang === "en") {
      return "Version";
    } else if (lang === "ko") {
      return "버전";
    } else if (lang === "ja") {
      return "バージョン";
    } else {
      return key;
    }
  } else if (key === "version.invalid") {
    if (lang === "en") {
      return "Must be semver format (e.g. 0.0.1)";
    } else if (lang === "ko") {
      return "semver 형식이어야 합니다 (예: 0.0.1)";
    } else if (lang === "ja") {
      return "semver形式でなければなりません（例：0.0.1）";
    } else {
      return key;
    }
  } else if (key === "author.title") {
    if (lang === "en") {
      return "Author";
    } else if (lang === "ko") {
      return "작성자";
    } else if (lang === "ja") {
      return "作者";
    } else {
      return key;
    }
  } else if (key === "author.empty") {
    if (lang === "en") {
      return "Please enter author name.";
    } else if (lang === "ko") {
      return "작성자를 입력해주세요.";
    } else if (lang === "ja") {
      return "作者名を入力してください。";
    } else {
      return key;
    }
  } else if (key === "path.title") {
    if (lang === "en") {
      return "Project Path";
    } else if (lang === "ko") {
      return "프로젝트 경로";
    } else if (lang === "ja") {
      return "プロジェクトパス";
    } else {
      return key;
    }
  } else if (key === "path.empty") {
    if (lang === "en") {
      return "Please enter project path.";
    } else if (lang === "ko") {
      return "프로젝트 경로를 입력해주세요.";
    } else if (lang === "ja") {
      return "プロジェクトパスを入力してください。";
    } else {
      return key;
    }
  } else if (key === "pm.title") {
    if (lang === "en") {
      return "Package Manager";
    } else if (lang === "ko") {
      return "패키지 매니저";
    } else if (lang === "ja") {
      return "パッケージマネージャー";
    } else {
      return key;
    }
  } else if (key === "pm.detected") {
    if (lang === "en") {
      return "detected";
    } else if (lang === "ko") {
      return "감지됨";
    } else if (lang === "ja") {
      return "検出済み";
    } else {
      return key;
    }
  } else if (key === "hint.select") {
    return "↑↓ move  ⏎ select  Esc cancel";
  } else if (key === "hint.input") {
    return "⏎ confirm  Esc cancel";
  } else if (key === "cancelled") {
    if (lang === "en") {
      return "Cancelled.";
    } else if (lang === "ko") {
      return "취소되었습니다.";
    } else if (lang === "ja") {
      return "キャンセルされました。";
    } else {
      return key;
    }
  } else {
    return key;
  }
}

function validate_name(lang, value) {
  let trimmed = $string.trim(value);
  if (trimmed === "") {
    return new Some(t(lang, "name.empty"));
  } else {
    let $ = is_valid_name(trimmed);
    if ($) {
      let $1 = dir_exists(trimmed);
      if ($1) {
        return new Some(t(lang, "name.exists"));
      } else {
        return new None();
      }
    } else {
      return new Some(t(lang, "name.invalid"));
    }
  }
}

function validate_org(lang, value) {
  let trimmed = $string.trim(value);
  if (trimmed === "") {
    return new Some(t(lang, "org.empty"));
  } else {
    let $ = is_valid_org(trimmed);
    if ($) {
      return new None();
    } else {
      return new Some(t(lang, "org.invalid"));
    }
  }
}

function validate_version(lang, value) {
  let $ = is_valid_version($string.trim(value));
  if ($) {
    return new None();
  } else {
    return new Some(t(lang, "version.invalid"));
  }
}

function validate_not_empty(lang, error_key, value) {
  let $ = $string.trim(value);
  if ($ === "") {
    return new Some(t(lang, error_key));
  } else {
    return new None();
  }
}

function name_preview(lang, value) {
  let words = split_words($string.trim(value));
  if (words instanceof $Empty) {
    return words;
  } else {
    return toList([
      (t(lang, "name.widget") + ":  ") + to_pascal(words),
      (t(lang, "name.module") + ":  ") + to_snake(words),
    ]);
  }
}

function no_preview(_) {
  return toList([]);
}

function cleanup() {
  $stdout.execute(
    toList([new $command.ShowCursor(), new $command.LeaveAlternateScreen()]),
  );
  let $ = $terminal.exit_raw();
  
  return undefined;
}

function cancel(lang) {
  cleanup();
  $io.println("\n" + t(lang, "cancelled"));
  process_exit(0);
  return $promise.resolve(new Options("", "", "", "", "", "", "", "", ""));
}

export function collect_options(cli_name) {
  let $ = $terminal.enter_raw();
  if (!($ instanceof Ok)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "tui",
      265,
      "collect_options",
      "Pattern match failed, no pattern matched the value.",
      {
        value: $,
        start: 8812,
        end: 8851,
        pattern_start: 8823,
        pattern_end: 8828
      }
    )
  }
  $stdout.execute(
    toList([new $command.EnterAlternateScreen(), new $command.HideCursor()]),
  );
  let $1 = $event.init_event_server();
  
  let languages = toList(["English", "한국어", "日本語"]);
  let lang_codes = toList(["en", "ko", "ja"]);
  return $promise.await$(
    $prompt.select(
      toList([]),
      t("en", "lang.title"),
      languages,
      0,
      t("en", "hint.select"),
    ),
    (lang_idx) => {
      let $2 = lang_idx < 0;
      if ($2) {
        return cancel("en");
      } else {
        let lang = $result.unwrap(list_at(lang_codes, lang_idx), "en");
        let lang_label = $result.unwrap(list_at(languages, lang_idx), "English");
        let completed = toList([["Language", lang_label]]);
        $stdout.execute(toList([new $command.ShowCursor()]));
        return $promise.await$(
          $prompt.text_input(
            completed,
            t(lang, "name.title"),
            cli_name,
            (_capture) => { return validate_name(lang, _capture); },
            (_capture) => { return name_preview(lang, _capture); },
            t(lang, "hint.input"),
          ),
          (name_result) => {
            if (name_result instanceof Ok) {
              let name = name_result[0];
              let completed$1 = $list.append(
                completed,
                toList([[t(lang, "name.title"), name]]),
              );
              return $promise.await$(
                $prompt.text_input(
                  completed$1,
                  t(lang, "org.title"),
                  "mendix",
                  (_capture) => { return validate_org(lang, _capture); },
                  no_preview,
                  t(lang, "hint.input"),
                ),
                (org_result) => {
                  if (org_result instanceof Ok) {
                    let org = org_result[0];
                    let completed$2 = $list.append(
                      completed$1,
                      toList([[t(lang, "org.title"), org]]),
                    );
                    let year = get_current_year();
                    let default_copyright = ("© Mendix Technology BV " + year) + ". All rights reserved.";
                    return $promise.await$(
                      $prompt.text_input(
                        completed$2,
                        t(lang, "copyright.title"),
                        default_copyright,
                        (_capture) => {
                          return validate_not_empty(
                            lang,
                            "copyright.empty",
                            _capture,
                          );
                        },
                        no_preview,
                        t(lang, "hint.input"),
                      ),
                      (copyright_result) => {
                        if (copyright_result instanceof Ok) {
                          let copyright = copyright_result[0];
                          let completed$3 = $list.append(
                            completed$2,
                            toList([[t(lang, "copyright.title"), copyright]]),
                          );
                          $stdout.execute(toList([new $command.HideCursor()]));
                          let licenses = toList([
                            "Apache-2.0",
                            "BlueOak-1.0.0",
                            "GPL-3.0-only",
                            "GPL-2.0-only",
                            "MIT",
                            "MPL-2.0",
                          ]);
                          return $promise.await$(
                            $prompt.select(
                              completed$3,
                              t(lang, "license.title"),
                              licenses,
                              0,
                              t(lang, "hint.select"),
                            ),
                            (license_idx) => {
                              let $3 = license_idx < 0;
                              if ($3) {
                                return cancel(lang);
                              } else {
                                let license = $result.unwrap(
                                  list_at(licenses, license_idx),
                                  "Apache-2.0",
                                );
                                let completed$4 = $list.append(
                                  completed$3,
                                  toList([[t(lang, "license.title"), license]]),
                                );
                                $stdout.execute(
                                  toList([new $command.ShowCursor()]),
                                );
                                return $promise.await$(
                                  $prompt.text_input(
                                    completed$4,
                                    t(lang, "version.title"),
                                    "0.0.1",
                                    (_capture) => {
                                      return validate_version(lang, _capture);
                                    },
                                    no_preview,
                                    t(lang, "hint.input"),
                                  ),
                                  (version_result) => {
                                    if (version_result instanceof Ok) {
                                      let version = version_result[0];
                                      let completed$5 = $list.append(
                                        completed$4,
                                        toList([
                                          [t(lang, "version.title"), version],
                                        ]),
                                      );
                                      return $promise.await$(
                                        $prompt.text_input(
                                          completed$5,
                                          t(lang, "author.title"),
                                          "A.N. Other",
                                          (_capture) => {
                                            return validate_not_empty(
                                              lang,
                                              "author.empty",
                                              _capture,
                                            );
                                          },
                                          no_preview,
                                          t(lang, "hint.input"),
                                        ),
                                        (author_result) => {
                                          if (author_result instanceof Ok) {
                                            let author = author_result[0];
                                            let completed$6 = $list.append(
                                              completed$5,
                                              toList([
                                                [
                                                  t(lang, "author.title"),
                                                  author,
                                                ],
                                              ]),
                                            );
                                            return $promise.await$(
                                              $prompt.text_input(
                                                completed$6,
                                                t(lang, "path.title"),
                                                "./tests/testProject",
                                                (_capture) => {
                                                  return validate_not_empty(
                                                    lang,
                                                    "path.empty",
                                                    _capture,
                                                  );
                                                },
                                                no_preview,
                                                t(lang, "hint.input"),
                                              ),
                                              (path_result) => {
                                                if (path_result instanceof Ok) {
                                                  let project_path = path_result[0];
                                                  let completed$7 = $list.append(
                                                    completed$6,
                                                    toList([
                                                      [
                                                        t(lang, "path.title"),
                                                        project_path,
                                                      ],
                                                    ]),
                                                  );
                                                  $stdout.execute(
                                                    toList([
                                                      new $command.HideCursor(),
                                                    ]),
                                                  );
                                                  let detected = detect_pm();
                                                  let pms = toList([
                                                    "npm",
                                                    "yarn",
                                                    "pnpm",
                                                    "bun",
                                                  ]);
                                                  let _block;
                                                  if (detected === "yarn") {
                                                    _block = 1;
                                                  } else if (detected === "pnpm") {
                                                    _block = 2;
                                                  } else if (detected === "bun") {
                                                    _block = 3;
                                                  } else {
                                                    _block = 0;
                                                  }
                                                  let default_idx = _block;
                                                  let pm_labels = $list.map(
                                                    pms,
                                                    (pm) => {
                                                      let $4 = pm === detected;
                                                      if ($4) {
                                                        return (pm + "  ← ") + t(
                                                          lang,
                                                          "pm.detected",
                                                        );
                                                      } else {
                                                        return pm;
                                                      }
                                                    },
                                                  );
                                                  return $promise.await$(
                                                    $prompt.select(
                                                      completed$7,
                                                      t(lang, "pm.title"),
                                                      pm_labels,
                                                      default_idx,
                                                      t(lang, "hint.select"),
                                                    ),
                                                    (pm_idx) => {
                                                      let $4 = pm_idx < 0;
                                                      if ($4) {
                                                        return cancel(lang);
                                                      } else {
                                                        let pm = $result.unwrap(
                                                          list_at(pms, pm_idx),
                                                          "npm",
                                                        );
                                                        cleanup();
                                                        return $promise.resolve(
                                                          new Options(
                                                            name,
                                                            org,
                                                            copyright,
                                                            license,
                                                            version,
                                                            author,
                                                            project_path,
                                                            pm,
                                                            lang,
                                                          ),
                                                        );
                                                      }
                                                    },
                                                  );
                                                } else {
                                                  return cancel(lang);
                                                }
                                              },
                                            );
                                          } else {
                                            return cancel(lang);
                                          }
                                        },
                                      );
                                    } else {
                                      return cancel(lang);
                                    }
                                  },
                                );
                              }
                            },
                          );
                        } else {
                          return cancel(lang);
                        }
                      },
                    );
                  } else {
                    return cancel(lang);
                  }
                },
              );
            } else {
              return cancel(lang);
            }
          },
        );
      }
    },
  );
}
