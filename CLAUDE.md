# CLAUDE.md

このファイルは、このリポジトリで作業する Claude Code 向けのガイドです。

## プロジェクト概要

task-board — タスク管理ボードアプリケーション。

- `src/main.jsx` — エントリーポイント。`App` を `StrictMode` でマウントする
- `src/App.jsx` — タスクの追加・完了切り替え・削除を行うメインコンポーネント(状態は `useState` で保持し、localStorage のキー `task-board.tasks` に保存)
- `src/App.css` — `App` のスタイル / `src/index.css` — 全体共通のスタイル

## 技術スタック

| 用途 | 採用技術 |
| --- | --- |
| UI ライブラリ | React 19(関数コンポーネント + Hooks) |
| ビルドツール / 開発サーバー | Vite 8(`@vitejs/plugin-react`) |
| 言語 | JavaScript(JSX)。TypeScript は未導入 |
| スタイル | プレーン CSS(CSS Modules・CSS-in-JS・UI ライブラリは未使用) |
| 状態管理 | React の `useState` のみ(外部ライブラリなし) |
| データ永続化 | ブラウザの localStorage |
| Lint | oxlint(`.oxlintrc.json`) |
| CI / ホスティング | GitHub Actions → GitHub Pages |

新しいライブラリを追加するときは、事前にユーザーに確認する。

## コンポーネントの命名規約

- **コンポーネント名**: PascalCase(例: `App`, `TaskItem`)。関数宣言 `function TaskItem() {}` で定義し、`export default` する。
- **ファイル**: 1ファイル1コンポーネント。ファイル名はコンポーネント名と同じ PascalCase + `.jsx`(例: `TaskItem.jsx`)。配置は `src/` 直下(数が増えたら `src/components/` に分ける)。
- **スタイル**: コンポーネントと同名の CSS ファイルを用意し、コンポーネント側で `import './TaskItem.css'` する。
- **className**: 小文字の kebab-case(例: `task-list`, `add-form`)。状態は追加のクラスで表す(例: `task done`)。
- **イベントハンドラ**: 動詞 + 名詞の camelCase(例: `addTask`, `toggleTask`, `deleteTask`)。props で渡すときは `onXxx`(例: `onToggle`, `onDelete`)。
- **state**: 名詞の camelCase で、setter は `setXxx`(例: `tasks` / `setTasks`)。真偽値は `done` のように状態を表す名前にする。
- **モジュール定数**: UPPER_SNAKE_CASE(例: `STORAGE_KEY`)。
- **UI テキスト**: 画面上の文言やアクセシビリティ用ラベル(`aria-label`)は日本語で書く。

## 開発コマンド

- 依存関係のインストール: `npm install`
- 開発サーバー起動: `npm run dev`
- 本番ビルド: `npm run build`
- Lint: `npm run lint`

## デプロイ先

https://hassaku72.github.io/task-board/

- GitHub Pages で公開している。
- `main` へのプッシュで `.github/workflows/deploy.yml` が lint・ビルドして自動デプロイする。
- サブパスで配信されるため `vite.config.js` の `base` は `/task-board/`。リポジトリ名を変えたらここも合わせる。

## Git 運用ルール

**コードを変更したら、そのたびにコミットして GitHub にプッシュすること。**

1. 変更がまとまったら、作業の区切りごとにコミットする(複数の無関係な変更を1コミットに混ぜない)。
2. コミット前に `git status` と `git diff` で変更内容を確認し、意図しないファイルが含まれていないか確かめる。
3. テストや Lint があれば、コミット前に実行して通ることを確認する。
4. コミット後は必ず `git push` で GitHub のリモートへプッシュする。
5. プッシュに失敗した場合(リモートに新しい変更がある等)は、`git pull --rebase` で取り込んでから再度プッシュする。コンフリクトが起きたら解消方法をユーザーに確認する。

### コミットメッセージ

- 1行目に変更内容を簡潔に書く(50文字程度まで)。日本語で可。
- 必要に応じて空行のあとに変更理由や詳細を書く。

### 禁止事項

- `git push --force` など履歴を書き換える操作は、ユーザーの明示的な許可なしに行わない。
- `.env`、APIキー、認証情報などの秘密情報をコミットしない(`.gitignore` に追加する)。
- `--no-verify` でフックをスキップしない。
