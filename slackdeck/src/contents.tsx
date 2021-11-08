import { Button, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import ReactDOM from 'react-dom';
import { ColumnConfig } from './Contract';

import './contents.scss';

const columnNameDefaultValue = (_: TemplateStringsArray, columnIndex: number) => `Column ${columnIndex}`;
const columnDeleteButtonId = (_: TemplateStringsArray, columnIndex: number) => `col-del-btn-${columnIndex}`;
const columnIframeId = (_: TemplateStringsArray, columnIndex: number) => `col-iframe-${columnIndex}`;
const columnElementId = (_: TemplateStringsArray, columnIndex: number) => `col-el-${columnIndex}`;


const Main = () => {
  const WIDTH_OPTION_LIST = [
    { text: "Narrow", value: "300px" },
    { text: "Medium", value: "500px" },
    { text: "Wide", value: "700px" },
  ];
  const DEFAULT_WIDTH_OPTION_INDEX = 1;

  const [newColWidth, setNewColWidth] = React.useState<string>(WIDTH_OPTION_LIST[DEFAULT_WIDTH_OPTION_INDEX].value);
  const [newColUrl, setNewColUrl] = React.useState<string>();
  let columnList: ColumnConfig[] = [];

  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  React.useEffect(() => {
    chrome.storage.sync.get(
      ['columnList'],
      function (value) {
        if (value.columnList) {
          columnList = value.columnList;
          for (var i = 0; i < columnList.length; i++) {
            wrapper.appendChild(addColumn(i, columnList[i]));
          }
        }
      }
    );
  }, []);

  const addColumn = (columnIndex: number, columnCofig: ColumnConfig) => {
    // Column
    let column = document.createElement('div');
    column.id = columnElementId`${columnIndex}`;
    column.className = "column bg-dark";
    column.style.minWidth = columnCofig.width;
    column.style.width = columnCofig.width;

    // Slack
    let iframe = document.createElement('iframe');
    iframe.id = columnIframeId`${columnIndex}`;
    iframe.className = "col-iframe";
    iframe.src = columnCofig.url;

    // Column Header
    let colHeader = document.createElement('div');
    colHeader.className = 'col-header';

    // -- Column Name
    let colName = document.createElement('input');
    colName.type = 'text';
    colName.value = columnNameDefaultValue`${columnIndex}`;
    colName.className = 'form-control';

    // -- Column Delete Button
    let colDelBtn = document.createElement('button');
    colDelBtn.id = columnDeleteButtonId`${columnIndex}`;
    colDelBtn.className = 'btn btn-danger col-del-btn';
    colDelBtn.innerText = 'X';
    colDelBtn.onclick = () => {
      // Remove
      var delcolIdx = parseInt(column.id.split('-').slice(-1)[0]);
      columnList.splice(delcolIdx, 1);
      column.remove();

      // Update other elements
      for (var i = 0; i < columnList.length; i++) {
        document.getElementsByClassName('column')[i].id = columnElementId`${i}`;
        document.getElementsByClassName('col-iframe')[i].id = columnIframeId`${i}`;
        document.getElementsByClassName('col-del-btn')[i].id = columnDeleteButtonId`${i}`;
      }
    };

    // Append elements
    colHeader.appendChild(colName);
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
    console.log(columnCofig);
    wrapper.appendChild(addColumn(columnIndex, columnCofig));
    fixSlackDom();
    // Push to columnList
    columnList.push(columnCofig);
    // Save current column state
    chrome.storage.sync.set({ 'columnList': columnList });
    // Close Mordal
    handleClose();
  }

  return (
    <div className="mx-2 my-3 text-center text-white">
      <button
        className="btn btn-primary rounded-circle"
        onClick={handleShow}
      ><FontAwesomeIcon icon={faPlus} className="deck-icon-large" /></button>

      <Modal show={show} onHide={handleClose} centered>
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
                  selected={newColWidth === option.value}
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
            };
            onClickAddNewColumnButton(columnList.length, newColConfig);
          }}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

const deck = document.createElement('div');
deck.id = 'deck';
deck.classList.add('bg-dark');

const deckSpacer = document.createElement('div');
deckSpacer.id = 'deckSpacer';

const body = document.body;
body.id = 'mainBody';
body.classList.add('text-light');

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