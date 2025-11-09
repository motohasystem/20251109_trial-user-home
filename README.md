# ここパカ診断 - ユーザーホーム画面

防災診断アプリ「ここパカ診断」のユーザーホーム画面アプリケーションです。

## 機能

### ユーザーホーム画面
ユーザーのプロフィール情報を一覧表示します:

- **ニックネーム**: 同じ画面上で編集可能
- **最寄りの避難所**: クリックして入力ページへ遷移
- **性格診断結果**: クリックして診断ページへ遷移
- **パッカーン結果**: クリックして診断ページへ遷移

### 各入力・診断ページ
- **避難所入力**: 最寄りの避難所を入力・更新
- **性格診断**: 5つの質問に答えて性格タイプを診断
- **パッカーン診断**: 5つの質問に答えて防災意識レベルを測定

### データ管理
- JWT認証によるユーザー識別
- ユーザーIDをキーとしたデータの永続化
- RESTful APIによるバックエンド連携（モックデータ対応）

## 技術スタック

- React 18
- TypeScript
- React Router 6
- Vite
- JWT認証
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
│   ├── UserProfileScreen.tsx    # ホーム画面コンポーネント
│   └── UserProfileScreen.css
├── pages/              # ページコンポーネント
│   ├── ShelterInput.tsx         # 避難所入力ページ
│   ├── PersonalityTest.tsx      # 性格診断ページ
│   ├── PakkaanTest.tsx          # パッカーン診断ページ
│   └── InputPage.css
├── utils/              # ユーティリティ
│   ├── auth.ts                  # JWT認証関連
│   └── api.ts                   # API通信関連
├── data/               # サンプルデータ
│   └── sampleData.ts
├── types.ts            # TypeScript型定義
├── App.tsx             # メインアプリケーション（ルーティング）
├── App.css
├── main.tsx            # エントリーポイント
└── index.css           # グローバルスタイル
```

## API連携

### 環境変数
`.env`ファイルにAPIのベースURLを設定できます:

```
VITE_API_BASE_URL=http://localhost:3000/api
```

### APIエンドポイント

- `GET /api/users/:userId/profile` - ユーザープロフィール取得
- `PUT /api/users/:userId/nickname` - ニックネーム更新
- `PUT /api/users/:userId/shelter` - 避難所情報更新
- `POST /api/users/:userId/personality` - 性格診断結果保存
- `POST /api/users/:userId/pakkaan` - パッカーン診断結果保存

## デモモード

APIが利用できない場合、自動的にデモモードで動作します。デモ用のJWTトークンが生成され、ローカルストレージに保存されます。

## ライセンス

MIT
