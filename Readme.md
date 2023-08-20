# Meamaid の図を表示させる

## 使用技術

- typescript
- webpack
- sass
- react

## シーケンス図

- content_script
- sidepanel

```mermaid
sequenceDiagram
    participant ユーザー
    participant content_script
    participant sidepanel
    ユーザー->>content_script: mermaid記法の文字列を選択
    content_script->>ユーザー: ボタン表示
    ユーザー->>content_script: ボタン押下
    content_script->>sidepanel: 選択文字列を送信
    sidepanel->>sidepanel: mermaid apiでsvgタグ作成
    sidepanel->>sidepanel: 図を表示
```

## 環境構築

1. git clone

```
https://github.com/shokiogawa/mermaid-chrome-extension-react.git
```

2. yarn
3. yarn build
4. dist フォルダに成果物が作成される。
5. chrome 拡張機能管理画面を開き、dist 配下のデータを登録

## 参考

https://mermaid.js.org/config/usage.html
