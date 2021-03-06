import React from 'react';
import ReactDOM from 'react-dom';
import { Fab, IconButton, SpeedDial, SpeedDialIcon, SpeedDialAction, Typography, Box, Button, Switch, FormControlLabel, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import SaveIcon from '@mui/icons-material/Save';
import HelpIcon from '@mui/icons-material/Help';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import FitScreenIcon from '@mui/icons-material/FitScreen';
import HomeIcon from '@mui/icons-material/Home';
import { ConfigModal } from './ConfigModal';
import { VERSION } from '../shared/general';
import { AddColumnModal } from './AddColumnModal';
import { ColumnConfig, columnElementId, DEFAULT_COLUMN_CONFIG, saveColumns, updateSavedTime } from '../shared/column';
import { Column } from './Column';
import { DEFAULT_GENERAL_CONFIG, GeneralConfig } from '../shared/config';
import { CLIENT_URL_PATTERN, convertWorkspaceUrlToClientUrl, slackUrlRegex } from '../shared/slackUrlConverter';
import { InvalidUrlSnackbar } from './InvalidUrlSnackbar';

const AddSpeedDial: React.FC<{
  columnList: ColumnConfig[],
  generalConfig: GeneralConfig,
  rerender: React.Dispatch<React.SetStateAction<number>>
}> = (props) => {
  const [modalOpen, setSpeedDialOpen] = React.useState<boolean>(false);
  const handleModalOpen = () => setSpeedDialOpen(true);
  const handleModalClose = () => setSpeedDialOpen(false);

  const [snackbarOpen, setSnackBarOpen] = React.useState<boolean>(false);
  const [clipboardText, setClipboardText] = React.useState<string>("");

  const [newColumnConfigForAddCurrentPage, setNewColumnConfigForAddCurrentPage] = React.useState<ColumnConfig>(DEFAULT_COLUMN_CONFIG);
  const handleAddCurrentPageSpeedDialActionOpen = () => setNewColumnConfigForAddCurrentPage({
    ...newColumnConfigForAddCurrentPage,
    url: location.href,
    width: props.generalConfig.defaultColumnWidth,
  });

  const [newColumnConfigForAddFromClipboard, setNewColumnConfigForAddFromClipboard] = React.useState<ColumnConfig>(DEFAULT_COLUMN_CONFIG);
  const handleAddFromClipboardSpeedDialActionOpen = () => {
    navigator.clipboard.readText().then(
      (clipText) => {
        setClipboardText(clipText);
        if (slackUrlRegex.test(clipText)) {
          let inputUrl = clipText;
          // Convet URL
          for (let converter of props.generalConfig.slackUrlTable) {
            const workspaceUrlPattern = `^${converter.workspaceUrl}archives/`;
            const workspaceUrlRegex = new RegExp(workspaceUrlPattern);
            if (workspaceUrlRegex.test(inputUrl)) {
              inputUrl = convertWorkspaceUrlToClientUrl(converter.workspaceUrl, converter.clientUrl, inputUrl);
              break;
            }
          }

          // Update state
          setNewColumnConfigForAddFromClipboard({
            ...newColumnConfigForAddCurrentPage,
            url: inputUrl,
            width: props.generalConfig.defaultColumnWidth,
          });
        }
      }
    );
  };

  const addColumn = (columnConfig: ColumnConfig) => {
    // Add column
    let col = document.createElement('div');
    ReactDOM.render(<Column
      rerender={props.rerender}
      columnList={props.columnList}
      columnIndex={props.columnList.length}
      columnConfig={columnConfig}
      columnElement={col}
      slackUrlTable={props.generalConfig.slackUrlTable}
    />, col);
    document.getElementById('wrapper').appendChild(col);

    // Fix slack dom
    let pClient = document.getElementsByClassName('p-client')[0] as HTMLElement;
    pClient.style.width = '100%';

    // Push to columnList
    props.columnList.push(columnConfig);

    // Save current column state
    saveColumns(props.columnList);

    // Rerender deck
    props.rerender(Math.random());
  };

  const addColumnFromCurrentPage = () => {
    // Add column
    addColumn(newColumnConfigForAddCurrentPage);
  };


  const openFromClipboard = () => {
    navigator.clipboard.readText().then(
      (clipText) => {
        setClipboardText(clipText);
        if (slackUrlRegex.test(clipText)) {
          let inputUrl = clipText;
          // Judge client URL or workspace URL
          const clientUrlRegex = new RegExp(CLIENT_URL_PATTERN);
          if (clientUrlRegex.test(inputUrl)) {
            addColumn(newColumnConfigForAddFromClipboard);
          } else {
            // Convet URL
            let is_breaked = false;
            for (let converter of props.generalConfig.slackUrlTable) {
              const workspaceUrlPattern = `^${converter.workspaceUrl}archives/`;
              const workspaceUrlRegex = new RegExp(workspaceUrlPattern);
              if (workspaceUrlRegex.test(inputUrl)) {
                inputUrl = convertWorkspaceUrlToClientUrl(converter.workspaceUrl, converter.clientUrl, inputUrl);
                is_breaked = true;
                break;
              }
            }
            if (is_breaked) {
              addColumn(newColumnConfigForAddFromClipboard);
            } else {
              setSnackBarOpen(true);
            }
          }
        } else {
          setSnackBarOpen(true);
        }
      }
    );
  };

  const speedDialActions = [
    {
      icon: <AddIcon />,
      name: "Add from Modal",
      onOpen: null,
      onclick: handleModalOpen
    },
    {
      icon: <ContentCopyIcon />,
      name: "Add Current Page",
      onOpen: handleAddCurrentPageSpeedDialActionOpen,
      onclick: addColumnFromCurrentPage
    },
    {
      icon: <ContentPasteGoIcon />,
      name: "Add from Clipboard",
      onOpen: handleAddFromClipboardSpeedDialActionOpen,
      onclick: openFromClipboard
    },
  ];

  return (
    <div>
      <SpeedDial
        id="add-speed-dial"
        ariaLabel="Add SpeedDial"
        direction="right"
        sx={{ position: "absolute", zIndex: 9999 }}
        icon={<SpeedDialIcon />}
      >
        {speedDialActions.map((action) => (
          <SpeedDialAction
            onOpen={action.onOpen}
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipPlacement="bottom-start"
            sx={{ whiteSpace: "nowrap" }}
            onClick={action.onclick}
          />
        ))}
      </SpeedDial>
      <AddColumnModal
        open={modalOpen}
        onClose={handleModalClose}
        columnList={props.columnList}
        generalConfig={props.generalConfig}
        rerender={props.rerender}
      />
      <InvalidUrlSnackbar open={snackbarOpen} setOpen={setSnackBarOpen} clipboardText={clipboardText} />
      <div id="add-speed-dial-spacer" />
    </div>
  )
};

const CollapseDeckSwitch: React.FC<{
  collapseDeckchecked: boolean,
  setCollapseDeckChecked: React.Dispatch<React.SetStateAction<boolean>>,
}> = (props) => {
  const handleChange = () => {
    props.setCollapseDeckChecked((prev) => !prev);
    if (!props.collapseDeckchecked) {
      document.getElementById("deck-element").style.width = "180px";
      document.getElementById("deck-element").style.minWidth = "180px";
      document.getElementById("add-speed-dial").style.left = "51px";
    } else {
      document.getElementById("deck-element").style.width = "78px";
      document.getElementById("deck-element").style.minWidth = "78px";
      document.getElementById("add-speed-dial").style.left = "0";
    }
  };
  return (
    <Tooltip title="Expand deck" placement="right">
      <FormControlLabel
        value="top"
        control={<Switch color="primary" checked={props.collapseDeckchecked} onChange={handleChange} />}
        label={<KeyboardDoubleArrowRightIcon color="primary" />}
        labelPlacement="top"
        sx={{ mx: 0 }}
      />
    </Tooltip>
  )
};

const MainColumnResponsiveSwitch: React.FC<{
  mainColumnResponsiveChecked: boolean,
  setMainColumnResponsiveChecked: React.Dispatch<React.SetStateAction<boolean>>,
}> = (props) => {
  const handleChange = () => {
    props.setMainColumnResponsiveChecked((prev) => !prev);
    if (!props.mainColumnResponsiveChecked) {
      document.getElementById("main-body").style.minWidth = "100%";
    } else {
      document.getElementById("main-body").style.minWidth = "1000px";
    }
  };
  return (
    <Tooltip title="Fit main column to window" placement="right">
      <FormControlLabel
        value="top"
        control={<Switch color="primary" checked={props.mainColumnResponsiveChecked} onChange={handleChange} />}
        label={<FitScreenIcon color="primary" />}
        labelPlacement="top"
        sx={{ mx: 0 }}
      />
    </Tooltip>
  )
};

export const Deck: React.FC<{
  columnList: ColumnConfig[],
  startAutoSave: () => void,
  stopAutoSave: () => void,
}> = (props) => {
  const [, rerender] = React.useState<number>(Math.random());

  const [generalConfig, setGeneralConfig] = React.useState<GeneralConfig>(DEFAULT_GENERAL_CONFIG);

  const [mainColumnResponsiveChecked, setMainColumnResponsiveChecked] = React.useState<boolean>(false);
  const [collapseDeckchecked, setCollapseDeckChecked] = React.useState<boolean>(false);

  const rerenderDeck = () => {
    rerender(Math.random());
  }

  const onClickSaveButton = () => {
    saveColumns(props.columnList);
    rerender(Math.random());
  }

  React.useEffect(() => {
    // Load
    chrome.storage.sync.get(
      ['columnList', 'generalConfig'], (value) => {
        if (value.columnList && value.generalConfig) {
          for (var i = 0; i < value.columnList.length; i++) {
            props.columnList[i] = value.columnList[i];
          }
          for (var i = 0; i < props.columnList.length; i++) {
            let col = document.createElement('div');
            ReactDOM.render(<Column
              rerender={rerender}
              columnList={props.columnList}
              columnIndex={i}
              columnConfig={props.columnList[i]}
              columnElement={col}
              slackUrlTable={value.generalConfig.slackUrlTable}
            />, col);
            document.getElementById("wrapper").appendChild(col);
          }
          // For v1.0.0 update code
          if (value.generalConfig.enableAutoSave === undefined) {
            value.generalConfig.enableAutoSave = DEFAULT_GENERAL_CONFIG.enableAutoSave;
          }
          setGeneralConfig(value.generalConfig);
          if (value.generalConfig.enableAutoSave) {
            props.startAutoSave();
          }
          window.addEventListener('focus', rerenderDeck, false);
          window.addEventListener('blur', props.stopAutoSave, false);
        }
        updateSavedTime();
        rerender(Math.random());
      }
    );
  }, []);

  return (
    <div id="deck">
      <div className="deck-buttons-element">
        <Box sx={{
          height: 180,
          transform: "translateZ(0px)"
        }}>
          <AddSpeedDial
            columnList={props.columnList}
            generalConfig={generalConfig}
            rerender={rerender}
          />
          <Tooltip title="Save columns" placement="right">
            <Fab size="medium" sx={{ my: 1 }} onClick={onClickSaveButton}>
              <SaveIcon />
            </Fab>
          </Tooltip>
          <Typography variant="caption" component="div" sx={{ color: "white" }}>
            Saved:
          </Typography>
          <Typography id="saved-time" variant="body2" component="div" sx={{ color: "white" }} gutterBottom>
            --:--:--
          </Typography>
        </Box>
        {generalConfig.enableAutoSave ? props.startAutoSave() : props.stopAutoSave()}
      </div>

      <div id="column-jump-button-element" className="deck-buttons-element">
        <MainColumnResponsiveSwitch
          mainColumnResponsiveChecked={mainColumnResponsiveChecked}
          setMainColumnResponsiveChecked={setMainColumnResponsiveChecked}
        />
        <CollapseDeckSwitch
          collapseDeckchecked={collapseDeckchecked}
          setCollapseDeckChecked={setCollapseDeckChecked}
        />
        <Tooltip title="Home" placement="right">
          <Button className="column-jump-button" variant="outlined" onClick={() => {
            document.getElementById("main-body").scrollIntoView({ behavior: "smooth", inline: "start" });
          }}>
            <HomeIcon />
          </Button>
        </Tooltip>
        {props.columnList.map((config, index) => (
          <Tooltip key={index} title={config.name} placement="right">
            <Button className="column-jump-button" variant="outlined" onClick={() => {
              document.getElementById(`${columnElementId`${index}`}`).scrollIntoView({ behavior: "smooth", inline: "center" });
            }}>
              <Typography variant="caption" component="div">
                {index}{!collapseDeckchecked ? "" : `: ${config.name.length < 8 ? config.name : config.name.substring(0, 8) + "..."}`}
              </Typography>
            </Button>
          </Tooltip>
        ))}
      </div>

      <div className="deck-buttons-element">
        <div>
          <Tooltip title="Help" placement="right">
            <IconButton color="primary" size="large" href="https://github.com/yamamoto-yuta/slack-deck/blob/main/README.md" target="_blank" rel="noopener">
              <HelpIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </div>
        <ConfigModal
          currentGeneralConfig={generalConfig}
          setGeneralConfig={setGeneralConfig}
          rerender={rerender}
        />
        <Typography variant="caption" component="div" sx={{ color: "white" }}>
          Version:
        </Typography>
        <Typography variant="body2" component="div" sx={{ color: "white" }} gutterBottom>
          v{VERSION}
        </Typography>
      </div>
      {/* {console.log(props.columnList)} */}
    </div >
  )
};