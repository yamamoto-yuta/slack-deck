import { DEFAULT_COLUMN_WIDTH_OPTION_VALUE } from "./column";
import { SlackUrlConverter } from "./slackUrlConverter";

export type GeneralConfig = {
    useDarkTheme: boolean,
    defaultColumnWidth: string,
    slackUrlTable: SlackUrlConverter[],
    enableAutoSave: boolean,
};

export const DEFAULT_GENERAL_CONFIG: GeneralConfig = {
    useDarkTheme: false,
    defaultColumnWidth: DEFAULT_COLUMN_WIDTH_OPTION_VALUE,
    slackUrlTable: [],
    enableAutoSave: true,
};