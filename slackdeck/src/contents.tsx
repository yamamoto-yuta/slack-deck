import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ColumnConfig } from './Contract';

import './contents.scss';

const columnNameDefaultValue = (_: TemplateStringsArray, columnIndex: number) => `Column ${columnIndex}`;
const columnDeleteButtonId = (_: TemplateStringsArray, columnIndex: number) => `col-del-btn-${columnIndex}`;
const columnIframeId = (_: TemplateStringsArray, columnIndex: number) => `col-iframe-${columnIndex}`;
const columnElementId = (_: TemplateStringsArray, columnIndex: number) => `col-el-${columnIndex}`;


const Main = () => {
  const [newColDefaultConfig, setNewColDefaultConfig] = React.useState<ColumnConfig>();
  let columnList: ColumnConfig[] = [];


  useEffect(() => {
    chrome.storage.sync.get(
      ['newColDefaultConfig', 'columnList'],
      function (value) {
        if (value.newColDefaultConfig) {
          setNewColDefaultConfig(value.newColDefaultConfig);
        }
        if (value.columnList) {
          columnList = value.columnList;
          console.log(columnList);
          for (var i = 0; i < columnList.length; i++) {
            wrapper.appendChild(addColumn(i, columnList[i]));
          }
        }
      }
    );
  }, []);

  const addColumn = (columnIndex: number, columnCofig: ColumnConfig = newColDefaultConfig) => {
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

  const onClickAddNewColumnButton = (columnIndex: number) => {
    if (newColDefaultConfig !== undefined) {
      // Add column
      wrapper.appendChild(addColumn(columnIndex));
      fixSlackDom();

      // Push to columnList
      columnList.push(newColDefaultConfig);

      // Save current column state
      chrome.storage.sync.set({ 'columnList': columnList });

    } else {
      alert('Please set default column config first.\nYou will need to reload to reflect the settings.');
    }
  }

  return (
    <div className="mx-2 my-3 text-center text-white">
      <button
        className="btn btn-primary rounded-circle"
        onClick={() => onClickAddNewColumnButton(columnList.length)}
      ><FontAwesomeIcon icon={faPlus} className="deck-icon-large" /></button>
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