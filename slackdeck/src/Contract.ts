export type ColumnConfig = {
  width: string,
  url: string,
  name: string,
}

export type GeneralConfig = {
  useDarkTheme: boolean,
  workspaceUrl: string,
  clientUrl: string,
}

export const WIDTH_OPTION_LIST = [
  { text: "Narrow", value: "300px" },
  { text: "Medium", value: "500px" },
  { text: "Wide", value: "700px" },
  { text: "Main", value: "1000px" },
];
export const DEFAULT_WIDTH_OPTION_INDEX = 1;
export const DEFAULT_WIDTH_OPTION = WIDTH_OPTION_LIST[DEFAULT_WIDTH_OPTION_INDEX];

export const CHANNEL_ID_PATTERN = "[A-Z0-9]+";
export const WORKSPACE_MESSAGE_ID_PATTERN = "p[0-9]{16}";
export const CLIENT_MESSAGE_ID_PATTERN = "[0-9]{10}.[0-9]{6}";
export const WORKSPACE_URL_PATTERN = "^https://[a-z0-9]+[a-z0-9\-]+.slack.com/";
export const CLIENT_URL_PATTERN = `^https://app.slack.com/client/${CHANNEL_ID_PATTERN}/`

export const extractClientIdFromClientUrl = (clientUrl: string): string => clientUrl.split("/").slice(-2, -1)[0];