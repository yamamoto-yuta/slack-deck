![image](https://user-images.githubusercontent.com/55144709/164277089-eb499d5d-0559-4fa7-9bcd-69d76200daa9.png)

<p align="center">
    <a href="README.md">English</a>｜
    <a href="README-ja.md">日本語</a>
</p>

<p align="center">
    "SlackDeck" is a Chrome extension that allows you to arrange your Slack channels side by side.
</p>

<div align="center">
<img src="https://user-images.githubusercontent.com/55144709/164062115-9ebbd36c-befe-44c1-8545-a69d5f131334.gif" />
</div>

## Install

- Chrome: [SlackDeck - Chrome Web Store](https://chrome.google.com/webstore/detail/slackdeck/cocnkjpcbmoopfpmogblnjpjdfcaohod)

## Usage

1. Click the ➕ button in the upper left corner of the window to open the Add Columns modal
1. Paste the Slack URL (e.g. `https://app.slack.com/`) into the opened modal and press the "Apply" button.
1. Columns are added
1. The 💾 button on the left edge of the window allows you to save the columns you have added. This allows you to restore the added columns on the next load.

## Features

### ➕ Add column

![image](https://user-images.githubusercontent.com/55144709/164177668-96e11467-654e-48d6-9d6a-2ded6874cc86.png)

| Button                                                                                                          | Action                                           |
| --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| ![image](https://user-images.githubusercontent.com/55144709/164177789-bc46948e-53a3-4e8e-af7a-00132d4116ef.png) | Add a column from the Add Column modal           |
| ![image](https://user-images.githubusercontent.com/55144709/164177914-1194ebd7-7a76-48be-88f7-07a5d0dcdef4.png) | Add the currently open Slack channel as a column |
| ![image](https://user-images.githubusercontent.com/55144709/164178115-9f732390-6840-45eb-a354-01ff1fa0afed.png) | Add a clipboard URL as a column                  |

### ✏️ Operate column

![image](https://user-images.githubusercontent.com/55144709/164176304-1f12926e-d966-4b86-aad4-9d832b36713b.png)

| Button                                                                                                          | Action                               |
| --------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| ![image](https://user-images.githubusercontent.com/55144709/164176634-27035b1e-1e24-4719-8f9f-2fea5f0ae8ef.png) | Move column to the left              |
| ![image](https://user-images.githubusercontent.com/55144709/164176767-3767a60d-a4d4-4560-b9e0-d4c8b7caf40c.png) | Move column to the right             |
| ![image](https://user-images.githubusercontent.com/55144709/164176924-c3c41b72-86c2-479b-b10a-823dca78385d.png) | Duplicate columns                    |
| ![image](https://user-images.githubusercontent.com/55144709/164177025-bf7df7c0-4ae1-41be-aa9b-89fa89de987b.png) | Open URL in clipboard in this column |
| ![image](https://user-images.githubusercontent.com/55144709/164177248-6ce0399c-76b6-4512-a139-ec0d57e6c799.png) | Name the column                      |
| ![image](https://user-images.githubusercontent.com/55144709/164177401-c2767e87-efaa-474c-9da5-c62d3ef83342.png) | Change column width                  |
| ![image](https://user-images.githubusercontent.com/55144709/164177498-b135f78e-76b7-4c33-bce0-41877ea195bc.png) | Delete columns                       |

### ⛓️ Move to column

<table>
    <tr>
        <td rowspan="9">
            <img src="https://user-images.githubusercontent.com/55144709/170535040-552edb37-9df0-42b6-adc1-461d59015459.png">
        </td>
        <th>Button</th>
        <th>Action</th>
    </tr>
    <tr>
        <td>
            <img src="https://user-images.githubusercontent.com/55144709/170535250-8cdd6556-a518-495c-ac97-902349b7f5f7.png">
        </td>
        <td>
            Save the currently added columns so that they will be restored the next time they are loaded
        </td>
    </tr>
    <tr>
        <td>
            <img src="https://user-images.githubusercontent.com/55144709/170535467-f4c39082-c807-4ad7-95ab-b1f046947ada.png">
        </td>
        <td>
            Last saved time
        </td>
    </tr>
    <tr>
        <td>
            <img src="https://user-images.githubusercontent.com/55144709/170535694-69ee16bc-8209-4193-adec-c6d3eeaf89e4.png">
        </td>
        <td>
            Fit main Slack column to window width
        </td>
    </tr>
    <tr>
        <td>
            <img src="https://user-images.githubusercontent.com/55144709/170536412-a9e23148-b443-46eb-aace-00084cd7036e.png">
        </td>
        <td>
            Increase the width of the Deck (this parts)
        </td>
    </tr>
    <tr>
        <td>
            <img src="https://user-images.githubusercontent.com/55144709/170536692-f8ff7de3-abd1-4150-8b53-e040d2e50a24.png">
        </td>
        <td>
            Scroll to the column you clicked on
        </td>
    </tr>
    <tr>
        <td>
            <img src="https://user-images.githubusercontent.com/55144709/170538299-04873abb-9a50-44ee-aa9e-132f99b4a22b.png">
        </td>
        <td>
            Open README in a new tab
        </td>
    </tr>
    <tr>
        <td>
            <img src="https://user-images.githubusercontent.com/55144709/170538608-38e3c3b6-9073-4931-a54c-d5e0dbae82fa.png">
        </td>
        <td>
            Open the config modal
        </td>
    </tr>
    <tr>
        <td>
            <img src="https://user-images.githubusercontent.com/55144709/170538790-6006220c-62bf-4677-9550-4b4232db1815.png">
        </td>
        <td>
            Currently installed version of SlackDeck
        </td>
    </tr>
</table>

### ⚙️ Config

![image](https://user-images.githubusercontent.com/55144709/170539246-e646620a-1660-465a-adc6-d5e6760ae2df.png)

#### ✔️ Default column width

Change the initial value of the column width to be set when adding columns.

#### ✔️ Map workspace name to workspace ID

Map the workspace URL (`https://[WORLSPACE_NAME].slack.com/`) to the client URL (`https://app.slack.com/[WORKSPACE_ID]/`).

This allows columns to be added using the workspace URL.

#### ✔️ Enable auto column save

Change whether or not automatic column saving is enabled.

When enabled, columns are automatically saved every minute.

## Develop

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

### Build

1. `npm i`
1. `npm run dev` or `npm run watch`
1. `npm run build`

Some commands are provided with make commands. This allows you to execute commands easily.

| make command | Execution command                                                                            |
| ------------ | -------------------------------------------------------------------------------------------- |
| `make i`     | `docker-compose run --rm app sh -c "cd slackdeck/ && npm i"`                                 |
| `make dev`   | `docker-compose run --rm app sh -c "cd slackdeck/ && npm run dev"`                           |
| `make build` | `docker-compose run --rm app sh -c "cd slackdeck/ && npm run build"`                         |
| `make all`   | `docker-compose run --rm app sh -c "cd slackdeck/ && npm i && npm run dev && npm run build"` |

## References

- [Chrome Extension (built with TypeScript + React)](https://github.com/martellaj/chrome-extension-react-typescript-boilerplate)
- [k8shiro/chrome_extension_slack_columns](https://github.com/k8shiro/chrome_extension_slack_columns)
