import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ColumnConfig } from './Contract';

import './contents.scss';

const columnIframeId = (_: TemplateStringsArray, columnIndex: number) => `col-iframe-${columnIndex}`;
const columnElementId = (_: TemplateStringsArray, columnIndex: number) => `col-el-${columnIndex}`;

const Deck = () => {
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
    let iframe = document.createElement('iframe');
    iframe.id = columnIframeId`${columnIndex}`;
    iframe.src = newColDefaultConfig.url;

    let column = document.createElement('div');
    column.className = "column";
    column.id = columnElementId`${columnIndex}`;
    column.style.minWidth = newColDefaultConfig.width;
    column.style.width = newColDefaultConfig.width;
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

const wrapper = document.createElement('div');
wrapper.id = 'wrapper';

const newBody = document.createElement('body');
newBody.id = 'newBody';
newBody.appendChild(deck);
newBody.appendChild(body);
newBody.appendChild(wrapper);
document.documentElement.appendChild(newBody);

ReactDOM.render(<Deck />, deck);