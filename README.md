# ここパカ診断 - ユーザープロフィール画面

防災診断アプリ「ここパカ診断」のユーザープロフィール画面です。

## 機能

このアプリケーションは以下の情報を表示します:

- **ニックネーム**: ユーザーの表示名
- **最寄りの避難所**: 登録された最寄りの避難所
- **性格診断結果**: 防災に関する性格診断の結果
- **パッカーン結果**: 防災意識レベルの診断結果

## 技術スタック

- React 18
- TypeScript
- Vite
- CSS3

## セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview
```

## プロジェクト構成

```
src/
├── components/          # Reactコンポーネント
│   ├── UserProfileScreen.tsx
│   └── UserProfileScreen.css
├── data/               # サンプルデータ
│   └── sampleData.ts
├── types.ts            # TypeScript型定義
├── App.tsx             # メインアプリケーション
├── App.css
├── main.tsx            # エントリーポイント
└── index.css           # グローバルスタイル
```

## カスタマイズ

`src/data/sampleData.ts` を編集することで、表示されるユーザー情報をカスタマイズできます。

## ライセンス

MIT
