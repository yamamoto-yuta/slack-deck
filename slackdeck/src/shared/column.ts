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

export const DEFAULT_COLUMN_WIDTH_OPTION_INDEX = 1;
export const DEFAULT_COLUMN_WIDTH_OPTION_VALUE = COLUMN_WIDTH_OPTIONS_VALUE[DEFAULT_COLUMN_WIDTH_OPTION_INDEX];
export const DEFAULT_COLUMN_CONFIG: ColumnConfig = {
  width: DEFAULT_COLUMN_WIDTH_OPTION_VALUE,
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

export const chooseColumnColor = (columnIndex: number) => (columnIndex % 2 == 0) ? '#1565c0' : '#7b1fa2';

export const saveColumns = (
  columnList: ColumnConfig[]
) => {
  for (var i = 0; i < columnList.length; i++) {
    columnList[i].name = document.getElementsByClassName('column')[i].getElementsByClassName('column-header')[0].getElementsByTagName('input')[0].value;
    var _iframe = document.getElementsByClassName('col-iframe')[i] as HTMLIFrameElement;
    if (_iframe.contentWindow.location.href !== "about:blank") {
      columnList[i].url = _iframe.contentWindow.location.href;
    }
  }
  chrome.storage.sync.set({ 'columnList': columnList });
  updateSavedTime();
}

export const updateSavedTime = () => {
  const pad0 = (num: number) => ('00' + num).slice(-2);
  const savedTimeTemplate = (_: TemplateStringsArray, currentDate: Date) => `${pad0(currentDate.getHours())}:${pad0(currentDate.getMinutes())}:${pad0(currentDate.getSeconds())}`;
  document.getElementById('saved-time').innerText = savedTimeTemplate`${new Date()}`;
}