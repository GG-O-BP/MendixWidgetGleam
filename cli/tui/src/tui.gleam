// create-mendix-widget-gleam TUI — etch 기반 인터랙티브 프롬프트

import etch/command
import etch/event
import etch/stdout
import etch/terminal
import gleam/io
import gleam/javascript/array.{type Array as JsArray}
import gleam/javascript/promise.{type Promise}
import gleam/list
import gleam/option.{type Option, None, Some}
import gleam/result
import gleam/string
import tui/prompt

// ── FFI ─────────────────────────────────────────────────────

@external(javascript, "./tui_ffi.mjs", "dir_exists")
fn dir_exists(name: String) -> Bool

@external(javascript, "./tui_ffi.mjs", "detect_pm")
fn detect_pm() -> String

@external(javascript, "./tui_ffi.mjs", "process_exit")
fn process_exit(code: Int) -> Nil

@external(javascript, "./tui_ffi.mjs", "is_valid_name")
fn is_valid_name(name: String) -> Bool

@external(javascript, "./tui_ffi.mjs", "get_current_year")
fn get_current_year() -> String

@external(javascript, "./tui_ffi.mjs", "is_valid_version")
fn is_valid_version(value: String) -> Bool

@external(javascript, "./tui_ffi.mjs", "is_valid_org")
fn is_valid_org(value: String) -> Bool

@external(javascript, "./tui_ffi.mjs", "split_words")
fn split_words_ffi(input: String) -> JsArray(String)

fn split_words(input: String) -> List(String) {
  split_words_ffi(input) |> array.to_list
}

fn list_at(items: List(a), index: Int) -> Result(a, Nil) {
  items |> list.drop(index) |> list.first
}

// ── 결과 타입 ───────────────────────────────────────────────

pub type Options {
  Options(
    project_name: String,
    organization: String,
    copyright: String,
    license: String,
    version: String,
    author: String,
    project_path: String,
    pm: String,
    lang: String,
  )
}

// ── 이름 변환 ───────────────────────────────────────────────

fn capitalize(word: String) -> String {
  case string.first(word) {
    Ok(first) -> string.uppercase(first) <> string.drop_start(word, 1)
    Error(_) -> ""
  }
}

fn to_pascal(words: List(String)) -> String {
  words |> list.map(capitalize) |> string.join("")
}

fn to_snake(words: List(String)) -> String {
  string.join(words, "_")
}

// ── i18n (프롬프트 전용) ────────────────────────────────────

fn t(lang: String, key: String) -> String {
  case lang, key {
    _, "lang.title" -> "Language / 언어 / 言語"

    "en", "name.title" -> "Project name"
    "ko", "name.title" -> "프로젝트 이름"
    "ja", "name.title" -> "プロジェクト名"

    "en", "name.widget" -> "Widget"
    "ko", "name.widget" -> "위젯"
    "ja", "name.widget" -> "ウィジェット"

    "en", "name.module" -> "Module"
    "ko", "name.module" -> "모듈"
    "ja", "name.module" -> "モジュール"

    "en", "name.empty" -> "Please enter a project name."
    "ko", "name.empty" -> "프로젝트 이름을 입력해주세요."
    "ja", "name.empty" -> "プロジェクト名を入力してください。"

    "en", "name.invalid" ->
      "Must start with a letter (a-z, A-Z, 0-9, -, _ only)"
    "ko", "name.invalid" -> "영문자로 시작, 영문자/숫자/-/_ 만 사용 가능"
    "ja", "name.invalid" -> "英字で始まり、英字/数字/-/_ のみ使用可能"

    "en", "name.exists" -> "Directory already exists!"
    "ko", "name.exists" -> "디렉토리가 이미 존재합니다!"
    "ja", "name.exists" -> "ディレクトリは既に存在します！"

    "en", "org.title" -> "Organization"
    "ko", "org.title" -> "조직"
    "ja", "org.title" -> "組織"

    "en", "org.empty" -> "Please enter an organization name."
    "ko", "org.empty" -> "조직 이름을 입력해주세요."
    "ja", "org.empty" -> "組織名を入力してください。"

    "en", "org.invalid" ->
      "Lowercase letters, numbers, and hyphens only (a-z start)"
    "ko", "org.invalid" -> "소문자로 시작, 소문자/숫자/하이픈만 사용 가능"
    "ja", "org.invalid" -> "小文字で始まり、小文字/数字/ハイフンのみ使用可能"

    "en", "copyright.title" -> "Copyright"
    "ko", "copyright.title" -> "저작권"
    "ja", "copyright.title" -> "著作権"

    "en", "copyright.empty" -> "Please enter copyright text."
    "ko", "copyright.empty" -> "저작권 문구를 입력해주세요."
    "ja", "copyright.empty" -> "著作権テキストを入力してください。"

    "en", "license.title" -> "License"
    "ko", "license.title" -> "라이센스"
    "ja", "license.title" -> "ライセンス"

    "en", "version.title" -> "Version"
    "ko", "version.title" -> "버전"
    "ja", "version.title" -> "バージョン"

    "en", "version.invalid" -> "Must be semver format (e.g. 0.0.1)"
    "ko", "version.invalid" -> "semver 형식이어야 합니다 (예: 0.0.1)"
    "ja", "version.invalid" -> "semver形式でなければなりません（例：0.0.1）"

    "en", "author.title" -> "Author"
    "ko", "author.title" -> "작성자"
    "ja", "author.title" -> "作者"

    "en", "author.empty" -> "Please enter author name."
    "ko", "author.empty" -> "작성자를 입력해주세요."
    "ja", "author.empty" -> "作者名を入力してください。"

    "en", "path.title" -> "Project Path"
    "ko", "path.title" -> "프로젝트 경로"
    "ja", "path.title" -> "プロジェクトパス"

    "en", "path.empty" -> "Please enter project path."
    "ko", "path.empty" -> "프로젝트 경로를 입력해주세요."
    "ja", "path.empty" -> "プロジェクトパスを入力してください。"

    "en", "pm.title" -> "Package Manager"
    "ko", "pm.title" -> "패키지 매니저"
    "ja", "pm.title" -> "パッケージマネージャー"

    "en", "pm.detected" -> "detected"
    "ko", "pm.detected" -> "감지됨"
    "ja", "pm.detected" -> "検出済み"

    _, "hint.select" -> "↑↓ move  ⏎ select  Esc cancel"
    _, "hint.input" -> "⏎ confirm  Esc cancel"

    "en", "cancelled" -> "Cancelled."
    "ko", "cancelled" -> "취소되었습니다."
    "ja", "cancelled" -> "キャンセルされました。"

    _, _ -> key
  }
}

// ── 검증 ────────────────────────────────────────────────────

fn validate_name(lang: String, value: String) -> Option(String) {
  let trimmed = string.trim(value)
  case trimmed {
    "" -> Some(t(lang, "name.empty"))
    _ ->
      case is_valid_name(trimmed) {
        False -> Some(t(lang, "name.invalid"))
        True ->
          case dir_exists(trimmed) {
            True -> Some(t(lang, "name.exists"))
            False -> None
          }
      }
  }
}

fn validate_org(lang: String, value: String) -> Option(String) {
  let trimmed = string.trim(value)
  case trimmed {
    "" -> Some(t(lang, "org.empty"))
    _ ->
      case is_valid_org(trimmed) {
        False -> Some(t(lang, "org.invalid"))
        True -> None
      }
  }
}

fn validate_version(lang: String, value: String) -> Option(String) {
  case is_valid_version(string.trim(value)) {
    False -> Some(t(lang, "version.invalid"))
    True -> None
  }
}

fn validate_not_empty(
  lang: String,
  error_key: String,
  value: String,
) -> Option(String) {
  case string.trim(value) {
    "" -> Some(t(lang, error_key))
    _ -> None
  }
}

fn name_preview(lang: String, value: String) -> List(String) {
  let words = split_words(string.trim(value))
  case words {
    [] -> []
    _ -> [
      t(lang, "name.widget") <> ":  " <> to_pascal(words),
      t(lang, "name.module") <> ":  " <> to_snake(words),
    ]
  }
}

fn no_preview(_value: String) -> List(String) {
  []
}

// ── 취소 처리 ───────────────────────────────────────────────

fn cancel(lang: String) -> Promise(Options) {
  cleanup()
  io.println("\n" <> t(lang, "cancelled"))
  process_exit(0)
  // unreachable — process_exit 이후 도달하지 않음
  promise.resolve(Options("", "", "", "", "", "", "", "", ""))
}

fn cleanup() {
  stdout.execute([command.ShowCursor, command.LeaveAlternateScreen])
  let _ = terminal.exit_raw()
  Nil
}

// ── 메인 엔트리 ─────────────────────────────────────────────

pub fn collect_options(cli_name: String) -> Promise(Options) {
  // raw mode 진입 후 이벤트 서버 시작 (fire-and-forget: 내부 무한 루프)
  let assert Ok(_) = terminal.enter_raw()
  stdout.execute([command.EnterAlternateScreen, command.HideCursor])
  let _ = event.init_event_server()

  // 1단계: 언어 선택
  let languages = ["English", "한국어", "日本語"]
  let lang_codes = ["en", "ko", "ja"]

  use lang_idx <- promise.await(prompt.select(
    [],
    t("en", "lang.title"),
    languages,
    0,
    t("en", "hint.select"),
  ))

  case lang_idx < 0 {
    True -> cancel("en")
    False -> {
      let lang = result.unwrap(list_at(lang_codes, lang_idx), "en")
      let lang_label = result.unwrap(list_at(languages, lang_idx), "English")
      let completed = [#("Language", lang_label)]

      // 2단계: 프로젝트 이름
      stdout.execute([command.ShowCursor])
      use name_result <- promise.await(prompt.text_input(
        completed,
        t(lang, "name.title"),
        cli_name,
        validate_name(lang, _),
        name_preview(lang, _),
        t(lang, "hint.input"),
      ))

      case name_result {
        Error(_) -> cancel(lang)
        Ok(name) -> {
          let completed =
            list.append(completed, [#(t(lang, "name.title"), name)])

          // 3단계: Organization
          use org_result <- promise.await(prompt.text_input(
            completed,
            t(lang, "org.title"),
            "mendix",
            validate_org(lang, _),
            no_preview,
            t(lang, "hint.input"),
          ))

          case org_result {
            Error(_) -> cancel(lang)
            Ok(org) -> {
              let completed =
                list.append(completed, [#(t(lang, "org.title"), org)])

              // 4단계: Copyright
              let year = get_current_year()
              let default_copyright =
                "© Mendix Technology BV " <> year <> ". All rights reserved."
              use copyright_result <- promise.await(prompt.text_input(
                completed,
                t(lang, "copyright.title"),
                default_copyright,
                validate_not_empty(lang, "copyright.empty", _),
                no_preview,
                t(lang, "hint.input"),
              ))

              case copyright_result {
                Error(_) -> cancel(lang)
                Ok(copyright) -> {
                  let completed =
                    list.append(completed, [
                      #(t(lang, "copyright.title"), copyright),
                    ])
                  stdout.execute([command.HideCursor])

                  // 5단계: License 선택
                  let licenses = [
                    "Apache-2.0", "BlueOak-1.0.0", "GPL-3.0-only",
                    "GPL-2.0-only", "MIT", "MPL-2.0",
                  ]
                  use license_idx <- promise.await(prompt.select(
                    completed,
                    t(lang, "license.title"),
                    licenses,
                    0,
                    t(lang, "hint.select"),
                  ))

                  case license_idx < 0 {
                    True -> cancel(lang)
                    False -> {
                      let license =
                        result.unwrap(
                          list_at(licenses, license_idx),
                          "Apache-2.0",
                        )
                      let completed =
                        list.append(completed, [
                          #(t(lang, "license.title"), license),
                        ])
                      stdout.execute([command.ShowCursor])

                      // 6단계: Version
                      use version_result <- promise.await(prompt.text_input(
                        completed,
                        t(lang, "version.title"),
                        "0.0.1",
                        validate_version(lang, _),
                        no_preview,
                        t(lang, "hint.input"),
                      ))

                      case version_result {
                        Error(_) -> cancel(lang)
                        Ok(version) -> {
                          let completed =
                            list.append(completed, [
                              #(t(lang, "version.title"), version),
                            ])

                          // 7단계: Author
                          use author_result <- promise.await(prompt.text_input(
                            completed,
                            t(lang, "author.title"),
                            "A.N. Other",
                            validate_not_empty(lang, "author.empty", _),
                            no_preview,
                            t(lang, "hint.input"),
                          ))

                          case author_result {
                            Error(_) -> cancel(lang)
                            Ok(author) -> {
                              let completed =
                                list.append(completed, [
                                  #(t(lang, "author.title"), author),
                                ])

                              // 8단계: Project Path
                              use path_result <- promise.await(
                                prompt.text_input(
                                  completed,
                                  t(lang, "path.title"),
                                  "./tests/testProject",
                                  validate_not_empty(lang, "path.empty", _),
                                  no_preview,
                                  t(lang, "hint.input"),
                                ),
                              )

                              case path_result {
                                Error(_) -> cancel(lang)
                                Ok(project_path) -> {
                                  let completed =
                                    list.append(completed, [
                                      #(t(lang, "path.title"), project_path),
                                    ])
                                  stdout.execute([command.HideCursor])

                                  // 9단계: 패키지 매니저
                                  let detected = detect_pm()
                                  let pms = ["npm", "yarn", "pnpm", "bun"]
                                  let default_idx = case detected {
                                    "yarn" -> 1
                                    "pnpm" -> 2
                                    "bun" -> 3
                                    _ -> 0
                                  }
                                  let pm_labels =
                                    list.map(pms, fn(pm) {
                                      case pm == detected {
                                        True ->
                                          pm <> "  ← " <> t(lang, "pm.detected")
                                        False -> pm
                                      }
                                    })

                                  use pm_idx <- promise.await(prompt.select(
                                    completed,
                                    t(lang, "pm.title"),
                                    pm_labels,
                                    default_idx,
                                    t(lang, "hint.select"),
                                  ))

                                  case pm_idx < 0 {
                                    True -> cancel(lang)
                                    False -> {
                                      let pm =
                                        result.unwrap(
                                          list_at(pms, pm_idx),
                                          "npm",
                                        )
                                      cleanup()
                                      promise.resolve(Options(
                                        project_name: name,
                                        organization: org,
                                        copyright: copyright,
                                        license: license,
                                        version: version,
                                        author: author,
                                        project_path: project_path,
                                        pm: pm,
                                        lang: lang,
                                      ))
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
