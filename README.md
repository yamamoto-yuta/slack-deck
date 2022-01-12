# SlackDeck

## What is "SlackDeck" ?

Display your Slack channels in column format.

## Screenshot

![Videotogif](https://user-images.githubusercontent.com/55144709/143466276-caa9270d-a036-417f-9b9b-245d98928791.gif)

## Install

### General Install (Recommended)

- Chrome Web Store: [SlackDeck - Chrome Web Store](https://chrome.google.com/webstore/detail/slackdeck/cocnkjpcbmoopfpmogblnjpjdfcaohod?hl=ja&authuser=0)

### Manual Install

1. Download `chrome-extention.zip` from [Release](https://github.com/yamamoto-yuta/slack-deck/releases) and unzip it.
1. Visit `chrome://extensions` .
1. Enable Developer mode.
1. Click on the "Load unpacked" button.
1. Select the directory you have previously unzipped.

## Initial Settings

- Set the Workspace URL (`https://[workspace_url].slack.com/`) and Client URL (`https://app.slack.com/client/*/`) from the Config Modal.

![image](https://user-images.githubusercontent.com/55144709/144297361-1372247e-3e0c-484c-b5f5-5100f9c410a4.png)

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

By using the `make` command, you can make sure that the container is started only when necessary.

Support command:

- `npm i` -> `make i`
- `npm run dev` -> `make dev`
- `npm run build` -> `make build`

\*This project uses this boilerplate project: [Chrome Extension (built with TypeScript + React)](https://github.com/martellaj/chrome-extension-react-typescript-boilerplate)

## Reference

- [k8shiro/chrome_extension_slack_columns](https://github.com/k8shiro/chrome_extension_slack_columns)
