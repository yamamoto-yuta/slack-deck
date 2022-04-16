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

export const columnMoveLeftButtonClassName = "col-mv-l-btn";
export const columnMoveLeftButtonId = (_: TemplateStringsArray, columnIndex: number) => `${columnMoveLeftButtonClassName}-${columnIndex}`;
export const columnMoveRightButtonClassName = "col-mv-r-btn";
export const columnMoveRightButtonId = (_: TemplateStringsArray, columnIndex: number) => `${columnMoveRightButtonClassName}-${columnIndex}`;
export const columnDuplicateButtonClassName = "col-dup-btn";
export const columnDuplicateButtonId = (_: TemplateStringsArray, columnIndex: number) => `${columnDuplicateButtonClassName}-${columnIndex}`;
export const columnOpenFromClipboardButtonClassName = "col-clp-btn";
export const columnOpenFromClipboardButtonId = (_: TemplateStringsArray, columnIndex: number) => `${columnOpenFromClipboardButtonClassName}-${columnIndex}`;
export const columnNameInputClassName = "col-name-input";
export const columnNameInputId = (_: TemplateStringsArray, columnIndex: number) => `${columnNameInputClassName}-${columnIndex}`;
export const columnWidthSelectClassName = "col-select";
export const columnWidthSelectId = (_: TemplateStringsArray, columnIndex: number) => `${columnWidthSelectClassName}-${columnIndex}`;
export const columnDeleteButtonClassName = "col-del-btn";
export const columnDeleteButtonId = (_: TemplateStringsArray, columnIndex: number) => `${columnDeleteButtonClassName}-${columnIndex}`;
export const columnIframeClassName = "col-iframe";
export const columnIframeId = (_: TemplateStringsArray, columnIndex: number) => `${columnIframeClassName}-${columnIndex}`;
export const columnElementClassName = "col-el";
export const columnElementId = (_: TemplateStringsArray, columnIndex: number) => `${columnElementClassName}-${columnIndex}`;
export const extractColumnIdxFromId = (colElId: string) => parseInt(colElId.split('-').slice(-1)[0]);