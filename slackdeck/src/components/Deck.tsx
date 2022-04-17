import React from 'react';
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
import { ColumnConfig, columnElementId, saveColumns, updateSavedTime } from '../shared/column';
import ReactDOM from 'react-dom';
import { Column } from './Column';
import { DEFAULT_GENERAL_CONFIG, GeneralConfig } from '../shared/config';

const AddSpeedDial: React.FC<{
  columnList: ColumnConfig[],
  generalConfig: GeneralConfig,
  rerender: React.Dispatch<React.SetStateAction<number>>
}> = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const actions = [
    { icon: <AddIcon />, name: "Add from Modal", onclick: handleOpen },
    { icon: <ContentCopyIcon />, name: "Add Current Page", onclick: () => { console.log("Add Current Page") } },
    { icon: <ContentPasteGoIcon />, name: "Add from Clipboard", onclick: () => { console.log("Add from Clipboard") } },
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
        {actions.map((action) => (
          <SpeedDialAction
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
        open={open}
        onClose={handleClose}
        columnList={props.columnList}
        generalConfig={props.generalConfig}
        rerender={props.rerender}
      />
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
    <FormControlLabel
      value="top"
      control={<Switch color="primary" checked={props.collapseDeckchecked} onChange={handleChange} />}
      label={<KeyboardDoubleArrowRightIcon color="primary" />}
      labelPlacement="top"
      sx={{ mx: 0 }}
    />
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
    <FormControlLabel
      value="top"
      control={<Switch color="primary" checked={props.mainColumnResponsiveChecked} onChange={handleChange} />}
      label={<FitScreenIcon color="primary" />}
      labelPlacement="top"
      sx={{ mx: 0 }}
    />
  )
};

export const Deck: React.FC<{
  columnList: ColumnConfig[],
}> = (props) => {
  const [, rerender] = React.useState<number>(Math.random());
  const [generalConfig, setGeneralConfig] = React.useState<GeneralConfig>(DEFAULT_GENERAL_CONFIG);
  const [mainColumnResponsiveChecked, setMainColumnResponsiveChecked] = React.useState<boolean>(false);
  const [collapseDeckchecked, setCollapseDeckChecked] = React.useState<boolean>(false);

  const onClickSaveButton = () => {
    saveColumns(props.columnList);
    rerender(Math.random());
  }

  React.useEffect(() => {
    // Load
    chrome.storage.sync.get(
      ['columnList', 'generalConfig'],
      function (value) {
        console.log(value.columnList);
        if (value.columnList) {
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
            />, col);
            document.getElementById("wrapper").appendChild(col);
          }
        }
        if (value.generalConfig) {
          setGeneralConfig(value.generalConfig);
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
          <Fab size="medium" sx={{ my: 1 }} onClick={onClickSaveButton}>
            <SaveIcon />
          </Fab>
          <Typography variant="caption" component="div" sx={{ color: "white" }}>
            Saved:
          </Typography>
          <Typography id="saved-time" variant="body2" component="div" sx={{ color: "white" }} gutterBottom>
            --:--:--
          </Typography>
        </Box>
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
          <Button className="column-jump-button" variant="outlined" href="#main-body">
            <HomeIcon />
          </Button>
        </Tooltip>
        {props.columnList.map((config, index) => (
          <Tooltip key={index} title={config.name} placement="right">
            <Button className="column-jump-button" variant="outlined" href={`#${columnElementId`${index}`}`}>
              <Typography variant="caption" component="div">
                {index}{!collapseDeckchecked ? "" : ": " + config.name}
              </Typography>
            </Button>
          </Tooltip>
        ))}
      </div>

      <div className="deck-buttons-element">
        <IconButton color="primary" size="large">
          <HelpIcon fontSize="inherit" />
        </IconButton>
        <ConfigModal
          currentGeneralConfig={generalConfig}
          setGeneralConfig={setGeneralConfig}
        />
        <Typography variant="caption" component="div" sx={{ color: "white" }}>
          Version:
        </Typography>
        <Typography variant="body2" component="div" sx={{ color: "white" }} gutterBottom>
          v{VERSION}
        </Typography>
      </div>
    </div>
  )
};