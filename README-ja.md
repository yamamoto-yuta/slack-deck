![image](https://user-images.githubusercontent.com/55144709/164277089-eb499d5d-0559-4fa7-9bcd-69d76200daa9.png)

<p align="center">
    <a href="README.md">English</a>｜
    <a href="README-ja.md">日本語</a>
</p>

<p align="center">
    "SlackDeck" は Slack チャンネルを横に並べられる Chrome 拡張機能です。
</p>

<div align="center">
<img src="https://user-images.githubusercontent.com/55144709/164062115-9ebbd36c-befe-44c1-8545-a69d5f131334.gif" />
</div>

## インストール

- Chrome: [SlackDeck - Chrome Web Store](https://chrome.google.com/webstore/detail/slackdeck/cocnkjpcbmoopfpmogblnjpjdfcaohod)

## 使い方

1. ウィンドウの左上にある ➕ ボタンを押して、カラム追加モーダルを開く
1. 開いたモーダルに Slack の URL（ 例： `https://app.slack.com/` ）を貼り付けて「Apply」ボタンを押す
1. カラムが追加される
1. ウィンドウの左端にある 💾 ボタンを押すと追加したカラムを保存できる。これにより、次回読み込み時に追加済みのカラムを復元できる。

## 機能

### ➕ カラムを追加する

![image](https://user-images.githubusercontent.com/55144709/164177668-96e11467-654e-48d6-9d6a-2ded6874cc86.png)

| ボタン                                                                                                          | 役割                                                |
| --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| ![image](https://user-images.githubusercontent.com/55144709/164177789-bc46948e-53a3-4e8e-af7a-00132d4116ef.png) | カラム追加モーダルからカラムを追加する              |
| ![image](https://user-images.githubusercontent.com/55144709/164177914-1194ebd7-7a76-48be-88f7-07a5d0dcdef4.png) | 今開いている Slack チャンネルをカラムとして追加する |
| ![image](https://user-images.githubusercontent.com/55144709/164178115-9f732390-6840-45eb-a354-01ff1fa0afed.png) | クリップボードの URL をカラムとして追加する         |

### ✏️ カラムを操作する

![image](https://user-images.githubusercontent.com/55144709/164176304-1f12926e-d966-4b86-aad4-9d832b36713b.png)

| ボタン                                                                                                          | 役割                                    |
| --------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| ![image](https://user-images.githubusercontent.com/55144709/164176634-27035b1e-1e24-4719-8f9f-2fea5f0ae8ef.png) | カラムを左へ移動する                    |
| ![image](https://user-images.githubusercontent.com/55144709/164176767-3767a60d-a4d4-4560-b9e0-d4c8b7caf40c.png) | カラムを右へ移動する                    |
| ![image](https://user-images.githubusercontent.com/55144709/164176924-c3c41b72-86c2-479b-b10a-823dca78385d.png) | カラムを複製する                        |
| ![image](https://user-images.githubusercontent.com/55144709/164177025-bf7df7c0-4ae1-41be-aa9b-89fa89de987b.png) | クリップボードの URL をこのカラムで開く |
| ![image](https://user-images.githubusercontent.com/55144709/164177248-6ce0399c-76b6-4512-a139-ec0d57e6c799.png) | カラムに名前を付ける                    |
| ![image](https://user-images.githubusercontent.com/55144709/164177401-c2767e87-efaa-474c-9da5-c62d3ef83342.png) | カラムの幅を変更する                    |
| ![image](https://user-images.githubusercontent.com/55144709/164177498-b135f78e-76b7-4c33-bce0-41877ea195bc.png) | カラムを削除する                        |

### ⛓️ カラムへ移動する

<table>
    <tr>
        <td rowspan="9">
            <img src="https://user-images.githubusercontent.com/55144709/170535040-552edb37-9df0-42b6-adc1-461d59015459.png">
        </td>
        <th>ボタン</th>
        <th>役割</th>
    </tr>
    <tr>
        <td>
            <img src="https://user-images.githubusercontent.com/55144709/170535250-8cdd6556-a518-495c-ac97-902349b7f5f7.png">
        </td>
        <td>
            現在追加されているカラムを保存し、次回読み込み時に復元されるようにする
        </td>
    </tr>
    <tr>
        <td>
            <img src="https://user-images.githubusercontent.com/55144709/170535467-f4c39082-c807-4ad7-95ab-b1f046947ada.png">
        </td>
        <td>
            最後に保存した時刻
        </td>
    </tr>
    <tr>
        <td>
            <img src="https://user-images.githubusercontent.com/55144709/170535694-69ee16bc-8209-4193-adec-c6d3eeaf89e4.png">
        </td>
        <td>
            メインの Slack カラムをウィンドウ幅に合わせる
        </td>
    </tr>
    <tr>
        <td>
            <img src="https://user-images.githubusercontent.com/55144709/170536412-a9e23148-b443-46eb-aace-00084cd7036e.png">
        </td>
        <td>
            Deck（この部分）の幅を広げる
        </td>
    </tr>
    <tr>
        <td>
            <img src="https://user-images.githubusercontent.com/55144709/170536692-f8ff7de3-abd1-4150-8b53-e040d2e50a24.png">
        </td>
        <td>
            クリックしたカラムへスクロールする
        </td>
    </tr>
    <tr>
        <td>
            <img src="https://user-images.githubusercontent.com/55144709/170538299-04873abb-9a50-44ee-aa9e-132f99b4a22b.png">
        </td>
        <td>
            新しいタブでREADMEを開く
        </td>
    </tr>
    <tr>
        <td>
            <img src="https://user-images.githubusercontent.com/55144709/170538608-38e3c3b6-9073-4931-a54c-d5e0dbae82fa.png">
        </td>
        <td>
            設定モーダルを開く
        </td>
    </tr>
    <tr>
        <td>
            <img src="https://user-images.githubusercontent.com/55144709/170538790-6006220c-62bf-4677-9550-4b4232db1815.png">
        </td>
        <td>
            現在インストールされているSlackDeckのバージョン
        </td>
    </tr>
</table>

### ⚙️ 設定

![image](https://user-images.githubusercontent.com/55144709/170539246-e646620a-1660-465a-adc6-d5e6760ae2df.png)

#### ✔️ Default column width

カラム追加時に設定するカラム幅の初期値を変更します。

#### ✔️ Map workspace name to workspace ID

ワークスペース URL（ `https://[WORLSPACE_NAME].slack.com/` ）とクライアント URL（ `https://app.slack.com/[WORKSPACE_ID]/` ）をマッピングします。

これにより、ワークスペース URL を用いてカラムを追加できるようになります。

#### ✔️ Enable auto column save

カラムの自動保存を有効にするかどうかを変更します。

有効にすると 1 分おきにカラムが自動保存されます。

## 開発

### 要件

- Docker
- Docker Compose

### 環境構築

```
$ git clone git@github.com:yamamoto-yuta/slack-deck.git
$ docker-compose up -d
$ docker exec -it <CONTAINER_ID> bash
[In container]$ cd /usr/src/app/slackdeck/
```

### ビルド

1. `npm i`
1. `npm run dev` or `npm run watch`
1. `npm run build`

いくつかのコマンドは make コマンドを用意しています。これにより、手軽にコマンドを実行できます。

| make コマンド | 実行コマンド                                                                                 |
| ------------- | -------------------------------------------------------------------------------------------- |
| `make i`      | `docker-compose run --rm app sh -c "cd slackdeck/ && npm i"`                                 |
| `make dev`    | `docker-compose run --rm app sh -c "cd slackdeck/ && npm run dev"`                           |
| `make build`  | `docker-compose run --rm app sh -c "cd slackdeck/ && npm run build"`                         |
| `make all`    | `docker-compose run --rm app sh -c "cd slackdeck/ && npm i && npm run dev && npm run build"` |

## 参照

- [Chrome Extension (built with TypeScript + React)](https://github.com/martellaj/chrome-extension-react-typescript-boilerplate)
- [k8shiro/chrome_extension_slack_columns](https://github.com/k8shiro/chrome_extension_slack_columns)
