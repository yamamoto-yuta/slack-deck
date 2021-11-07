# SlackDeck

## What is "SlackDeck" ?

A Chrome extension to use Slack like TweetDeck.

## Screenshot

![image](https://user-images.githubusercontent.com/55144709/140643323-02d2b5d7-a239-4e8a-951f-71470e4a88d3.png)

## Install

![image](https://user-images.githubusercontent.com/55144709/140644330-9f3016cc-170f-4cff-ba34-89e667fdffc6.png)

1. Download `chrome-extention.zip` from [Release](https://github.com/yamamoto-yuta/slack-deck/releases) and unzip it.
1. Visit `chrome://extensions` .
1. Enable Developer mode.
1. Click on the "Load unpacked" button.
1. Select the directory you have previously unzipped.

## Usage

### Initialization

1. After installation, first set the column width and URL for adding a new column.

![image](https://user-images.githubusercontent.com/55144709/140643820-38528002-5bf7-4e28-8bed-084f0c94ceda.png)

2. Reload to reflect the settings.

### Add column

1. Click on the "+" button to add a column.

![image](https://user-images.githubusercontent.com/55144709/140644259-6aef004d-484f-4a61-9876-00a55d94bfb0.png)

2. To delete a column, click the "x" button at the top of the column you want to delete.

![image](https://user-images.githubusercontent.com/55144709/140644270-fa5a3fa1-025f-4671-9e9c-71428afdb6e0.png)

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
