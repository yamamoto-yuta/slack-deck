import { ColumnConfig } from "../Contract";

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