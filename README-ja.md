# SlackDeck

## "SlackDeck" とは？

![](https://user-images.githubusercontent.com/55144709/164062115-9ebbd36c-befe-44c1-8545-a69d5f131334.gif)

## インストール

- Chrome: [SlackDeck - Chrome Web Store](https://chrome.google.com/webstore/detail/slackdeck/cocnkjpcbmoopfpmogblnjpjdfcaohod)

## 使い方

### カラムを追加する

![image](https://user-images.githubusercontent.com/55144709/164177668-96e11467-654e-48d6-9d6a-2ded6874cc86.png)

| ボタン                                                                                                          | 役割                                                |
| --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| ![image](https://user-images.githubusercontent.com/55144709/164177789-bc46948e-53a3-4e8e-af7a-00132d4116ef.png) | カラム追加モーダルからカラムを追加する              |
| ![image](https://user-images.githubusercontent.com/55144709/164177914-1194ebd7-7a76-48be-88f7-07a5d0dcdef4.png) | 今開いている Slack チャンネルをカラムとして追加する |
| ![image](https://user-images.githubusercontent.com/55144709/164178115-9f732390-6840-45eb-a354-01ff1fa0afed.png) | クリップボードの URL をカラムとして追加する         |

### カラムを操作する

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

### 設定

![image](https://user-images.githubusercontent.com/55144709/164178884-c037a16d-9f2e-44a3-9fff-953c107fd738.png)

#### Default column width

カラム追加時に設定するカラム幅の初期値を変更します。

#### Map workspace name to workspace ID

ワークスペース URL（ `https://[WORLSPACE_NAME].slack.com/` ）とクライアント URL（ `https://app.slack.com/[WORKSPACE_ID]/` ）をマッピングします。

これにより、ワークスペース URL を用いてカラムを追加できるようになります。

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
