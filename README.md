# hotChicken_sp

自己紹介用の個人サイト（TOP / 自己紹介 / リンク）。素のHTML/CSS/JSのみで作られており、ビルド不要でそのままGitHub Pagesに公開できます。

> イラスト集ページ（gallery.html）は一旦削除しています。過去のコミット（`git log -- gallery.html`）から復元可能です。

## ファイル構成

```
hotChicken_sp/
├── index.html          # TOP
├── about.html          # 自己紹介
├── links.html            # リンク
├── css/style.css
├── css/fonts/             # 東雲ゴシック（JF-Dot-Shinonome16）のWOFF2ファイル
├── js/main.js
├── assets/icon.png        # TOP・自己紹介ページ共通のアイコン（任意）
├── assets/favicon.svg     # ファビコン・ロゴの炎アイコン
├── assets/illustrations/ # イラスト画像を置く場所
└── tools/icon-cropper.html # アイコン画像の切り抜きツール（開発用、非公開リンク）
```

## 編集ポイント

- **アイコン (index.html / about.html)**: `assets/icon.png` に自分のアイコン画像を置くと、TOPページ上部と自己紹介ページのアバターの両方に丸くトリミングされて表示されます（同じ1ファイルを共有）。ファイルを置き換えるだけでよく、HTML/CSSの編集は不要です。未設置の間はニワトリのSVGアイコンがプレースホルダーとして表示されます。
  - `tools/icon-cropper.html` をブラウザで直接開くと、画像のアップロード→ドラッグで位置調整→ズーム→PNG書き出しまでを1ページで行えます（サーバー不要）。Chrome/Edgeでは保存先を直接 `assets/icon.png` に指定でき、それ以外のブラウザではダウンロードした画像を `assets/icon.png` に移動してください。このツールは公開サイトのナビゲーションからはリンクされていない開発用ページです。
- **自己紹介 (about.html)**: 名前・自己紹介文・趣味・スキルの各プレースホルダーを書き換えてください。
- **リンク (links.html)**: 各カードの `href="#"` を実際のSNSのURLに書き換えてください。不要なカードは削除して構いません。アイコンは [Simple Icons](https://simpleicons.org/)（CC0）のSVGをインラインで埋め込んでおり、`.link-badge`の`color`でテーマ色に統一しています。別サービスを追加する場合も同サイトからSVGを探して同様に埋め込めます。
- **配色**: `css/style.css` 冒頭の `:root` 内の変数（`--c-red` / `--c-yellow` / `--c-black` / `--c-orange` など）で調整できます。
- **フォント**: 日本語は東雲ゴシック（[JF-Dot-Shinonome16](http://jikasei.me/font/jf-dotfont/) / 自家製フォント工房が配布するTTF変換版をWOFF2化して同梱、著作権放棄されたパブリックドメインフォント）を使用しています。`css/style.css` 冒頭の `@font-face` とその下の `--font-body` / `--font-display` を書き換えれば別のフォントに戻せます。ドット絵フォントのため大きい見出しではブロック状のエッジがそのまま拡大表示されます（意図した見た目です）。
- **サイトアイコン類（ロゴの炎・favicon・アバターのプレースホルダー・ナビカードのアイコン）**: 絵文字ではなく [game-icons.net](https://game-icons.net/)（CC BY 3.0、要クレジット表記）のSVGをインラインまたは`assets/favicon.svg`として埋め込んでいます。使用アイコンは炎（sbed作 "Fire"）、ニワトリ（Delapouite作 "Rooster"）、コック帽（Delapouite作 "Chef Toque"）、鎖の輪（Lorc作 "Linked Rings"）です。差し替える場合も同サイトで似た雰囲気のSVGを探し、`fill="currentColor"`にして色をCSS側で統一してください。

## ローカルで確認する

`index.html` をブラウザで直接開くか、フォルダ内で以下を実行してください。

```bash
python -m http.server 8000
```

`http://localhost:8000` にアクセスして確認できます。

## GitHub Pagesへの公開手順

1. GitHubで新規リポジトリ「hotChicken_sp」を作成する（Public）。
2. このフォルダをそのリポジトリにpushする。

   ```bash
   git remote add origin https://github.com/<ユーザー名>/hotChicken_sp.git
   git branch -M main
   git push -u origin main
   ```

3. GitHubのリポジトリページで **Settings → Pages** を開く。
4. **Source** を「Deploy from a branch」、**Branch** を `main` / `/(root)` に設定して **Save**。
5. 数分後、`https://<ユーザー名>.github.io/hotChicken_sp/` で公開される。

## セキュリティに関する注意

このサイトはビルド不要の静的HTML/CSS/JSのみで構成されており、サーバーサイド処理・フォーム送信・npm依存関係を持たないためサプライチェーン攻撃などの一般的な攻撃面は元々小さめです。ただし公開リポジトリ・公開サイトである点を踏まえ、以下に注意してください。

- **公開リポジトリ = 内容は全世界に公開される**: pushした内容はコミット履歴も含めて誰でも閲覧できます。氏名・住所・電話番号・在籍先など、公開したくない個人情報は記載しない、または一度公開したらgit historyからも消えない前提で扱ってください。
- **画像のメタデータに注意**: `assets/illustrations/` に置く画像にスマホ撮影時のGPS位置情報などのExif情報が残っていると、意図せず自宅や行動範囲が特定される可能性があります。アップロード前にExifを削除してください。
- **APIキーやトークンをコミットしない**: 現状は不要ですが、将来アクセス解析やお問い合わせフォームなどを追加する場合、APIキー・トークン等の秘密情報は絶対にリポジトリに含めないでください（`.gitignore` で除外し、必要であれば環境変数や外部サービスの管理画面側で設定する）。
- **外部リンクは `rel="noopener noreferrer"` を維持**: [links.html](links.html) の `target="_blank"` なリンクには、リンク先ページが `window.opener` 経由で元ページを操作する「タブナビング」を防ぐため `rel="noopener"` を付与済みです。リンクを追加・編集する際もこの属性を外さないでください。
- **外部スクリプト・埋め込みを追加する際は信頼できるものだけを使う**: 現状読み込んでいる外部リソースはGoogle Fonts（`fonts.googleapis.com` / `fonts.gstatic.com`）のみで、いずれもHTTPSで取得しています。今後アクセス解析タグや埋め込みウィジェットなどを追加する場合も、信頼できる提供元かつHTTPS配信のものに限定してください。
- **`innerHTML` に外部由来の値を渡さない**: [js/main.js](js/main.js) の `initGallery` はタイトル文字列を `innerHTML` に差し込んでいます。現状は自分で書いたローカル配列（`illustrations`）のみが対象なので問題ありませんが、将来ユーザー入力やAPI経由の値を表示する場合はXSS対策として `textContent` を使うか、値をエスケープしてください。
- **GitHub PagesのHTTPS配信を維持する**: GitHub Pagesはデフォルトで独自ドメイン以外HTTPS配信されます。カスタムドメインを設定する場合も **Settings → Pages** の「Enforce HTTPS」を有効なままにしてください。
