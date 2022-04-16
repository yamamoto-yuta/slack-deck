export type ColumnConfig = {
  width: string,
  url: string,
  name: string,
}

export const COLUMN_WIDTH_OPTIONS_TEXT: string[] = [
  "S",
  "M",
  "L",
  "X",
];

export const COLUMN_WIDTH_OPTIONS_VALUE: string[] = [
  "350px",
  "500px",
  "700px",
  "1000px",
];

export const MAIN_COLUMN_WIDTH_OPTIONS_TEXT: string[] = [
  "F",
  "S",
  "M",
  "L",
  "X",
];

export const MAIN_COLUMN_WIDTH_OPTIONS_VALUE: string[] = [
  "100%",
  "350px",
  "500px",
  "700px",
  "1000px",
];

export const DEFAULT_COLUMN_WIDTH_OPTION_INDEX = 1;
export const DEFAULT_COLUMN_CONFIG: ColumnConfig = {
  width: COLUMN_WIDTH_OPTIONS_VALUE[DEFAULT_COLUMN_WIDTH_OPTION_INDEX],
  url: "",
  name: ""
};