export type ColumnConfig = {
  width: string,
  url: string,
  name: string,
}

export type GeneralConfig = {
  useDarkTheme: boolean
}

export const WIDTH_OPTION_LIST = [
  { text: "Narrow", value: "300px" },
  { text: "Medium", value: "500px" },
  { text: "Wide", value: "700px" },
];
export const DEFAULT_WIDTH_OPTION_INDEX = 1;
export const DEFAULT_WIDTH_OPTION = WIDTH_OPTION_LIST[DEFAULT_WIDTH_OPTION_INDEX];