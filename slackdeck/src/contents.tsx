import { Button, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faPlus, faSave } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import ReactDOM from 'react-dom';
import { ColumnConfig, GeneralConfig } from './Contract';

import './contents.scss';

const columnNameDefaultValue = (_: TemplateStringsArray, columnIndex: number) => `Column ${columnIndex}`;
const columnMoveLeftButtonId = (_: TemplateStringsArray, columnIndex: number) => `col-move-left-btn-${columnIndex}`;
const columnMoveRightButtonId = (_: TemplateStringsArray, columnIndex: number) => `col-move-right-btn-${columnIndex}`;
const columnDeleteButtonId = (_: TemplateStringsArray, columnIndex: number) => `col-del-btn-${columnIndex}`;
const columnIframeId = (_: TemplateStringsArray, columnIndex: number) => `col-iframe-${columnIndex}`;
const columnElementId = (_: TemplateStringsArray, columnIndex: number) => `col-el-${columnIndex}`;
const extractColumnElementIdx = (colElId: string) => parseInt(colElId.split('-').slice(-1)[0]);

const pad0 = (num: number) => ('00' + num).slice(-2);
const savedTimeTemplate = (_: TemplateStringsArray, currentDate: Date) => `${pad0(currentDate.getHours())}:${pad0(currentDate.getMinutes())}:${pad0(currentDate.getSeconds())}`;

let columnList: Array<ColumnConfig> = [];

const Main = () => {
  const WIDTH_OPTION_LIST = [
    { text: "Narrow", value: "300px" },
    { text: "Medium", value: "500px" },
    { text: "Wide", value: "700px" },
  ];
  const DEFAULT_WIDTH_OPTION_INDEX = 1;
  const DEFAULT_WIDTH_OPTION = WIDTH_OPTION_LIST[DEFAULT_WIDTH_OPTION_INDEX];
  const [newColWidth, setNewColWidth] = React.useState<string>(DEFAULT_WIDTH_OPTION.value);
  const [newColUrl, setNewColUrl] = React.useState<string>();

  const DEFAULT_GENERAL_CONFIG: GeneralConfig = {
    useDarkTheme: false
  };
  const [generalConfigUseDarkTheme, setGeneralConfigUseDarkTheme] = React.useState<boolean>(DEFAULT_GENERAL_CONFIG.useDarkTheme);

  const [savedTime, setSavedTime] = React.useState<Date>(new Date());

  const [showAddColumnModal, setShowAddColumnModal] = React.useState<boolean>(false);
  const handleAddColumnModalClose = () => setShowAddColumnModal(false);
  const handleAddColumnModalOpen = () => setShowAddColumnModal(true);
  const [showConfigModal, setShowConfigModal] = React.useState<boolean>(false);
  const handleConfigModalClose = () => setShowConfigModal(false);
  const handleConfigModalOpen = () => setShowConfigModal(true);

  React.useEffect(() => {
    chrome.storage.sync.get(
      ['columnList', 'generalConfig'],
      function (value) {
        if (value.columnList) {
          columnList = value.columnList;
          for (var i = 0; i < columnList.length; i++) {
            wrapper.appendChild(addColumn(i, columnList[i]));
          }
        }
        if (value.generalConfig) {
          setGeneralConfigUseDarkTheme(value.generalConfig.useDarkTheme);
          if (value.generalConfig.useDarkTheme) {
            body.classList.add('text-light');
            newBody.classList.add('text-light');
          }
        }
      }
    );
    setSavedTime(new Date());
  }, []);

  const saveColumns = () => {
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

  const addColumn = (columnIndex: number, columnCofig: ColumnConfig) => {
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
        wrapper.insertBefore(document.getElementById(columnElementId`${colElIdx}`), document.getElementById(columnElementId`${newColElIdx}`));
      } else {
        wrapper.appendChild(document.getElementById(columnElementId`${colElIdx}`));
        newColElIdx += columnList.length;
      }

      // Update column list
      let tmp = columnList[colElIdx];
      columnList[colElIdx] = columnList[newColElIdx];
      columnList[newColElIdx] = tmp;

      // Update element id
      updateElementID();
      // Save column
      saveColumns();
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
        wrapper.insertBefore(document.getElementById(columnElementId`${newColElIdx}`), document.getElementById(columnElementId`${colElIdx}`));
      } else {
        wrapper.insertBefore(document.getElementById(columnElementId`${colElIdx}`), document.getElementById(columnElementId`${0}`));
        newColElIdx -= columnList.length;
      }

      // Update column list
      let tmp_2 = columnList[colElIdx];
      columnList[colElIdx] = columnList[newColElIdx];
      columnList[newColElIdx] = tmp_2;

      // Update element id
      updateElementID();

      // Save column
      saveColumns();
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
      saveColumns();
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

  const fixSlackDom = () => {
    let pClient = document.getElementsByClassName('p-client')[0] as HTMLElement;
    pClient.style.width = '100%';
  }

  const onClickAddNewColumnButton = (columnIndex: number, columnCofig: ColumnConfig) => {
    // Add column
    wrapper.appendChild(addColumn(columnIndex, columnCofig));
    fixSlackDom();
    // Push to columnList
    columnList.push(columnCofig);
    // Save current column state
    saveColumns();
    // Close Mordal
    handleAddColumnModalClose();
  }

  const onClickSaveButton = () => {
    saveColumns();
  }

  const onClickConfigButton = () => {
    // Save
    let generalConfig: GeneralConfig = {
      useDarkTheme: generalConfigUseDarkTheme
    }
    chrome.storage.sync.set({ 'generalConfig': generalConfig });
    // Close
    handleConfigModalClose();
  }

  return (
    <div className="d-flex flex-column h-100">
      <button
        className="btn btn-primary rounded-circle my-1"
        onClick={handleAddColumnModalOpen}
      ><FontAwesomeIcon icon={faPlus} className="deck-btn-icon-circle" /></button>
      <button
        className="btn btn-outline-primary rounded-circle my-1 btn-outline-primary-icon-color"
        onClick={onClickSaveButton}
      ><FontAwesomeIcon icon={faSave} className="deck-btn-icon-circle" /></button>
      <div className="text-sm">
        <div id="savedAtText">Saved at</div>
        <div id="savedAtTime">{savedTimeTemplate`${savedTime}`}</div>
      </div>

      <button
        className="mt-auto btn my-1 p-0"
        onClick={handleConfigModalOpen}
      ><FontAwesomeIcon icon={faCog} className="deck-btn-icon-natural" /></button>

      <Modal show={showAddColumnModal} onHide={handleAddColumnModalClose} centered className="text-dark">
        <Modal.Header closeButton>
          <Modal.Title>Add new column</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Enter the column width and URL of the column you want to add.</p>
          <Form className="d-flex">
            <Form.Select
              className="w-auto mx-1"
              onChange={(e) => setNewColWidth(e.target.value)}
            >
              {WIDTH_OPTION_LIST.map((option) => (
                <option
                  value={option.value}
                  selected={DEFAULT_WIDTH_OPTION.value === option.value}
                >{option.text}</option>
              ))}
            </Form.Select>
            <Form.Control
              type="text"
              className="mx-1"
              placeholder="https://app.slack.com/client/*"
              onChange={(e) => setNewColUrl(e.target.value)}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => {
            let newColConfig: ColumnConfig = {
              width: newColWidth,
              url: newColUrl,
              name: columnNameDefaultValue`${columnList.length}`,
            };
            onClickAddNewColumnButton(columnList.length, newColConfig);
          }}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showConfigModal} onHide={handleConfigModalClose} centered className="text-dark">
        <Modal.Header closeButton>
          <Modal.Title>Config</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <h5>Dark Theme</h5>
              <div className="mb-3">
                <Form.Check
                  type={"checkbox"}
                  checked={generalConfigUseDarkTheme}
                  label={"Use dark theme"}
                  onChange={(e) => {
                    setGeneralConfigUseDarkTheme(e.target.checked);
                    body.classList.toggle('text-light');
                    newBody.classList.toggle('text-light');
                  }}
                /></div>
              <Form.Text className="text-muted">
                Check this box if you want to use the dark theme in Slack.
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => onClickConfigButton()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

const deck = document.createElement('div');
deck.id = 'deck';
deck.className = 'bg-dark px-2 py-2 text-center text-light';

const deckSpacer = document.createElement('div');
deckSpacer.id = 'deckSpacer';

const body = document.body;
body.id = 'mainBody';

const wrapper = document.createElement('div');
wrapper.id = 'wrapper';

const newBody = document.createElement('body');
newBody.id = 'newBody';
newBody.appendChild(deck);
newBody.appendChild(deckSpacer);
newBody.appendChild(body);
newBody.appendChild(wrapper);
document.documentElement.appendChild(newBody);

ReactDOM.render(<Main />, deck);