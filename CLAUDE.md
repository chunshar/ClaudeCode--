# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## リポジトリの構成

このリポジトリは共通のビルドシステムを持たない、独立した複数のミニプロジェクトの集合です。各ディレクトリは完全に独立しており、それぞれ個別に作業する必要があります。

- `todo/` — Vanilla JS の ToDo リストアプリ。ビルド不要、`index.html` を直接ブラウザで開いて動作確認する。状態は `localStorage`（キー: `todos`）に保存し、`script.js` 内でグローバル関数（`render()` 等)を使って手動で DOM を再描画する構成。
- `weather/` — Vanilla JS の天気予報アプリ。東京固定の緯度経度で [Open-Meteo API](https://api.open-meteo.com/) を `fetch` で呼び出し、現在の天気と週間予報を描画する。ビルド不要、`index.html` を直接開いて確認する。
- `test-tdd/` — Jest を使った TDD 練習用ディレクトリ。`isValidEmail.test.js` のみが存在し、テスト対象の関数はテストファイル内に直接定義されている。
- `vite-react-app/` — `npm create vite@latest` で作成した Vite + React（JavaScript）アプリ。他のディレクトリと異なり、npm によるビルド・開発サーバー・lint が必要。

新しいミニプロジェクトを追加する場合も、既存の各ディレクトリと同様に独立した構成にすること。

## よく使うコマンド

### vite-react-app/（Vite + React）

```bash
cd vite-react-app
npm install       # 依存関係のインストール
npm run dev       # 開発サーバーの起動
npm run build     # 本番用ビルド（vite build）
npm run preview   # ビルド後のプレビュー
npm run lint      # oxlint による lint
```

### test-tdd/（Jest）

`package.json` の `test` スクリプトはプレースホルダー（`exit 1`）のままなので、Jest を直接実行する。

```bash
cd test-tdd
npm install
npx jest                        # 全テスト実行
npx jest isValidEmail.test.js   # 単一ファイルのテスト実行
npx jest -t "有効なメールアドレス"  # テスト名で絞り込んで実行
```

### todo/ , weather/（Vanilla JS）

ビルドプロセスは無し。`index.html` をブラウザで直接開く（または任意の静的サーバーで配信する）だけで動作する。

## 注意点

- ルートの `.gitignore` は `*/node_modules/` のみを除外している。各サブディレクトリで `npm install` した場合も、`node_modules/` はコミット対象外になる。
- `vite-react-app/` 以外のディレクトリには `package.json` によるビルドチェーンが無いため、コード変更後はブラウザで直接開いて目視確認する。
