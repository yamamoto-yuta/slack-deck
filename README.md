# SlackDeck

## What is "SlackDeck" ?

A Chrome extension to use Slack like TweetDeck.

## Screenshot

![Videotogif](https://user-images.githubusercontent.com/55144709/140937464-e62b04d8-607c-462e-bde9-b626fa684547.gif)

## Install

![image](https://user-images.githubusercontent.com/55144709/140644330-9f3016cc-170f-4cff-ba34-89e667fdffc6.png)

1. Download `chrome-extention.zip` from [Release](https://github.com/yamamoto-yuta/slack-deck/releases) and unzip it.
1. Visit `chrome://extensions` .
1. Enable Developer mode.
1. Click on the "Load unpacked" button.
1. Select the directory you have previously unzipped.

## Usage

### ➕ Add column

1. Click on the "➕" button to add a column.
1. Enter the column width and URL of the column you want to add.
1. To delete a column, click the "❌" button at the top of the column you want to delete.

### 💾 Save column

1. Click "💾" button to save the added column.
1. Restore the previously added columns when the page loads.

### ↔️ Move column

1. Click on the "<"/">" button to move the column to the left/right.
1. When the column crosses the end, it loops to the opposite end.

## Development

### Requirements

- Docker
- Docker Compose

### Environment setup

```
$ git clone git@github.com:yamamoto-yuta/slack-deck.git
$ docker-compose up -d
$ docker exec -it <CONTAINER_ID> bash
[In container]$ cd /usr/src/app/slackdeck/
```

### Building

1. `npm i`
1. `npm run dev` or `npm run watch`
1. `npm run build`

This project uses this boilerplate project: [Chrome Extension (built with TypeScript + React)](https://github.com/martellaj/chrome-extension-react-typescript-boilerplate)

## Reference

- [k8shiro/chrome_extension_slack_columns](https://github.com/k8shiro/chrome_extension_slack_columns)
