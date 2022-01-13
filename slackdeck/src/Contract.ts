export type ColumnConfig = {
  width: string,
  url: string,
  name: string,
}

export type SlackUrlConverter = {
  workspaceUrl: string,
  clientUrl: string,
}

export type GeneralConfig = {
  useDarkTheme: boolean,
  defaultColumnWidth: string,
  slackUrlTable: SlackUrlConverter[],
}

export type ValidationResult = {
  isValid: boolean,
  message: string,
}

export type SlackUrlValidateResult = {
  workspaceUrl: ValidationResult,
  clientUrl: ValidationResult,
}

export const VALIDATION_FAILED: ValidationResult = {
  isValid: false,
  message: "Does not match format.",
}

export const VALIDATION_SUCCESS: ValidationResult = {
  isValid: true,
  message: "",
}

export const WIDTH_OPTION_LIST = [
  { text: "Narrow", value: "300px" },
  { text: "Medium", value: "500px" },
  { text: "Wide", value: "700px" },
  { text: "Main", value: "1000px" },
];
const DEFAULT_WIDTH_OPTION_INDEX = 1;
const DEFAULT_WIDTH_OPTION = WIDTH_OPTION_LIST[DEFAULT_WIDTH_OPTION_INDEX];

export const DEFAULT_COLUMN_CONFIG: ColumnConfig = {
  width: DEFAULT_WIDTH_OPTION.value,
  url: "",
  name: ""
};

export const DEFAULT_GENERAL_CONFIG: GeneralConfig = {
  useDarkTheme: false,
  defaultColumnWidth: DEFAULT_WIDTH_OPTION.value,
  slackUrlTable: [],
};

export const CHANNEL_ID_PATTERN = "[A-Z0-9]+";
export const channelIdRegex = new RegExp(CHANNEL_ID_PATTERN);
export const WORKSPACE_MESSAGE_ID_PATTERN = "p[0-9]{16}";
export const CLIENT_MESSAGE_ID_PATTERN = "[0-9]{10}.[0-9]{6}";
export const clientMessageIdRegex = new RegExp(CLIENT_MESSAGE_ID_PATTERN);
export const WORKSPACE_URL_PATTERN = "^https://[a-z0-9]+[a-z0-9\-]+.slack.com/";
export const CLIENT_URL_PATTERN = `^https://app.slack.com/client/${CHANNEL_ID_PATTERN}/`

export const extractClientIdFromClientUrl = (clientUrl: string): string => clientUrl.split("/").slice(-2, -1)[0];
