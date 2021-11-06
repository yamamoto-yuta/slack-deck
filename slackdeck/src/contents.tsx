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
  const columnList: ColumnConfig[] = [];


  useEffect(() => {
    chrome.storage.sync.get(
      ['newColDefaultConfig'],
      function (value) {
        if (value.newColDefaultConfig) {
          setNewColDefaultConfig(value.newColDefaultConfig);
        }
      }
    );
  }, []);

  const fixSlackDom = () => {
    let pClient = document.getElementsByClassName('p-client')[0] as HTMLElement;
    pClient.style.width = '100%';
  }

  const addNewColumn = (columnIndex: number) => {
    // Column Header
    // -- Column Name
    let colName = document.createElement('input');
    colName.type = 'text';
    colName.value = columnNameDefaultValue`${columnIndex}`;
    colName.className = 'form-control';

    // -- Column Delete Button
    let colDelBtn = document.createElement('button');
    colDelBtn.id = columnDeleteButtonId`${columnIndex}`;
    colDelBtn.className = 'btn btn-danger';
    colDelBtn.innerText = 'X';

    // -- Column Header
    let colHeader = document.createElement('div');
    colHeader.className = 'col-header';
    colHeader.appendChild(colName);
    colHeader.appendChild(colDelBtn);

    // Slack
    let iframe = document.createElement('iframe');
    iframe.id = columnIframeId`${columnIndex}`;
    iframe.src = newColDefaultConfig.url;

    // Column
    let column = document.createElement('div');
    column.className = "column bg-dark";
    column.id = columnElementId`${columnIndex}`;
    column.style.minWidth = newColDefaultConfig.width;
    column.style.width = newColDefaultConfig.width;
    column.appendChild(colHeader);
    column.appendChild(iframe);

    wrapper.appendChild(column);

    columnList.push(newColDefaultConfig);

    fixSlackDom();
  }

  return (
    <div className="mx-2 my-3 text-center text-white">
      <button
        className="btn btn-primary rounded-circle"
        onClick={() => addNewColumn(columnList.length)}
      ><FontAwesomeIcon icon={faPlus} className="deck-icon-large" /></button>
    </div>
  )
}

const deck = document.createElement('div');
deck.id = 'deck';
deck.classList.add('bg-dark');

const body = document.body;
body.id = 'mainBody';
body.classList.add('text-light');

const wrapper = document.createElement('div');
wrapper.id = 'wrapper';

const newBody = document.createElement('body');
newBody.id = 'newBody';
newBody.appendChild(deck);
newBody.appendChild(body);
newBody.appendChild(wrapper);
document.documentElement.appendChild(newBody);

ReactDOM.render(<Main />, deck);