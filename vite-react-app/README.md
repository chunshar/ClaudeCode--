# React + Vite

このテンプレートは、HMR といくつかの Oxlint ルールを備えた、Vite 上で React を動かすための最小限のセットアップを提供します。

現在、以下の2つの公式プラグインが利用可能です。

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) は [Oxc](https://oxc.rs) を使用します
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) は [SWC](https://swc.rs/) を使用します

## React Compiler

このテンプレートでは、開発・ビルドのパフォーマンスへの影響を考慮し、React Compiler は有効化されていません。導入する場合は[こちらのドキュメント](https://react.dev/learn/react-compiler/installation)を参照してください。

## Oxlint 設定の拡張

本番アプリケーションを開発する場合は、型情報を利用した lint ルールを有効にした TypeScript の使用を推奨します。TypeScript および TypeScript 関連の Oxlint ルールをプロジェクトに統合する方法については、[TS テンプレート](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts)を確認してください。
