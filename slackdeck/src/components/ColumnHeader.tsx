import React from 'react';
import { Box, AppBar, Toolbar, IconButton, InputBase, Button, Menu, MenuItem } from '@mui/material';
import cloneDeep from 'lodash/cloneDeep';
import ClearIcon from '@mui/icons-material/Clear';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import { chooseColumnColor, ColumnConfig, columnDeleteButtonClassName, columnDeleteButtonId, columnDuplicateButtonClassName, columnDuplicateButtonId, columnElementId, columnIframeClassName, columnIframeId, columnMoveLeftButtonClassName, columnMoveLeftButtonId, columnMoveRightButtonClassName, columnMoveRightButtonId, columnOpenFromClipboardButtonClassName, columnOpenFromClipboardButtonId, COLUMN_WIDTH_OPTIONS_TEXT, extractColumnIdxFromId } from '../shared/column';
import ReactDOM from 'react-dom';
import { Column } from './Column';

const ColumnWidthMenu: React.FC<{
  selectedColumnWidthOptionIndex: number,
  setSelectedColumnWidthOptionIndex: React.Dispatch<React.SetStateAction<number>>,
}> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState<number>(props.selectedColumnWidthOptionIndex);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number,
  ) => {
    props.setSelectedColumnWidthOptionIndex(index);
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="inherit"
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {COLUMN_WIDTH_OPTIONS_TEXT[selectedIndex]}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {COLUMN_WIDTH_OPTIONS_TEXT.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};


export const ColumnHeader: React.FC<{
  selectedColumnWidthOptionIndex: number,
  setSelectedColumnWidthOptionIndex: React.Dispatch<React.SetStateAction<number>>,
  rerender: React.Dispatch<React.SetStateAction<number>>,
  columnList: ColumnConfig[],
  columnIndex: number,
  columnConfig: ColumnConfig,
  columnElement: HTMLDivElement,
}> = (props) => {

  const updateElement = () => {
    for (var i = 0; i < props.columnList.length; i++) {
      const columnElement = document.getElementsByClassName('column')[i] as HTMLDivElement;
      columnElement.style.backgroundColor = chooseColumnColor(i);
      columnElement.style.borderColor = chooseColumnColor(i);
      columnElement.id = columnElementId`${i}`;
      document.getElementsByClassName(columnMoveLeftButtonClassName)[i].id = columnMoveLeftButtonId`${i}`;
      document.getElementsByClassName(columnMoveRightButtonClassName)[i].id = columnMoveRightButtonId`${i}`;
      // document.getElementsByClassName('col-name-input')[i].id = columnNameInputId`${i}`;
      // document.getElementsByClassName('col-width-select')[i].id = columnWidthSelectId`${i}`;
      document.getElementsByClassName(columnIframeClassName)[i].id = columnIframeId`${i}`;
    }
  };

  const moveColumnLeft = (
    colElIdx: number,
    colEl: HTMLElement,
    newColElIdx: number,
    newColEl: HTMLElement
  ) => {
    // Switch column
    if (newColElIdx >= 0) {
      document.getElementById('wrapper').insertBefore(
        colEl.parentElement,
        newColEl.parentElement
      );
    } else {
      document.getElementById('wrapper').appendChild(
        colEl.parentElement
      );
      newColElIdx += props.columnList.length;
    }
    colEl.getElementsByTagName('iframe')[0].src = props.columnList[colElIdx].url;
    // Update column list
    let tmp = props.columnList[colElIdx];
    props.columnList[colElIdx] = props.columnList[newColElIdx];
    props.columnList[newColElIdx] = tmp;
  }

  const onClickMoveLeftButton = () => {
    // Save column
    // saveColumns(props.columnList);
    // Calculate new column index
    let colElIdx = extractColumnIdxFromId(props.columnElement.getElementsByTagName('div')[0].id);
    let newColElIdx = colElIdx - 1;
    // Switch column
    moveColumnLeft(
      colElIdx,
      document.getElementById(columnElementId`${colElIdx}`),
      newColElIdx,
      document.getElementById(columnElementId`${newColElIdx}`)
    );
    // Update element id
    updateElement();
    // Save column
    // saveColumns(props.columnList);
    // Rerender deck
    props.rerender(Math.random());
  }

  const insertCopyRightSide = (copiedColEl: HTMLElement, newColumnConfig: ColumnConfig) => {
    // Push to columnList
    let orgColElIdx = extractColumnIdxFromId(props.columnElement.getElementsByTagName('div')[0].id);
    let orgColEl = document.getElementById(columnElementId`${orgColElIdx}`).parentElement;
    let insertPos = orgColElIdx + 1;
    // Switch column
    if (insertPos < props.columnList.length) {
      document.getElementById('wrapper').insertBefore(
        copiedColEl,
        orgColEl
      );
      props.columnList.splice(orgColElIdx + 1, 0, newColumnConfig);
    } else {
      document.getElementById('wrapper').appendChild(copiedColEl);
      props.columnList.push(newColumnConfig);
    }
  }

  const onClickDuplicateButton = () => {
    // Save column
    // saveColumns(props.columnList);
    // Clone column config
    let newColumnConfig = cloneDeep(props.columnConfig);
    // Insert column after original column
    let col = document.createElement('div');
    ReactDOM.render(<Column
      rerender={props.rerender}
      columnList={props.columnList}
      columnIndex={props.columnList.length}
      columnConfig={newColumnConfig}
      columnElement={col}
    />, col);
    insertCopyRightSide(col, newColumnConfig);
    // Fix slack dom
    let pClient = document.getElementsByClassName('p-client')[0] as HTMLElement;
    pClient.style.width = '100%';
    // Save current column state
    // saveColumns(props.columnList);
    // Update other elements
    updateElement();
    // Rerender deck
    props.rerender(Math.random());
  };

  const onClickDeleteButton = () => {
    // Remove
    let colElIdx = extractColumnIdxFromId(props.columnElement.getElementsByTagName('div')[0].id);
    props.columnList.splice(colElIdx, 1);;
    // saveColumns(props.columnList);
    props.columnElement.remove();
    // Update other elements
    updateElement();
    // Rerender deck
    props.rerender(Math.random());
  };

  return (
    <div className="column-header">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="transparent">
          <Toolbar variant="dense">

            {/* Column action buttons */}

            <IconButton
              color="inherit"
              id={columnMoveLeftButtonId`${props.columnIndex}`}
              className={columnMoveLeftButtonClassName}
              onClick={onClickMoveLeftButton}
            >
              <ChevronLeftIcon />
            </IconButton>

            <IconButton
              color="inherit"
              id={columnMoveRightButtonId`${props.columnIndex}`}
              className={columnMoveRightButtonClassName}
            >
              <ChevronRightIcon />
            </IconButton>

            <IconButton
              color="inherit"
              id={columnDuplicateButtonId`${props.columnIndex}`}
              className={columnDuplicateButtonClassName}
              onClick={onClickDuplicateButton}
            >
              <ContentCopyIcon />
            </IconButton>

            <IconButton
              color="inherit"
              id={columnOpenFromClipboardButtonId`${props.columnIndex}`}
              className={columnOpenFromClipboardButtonClassName}
            >
              <ContentPasteGoIcon />
            </IconButton>

            {/* Column name input */}

            <InputBase
              inputProps={{ style: { color: "white" } }}
              sx={{ ml: 1, flex: 1 }}
              placeholder="Column name..."
              defaultValue={props.columnConfig.name}
            />

            {/* Column width menu */}

            <ColumnWidthMenu
              selectedColumnWidthOptionIndex={props.selectedColumnWidthOptionIndex}
              setSelectedColumnWidthOptionIndex={props.setSelectedColumnWidthOptionIndex}
            />

            {/* Delete buttion */}

            <IconButton
              color="inherit"
              id={columnDeleteButtonId`${props.columnIndex}`}
              className={columnDeleteButtonClassName}
              onClick={onClickDeleteButton}
            >
              <ClearIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </div >
  )
};