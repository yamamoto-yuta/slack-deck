import { ColumnConfig } from "../Contract";

export const saveColumns = (
  columnList: Array<ColumnConfig>
) => {
  for (var i = 0; i < columnList.length; i++) {
    columnList[i].name = document.getElementsByClassName('column')[i].getElementsByClassName('col-header')[0].getElementsByTagName('input')[0].value;
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
  document.getElementById('savedAtTime').innerText = savedTimeTemplate`${new Date()}`;
}