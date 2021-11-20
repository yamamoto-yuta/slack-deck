import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faPlus, faSave } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import ReactDOM from 'react-dom';
import { ColumnConfig, GeneralConfig } from './Contract';

import './contents.scss';
import { ConfigModal } from './components/ConfigModal';
import { AddColumnModal } from './components/AddColumnModal';
import { saveColumns, updateSavedTime } from './functions/column';
import { Column } from './components/Column';

let columnList: Array<ColumnConfig> = [];

const Main: React.FC = () => {
  const [generalConfig, setGeneralConfig] = React.useState<GeneralConfig>({
    useDarkTheme: false,
    workspaceUrl: '',
    clientUrl: '',
  });

  const [showAddColumnModal, setShowAddColumnModal] = React.useState<boolean>(false);
  const handleAddColumnModalClose = () => setShowAddColumnModal(false);
  const handleAddColumnModalOpen = () => setShowAddColumnModal(true);
  const [showConfigModal, setShowConfigModal] = React.useState<boolean>(false);
  const handleConfigModalClose = () => setShowConfigModal(false);
  const handleConfigModalOpen = () => setShowConfigModal(true);

  React.useEffect(() => {
    // Load
    chrome.storage.sync.get(
      ['columnList', 'generalConfig'],
      function (value) {
        if (value.columnList) {
          columnList = value.columnList;
          for (var i = 0; i < columnList.length; i++) {
            let col = document.createElement('div');
            ReactDOM.render(<Column
              columnList={columnList}
              columnIndex={i}
              columnCofig={columnList[i]}
              columnElement={col}
            />, col);
            wrapper.appendChild(col);
          }
        }
        if (value.generalConfig) {
          setGeneralConfig(value.generalConfig);
          if (value.generalConfig.useDarkTheme) {
            body.classList.add('text-light');
            newBody.classList.add('text-light');
          }
        }
      }
    );
    // Update saved time
    updateSavedTime();
  }, []);

  const onClickSaveButton = () => {
    saveColumns(columnList);
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
        <div id="savedAtTime"></div>
      </div>

      <button
        className="mt-auto btn my-1 p-0"
        onClick={handleConfigModalOpen}
      ><FontAwesomeIcon icon={faCog} className="deck-btn-icon-natural" /></button>

      <AddColumnModal
        show={showAddColumnModal}
        onHide={handleAddColumnModalClose}
        columnList={columnList}
        generalConfig={generalConfig}
      />

      <ConfigModal
        show={showConfigModal}
        onHide={handleConfigModalClose}
        currentGeneralConfig={generalConfig}
        setGeneralConfig={setGeneralConfig}
      />
      {console.log(generalConfig)}
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