# hotChicken_sp

自己紹介用の個人サイト（TOP / 自己紹介 / イラスト集 / リンク）。素のHTML/CSS/JSのみで作られており、ビルド不要でそのままGitHub Pagesに公開できます。

## ファイル構成

```
hotChicken_sp/
├── index.html          # TOP
├── about.html          # 自己紹介
├── gallery.html         # イラスト集
├── links.html            # リンク
├── css/style.css
├── js/main.js
└── assets/illustrations/ # イラスト画像を置く場所
```

## 編集ポイント

- **自己紹介 (about.html)**: 名前・自己紹介文・趣味・スキルの各プレースホルダーを書き換えてください。
- **イラスト集 (gallery.html / js/main.js)**: `assets/illustrations/` に画像を置き、`js/main.js` 冒頭の `illustrations` 配列の `src` にファイルパス（例: `assets/illustrations/work1.png`）を指定すると画像が表示されます。未設定の間はナンバー入りのプレースホルダーが表示されます。
- **リンク (links.html)**: 各カードの `href="#"` を実際のSNSのURLに書き換えてください。不要なカードは削除して構いません。
- **配色**: `css/style.css` 冒頭の `:root` 内の変数（`--c-red` / `--c-yellow` / `--c-black` / `--c-orange` など）で調整できます。

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
