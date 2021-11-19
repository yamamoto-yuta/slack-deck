import { ColumnConfig, WIDTH_OPTION_LIST } from "../Contract";

const columnMoveLeftButtonId = (_: TemplateStringsArray, columnIndex: number) => `col-move-left-btn-${columnIndex}`;
const columnMoveRightButtonId = (_: TemplateStringsArray, columnIndex: number) => `col-move-right-btn-${columnIndex}`;
const columnDeleteButtonId = (_: TemplateStringsArray, columnIndex: number) => `col-del-btn-${columnIndex}`;
const columnIframeId = (_: TemplateStringsArray, columnIndex: number) => `col-iframe-${columnIndex}`;
const columnElementId = (_: TemplateStringsArray, columnIndex: number) => `col-el-${columnIndex}`;
const extractColumnElementIdx = (colElId: string) => parseInt(colElId.split('-').slice(-1)[0]);

export const addColumn = (
  columnList: Array<ColumnConfig>,
  setSavedTime: React.Dispatch<React.SetStateAction<Date>>,
  columnIndex: number,
  columnCofig: ColumnConfig
) => {
  const updateElementID = () => {
    // Update other elements
    for (var i = 0; i < columnList.length; i++) {
      document.getElementsByClassName('column')[i].id = columnElementId`${i}`;
      document.getElementsByClassName('col-iframe')[i].id = columnIframeId`${i}`;
      document.getElementsByClassName('col-del-btn')[i].id = columnDeleteButtonId`${i}`;
    }
  };

  // Column
  let column = document.createElement('div');
  column.id = columnElementId`${columnIndex}`;
  column.className = "column bg-dark";
  const setColumnWidth = () => {
    column.style.minWidth = columnCofig.width;
    column.style.width = columnCofig.width;
  }
  setColumnWidth();

  // Slack
  let iframe = document.createElement('iframe');
  iframe.id = columnIframeId`${columnIndex}`;
  iframe.className = "col-iframe";
  iframe.src = columnCofig.url;

  // Column Header
  let colHeader = document.createElement('div');
  colHeader.className = 'col-header';

  // -- Move column to left buttion
  let colMoveLeftBtn = document.createElement('button');
  colMoveLeftBtn.id = columnMoveLeftButtonId`${columnIndex}`;
  colMoveLeftBtn.className = 'btn btn-primary col-del-btn';
  colMoveLeftBtn.innerText = '<';
  colMoveLeftBtn.onclick = () => {
    // Calculate new column index
    let colElIdx = extractColumnElementIdx(column.id);
    let newColElIdx = colElIdx - 1;

    // Switch column
    if (newColElIdx >= 0) {
      document.getElementById('wrapper').insertBefore(document.getElementById(columnElementId`${colElIdx}`), document.getElementById(columnElementId`${newColElIdx}`));
    } else {
      document.getElementById('wrapper').appendChild(document.getElementById(columnElementId`${colElIdx}`));
      newColElIdx += columnList.length;
    }

    // Update column list
    let tmp = columnList[colElIdx];
    columnList[colElIdx] = columnList[newColElIdx];
    columnList[newColElIdx] = tmp;

    // Update element id
    updateElementID();
    // Save column
    saveColumns(columnList, setSavedTime);
  };

  // -- Move column to right buttion
  let colMoveRightBtn = document.createElement('button');
  colMoveRightBtn.id = columnMoveRightButtonId`${columnIndex}`;
  colMoveRightBtn.className = 'btn btn-primary col-del-btn';
  colMoveRightBtn.innerText = '>';
  colMoveRightBtn.onclick = () => {
    // Calculate new column index
    let colElIdx = extractColumnElementIdx(column.id);
    let newColElIdx = colElIdx + 1;

    // Switch column
    if (newColElIdx < columnList.length) {
      document.getElementById('wrapper').insertBefore(document.getElementById(columnElementId`${newColElIdx}`), document.getElementById(columnElementId`${colElIdx}`));
    } else {
      document.getElementById('wrapper').insertBefore(document.getElementById(columnElementId`${colElIdx}`), document.getElementById(columnElementId`${0}`));
      newColElIdx -= columnList.length;
    }

    // Update column list
    let tmp = columnList[colElIdx];
    columnList[colElIdx] = columnList[newColElIdx];
    columnList[newColElIdx] = tmp;

    // Update element id
    updateElementID();

    // Save column
    saveColumns(columnList, setSavedTime);
  };

  // -- Column Name
  let colName = document.createElement('input');
  colName.type = 'text';
  colName.value = columnCofig.name;
  colName.className = 'form-control';

  // -- Column Width Select
  let colWidthSelect = document.createElement('select');
  colWidthSelect.className = 'form-select w-auto';
  for (var widthOption of WIDTH_OPTION_LIST) {
    let option = document.createElement('option');
    option.value = widthOption.value;
    option.text = widthOption.text;
    colWidthSelect.appendChild(option);
  }
  colWidthSelect.selectedIndex = WIDTH_OPTION_LIST.findIndex(option => option.value === columnCofig.width);
  colWidthSelect.onchange = () => {
    columnCofig.width = colWidthSelect.value;
    setColumnWidth();
  }

  // -- Column Delete Button
  let colDelBtn = document.createElement('button');
  colDelBtn.id = columnDeleteButtonId`${columnIndex}`;
  colDelBtn.className = 'btn btn-danger col-del-btn';
  colDelBtn.innerText = 'X';
  colDelBtn.onclick = () => {
    // Remove
    var delcolIdx = parseInt(column.id.split('-').slice(-1)[0]);
    columnList.splice(delcolIdx, 1);;
    saveColumns(columnList, setSavedTime);
    column.remove();

    // Update other elements
    updateElementID();
  };

  // Append elements
  colHeader.appendChild(colMoveLeftBtn);
  colHeader.appendChild(colMoveRightBtn);
  colHeader.appendChild(colName);
  colHeader.appendChild(colWidthSelect);
  colHeader.appendChild(colDelBtn);
  column.appendChild(colHeader);
  column.appendChild(iframe);

  return column;
}

export const saveColumns = (
  columnList: Array<ColumnConfig>,
  setSavedTime: React.Dispatch<React.SetStateAction<Date>>
) => {
  for (var i = 0; i < columnList.length; i++) {
    columnList[i].name = document.getElementsByClassName('column')[i].getElementsByClassName('col-header')[0].getElementsByTagName('input')[0].value;
    var _iframe = document.getElementsByClassName('col-iframe')[i] as HTMLIFrameElement;
    if (_iframe.contentWindow.location.href !== "about:blank") {
      columnList[i].url = _iframe.contentWindow.location.href;
    }
  }
  chrome.storage.sync.set({ 'columnList': columnList });
  setSavedTime(new Date());
}