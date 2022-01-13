import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBullhorn, faCog, faHistory, faPlus, faSave } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import ReactDOM from 'react-dom';
import { ColumnConfig, DEFAULT_GENERAL_CONFIG, GeneralConfig } from './Contract';
import './contents.scss';
import { ConfigModal } from './components/ConfigModal';
import { AddColumnModal } from './components/AddColumnModal';
import { saveColumns, updateSavedTime } from './functions/column';
import { Column } from './components/Column';
import { AnnounceModal } from './components/AnnounceModal';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';


let columnList: Array<ColumnConfig> = [];

const Main: React.FC = () => {
  const [, rerender] = React.useState<number>(Math.random());
  const [generalConfig, setGeneralConfig] = React.useState<GeneralConfig>(DEFAULT_GENERAL_CONFIG);

  const [showAnnounceModal, setShowAnnounceModal] = React.useState<boolean>(false);
  const handleAnnounceModalClose = () => setShowAnnounceModal(false);
  const handleAnnounceModalOpen = () => setShowAnnounceModal(true);
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
              rerender={rerender}
              columnList={columnList}
              columnIndex={i}
              columnCofig={columnList[i]}
              columnElement={col}
            />, col);
            wrapper.appendChild(col);
          }
        }
        if (value.generalConfig) {
          if (value.generalConfig.useDarkTheme) {
            body.classList.add('text-light');
            newBody.classList.add('text-light');
          }
          setGeneralConfig(value.generalConfig);

          // Update legacy generalConfig (v0.5.3<)
          if ("workspaceUrl" in value.generalConfig || "clientUrl" in value.generalConfig) {
            let newGeneralConfig: GeneralConfig = {
              useDarkTheme: value.generalConfig.useDarkTheme,
              defaultColumnWidth: value.generalConfig.defaultColumnWidth,
              slackUrlTable: [{ workspaceUrl: value.generalConfig.workspaceUrl, clientUrl: value.generalConfig.clientUrl }],
            };
            setGeneralConfig(newGeneralConfig);
          }
        }
      }
    );
    // Update saved time
    updateSavedTime();
  }, []);

  const onClickSaveButton = () => {
    saveColumns(columnList);
    rerender(Math.random());
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
      <div>
        <div id="savedAtText">Saved at</div>
        <div id="savedAtTime"></div>
      </div>



      <div className="my-3 deck-scrollbar">
        <OverlayTrigger
          placement="right"
          overlay={
            <Tooltip>main</Tooltip>
          }
        >
          <a
            className="btn btn-outline-light my-1"
            href="#mainBody"
          >#</a>
        </OverlayTrigger>
        {columnList.map((_, index) => {
          return (
            <OverlayTrigger
              placement="right"
              overlay={
                <Tooltip>{(document.getElementsByClassName("col-name-input")[index] as HTMLInputElement).value}</Tooltip>
              }
            >
              <a
                className="btn btn-outline-light my-1"
                href={"#col-el-" + index}
              >{index}</a>
            </OverlayTrigger>
          )
        })}
      </div>

      <button
        className="mt-auto btn my-2 p-0"
        onClick={handleAnnounceModalOpen}
      ><FontAwesomeIcon icon={faBullhorn} className="deck-btn-icon-natural" /></button>

      <a
        className="btn my-2 p-0"
        href='https://github.com/yamamoto-yuta/slack-deck/releases'
        target='_blank'
      ><FontAwesomeIcon icon={faHistory} className="deck-btn-icon-natural" /></a>

      <button
        className="btn my-2 p-0 text-primary"
        onClick={handleConfigModalOpen}
      ><FontAwesomeIcon icon={faCog} className="deck-btn-icon-natural" /></button>

      <AnnounceModal
        show={showAnnounceModal}
        onHide={handleAnnounceModalClose}
      />

      <AddColumnModal
        show={showAddColumnModal}
        onHide={handleAddColumnModalClose}
        columnList={columnList}
        generalConfig={generalConfig}
        rerender={rerender}
      />

      <ConfigModal
        show={showConfigModal}
        onHide={handleConfigModalClose}
        currentGeneralConfig={generalConfig}
        setGeneralConfig={setGeneralConfig}
      />
      {console.log(columnList)}
    </div>
  )
}

const deck = document.createElement('div');
deck.id = 'deck';
deck.className = 'bg-dark px-2 py-2 text-center text-light';

const body = document.body;
body.id = 'mainBody';

const wrapper = document.createElement('div');
wrapper.id = 'wrapper';

const mainElement = document.createElement('div');
mainElement.id = 'main-element';
mainElement.appendChild(body);
mainElement.appendChild(wrapper);

const newBody = document.createElement('body');
newBody.id = 'newBody';
newBody.appendChild(deck);
newBody.appendChild(mainElement);
document.documentElement.appendChild(newBody);

ReactDOM.render(<Main />, deck);