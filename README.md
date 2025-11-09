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

このアプリケーションは**プレーンなJavaScript**で実装されています:

- **バニラJavaScript (ES6 Modules)**
- **HTML5/CSS3**
- **ハッシュベースルーティング**
- **JWT認証**
- **ビルドツール不要**

## セットアップ

### プレーンJSバージョン（推奨）

ビルドツール不要で、そのまま動作します:

```bash
# ローカルサーバーで起動（Python 3の場合）
cd public
python3 -m http.server 8000

# または Node.jsのhttp-serverを使用
npx http-server public -p 8000
```

ブラウザで `http://localhost:8000` を開いてください。

### Reactバージョン（レガシー）

React版も `src/` ディレクトリに残っています:

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build
```

## プロジェクト構成

### プレーンJSバージョン（public/）

```
public/
├── index.html          # メインHTMLファイル
├── css/
│   └── styles.css      # 全スタイル
└── js/
    ├── main.js         # エントリーポイント
    ├── router.js       # ハッシュルーティング
    ├── pages/          # ページコンポーネント
    │   ├── home.js     # ホーム画面
    │   ├── shelter.js  # 避難所入力
    │   ├── personality.js  # 性格診断
    │   └── pakkaan.js  # パッカーン診断
    └── utils/          # ユーティリティ
        ├── auth.js     # JWT認証
        └── api.js      # API通信
```

### Reactバージョン（src/）

```
src/
├── components/          # Reactコンポーネント
│   ├── UserProfileScreen.tsx
│   └── UserProfileScreen.css
├── pages/              # ページコンポーネント
│   ├── ShelterInput.tsx
│   ├── PersonalityTest.tsx
│   ├── PakkaanTest.tsx
│   └── InputPage.css
├── utils/              # ユーティリティ
│   ├── auth.ts
│   └── api.ts
├── types.ts
├── App.tsx
└── main.tsx
```

## ルーティング

プレーンJS版はハッシュベースのルーティングを使用しています:

- `#/` - ホーム画面
- `#/shelter` - 避難所入力
- `#/personality` - 性格診断
- `#/pakkaan` - パッカーン診断

相対パスで動作するため、任意のディレクトリに配置可能です。

## API連携

### APIベースURL
`public/js/utils/api.js` の `API_BASE_URL` を編集してください:

```javascript
const API_BASE_URL = 'http://localhost:3000/api';
```

### APIエンドポイント

- `GET /api/users/:userId/profile` - ユーザープロフィール取得
- `PUT /api/users/:userId/nickname` - ニックネーム更新
- `PUT /api/users/:userId/shelter` - 避難所情報更新
- `POST /api/users/:userId/personality` - 性格診断結果保存
- `POST /api/users/:userId/pakkaan` - パッカーン診断結果保存

## デモモード

APIが利用できない場合、自動的にデモモードで動作します。デモ用のJWTトークンが生成され、ローカルストレージに保存されます。

## 特徴

- **ビルド不要**: HTML/CSS/JavaScriptだけで動作
- **相対パス対応**: どのディレクトリに配置しても動作
- **モダンブラウザ対応**: ES6 Modulesを使用
- **軽量**: 外部ライブラリ不要
- **レスポンシブデザイン**: モバイル対応

## ブラウザ対応

- Chrome（最新版）
- Firefox（最新版）
- Safari（最新版）
- Edge（最新版）

注: ES6 Modules対応が必要です。

## ライセンス

MIT
