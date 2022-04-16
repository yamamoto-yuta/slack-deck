import React from 'react';
import { Box, AppBar, Toolbar, IconButton, InputBase, Button, Menu, MenuItem } from '@mui/material';

import ClearIcon from '@mui/icons-material/Clear';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import { ColumnConfig, columnDeleteButtonClassName, columnDeleteButtonId, columnDuplicateButtonClassName, columnDuplicateButtonId, columnElementId, columnIframeClassName, columnIframeId, columnMoveLeftButtonClassName, columnMoveLeftButtonId, columnMoveRightButtonClassName, columnMoveRightButtonId, columnOpenFromClipboardButtonClassName, columnOpenFromClipboardButtonId, COLUMN_WIDTH_OPTIONS_TEXT, extractColumnIdxFromId } from '../shared/column';

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

  const updateElementID = () => {
    for (var i = 0; i < props.columnList.length; i++) {
      document.getElementsByClassName('column')[i].id = columnElementId`${i}`;
      document.getElementsByClassName(columnMoveLeftButtonClassName)[i].id = columnMoveLeftButtonId`${i}`;
      document.getElementsByClassName(columnMoveRightButtonClassName)[i].id = columnMoveRightButtonId`${i}`;
      // document.getElementsByClassName('col-name-input')[i].id = columnNameInputId`${i}`;
      // document.getElementsByClassName('col-width-select')[i].id = columnWidthSelectId`${i}`;
      document.getElementsByClassName(columnIframeClassName)[i].id = columnIframeId`${i}`;
    }
  };

  const onClickDeleteButton = () => {
    // Remove
    let colElIdx = extractColumnIdxFromId(props.columnElement.getElementsByTagName('div')[0].id);
    props.columnList.splice(colElIdx, 1);;
    // saveColumns(props.columnList);
    props.columnElement.remove();
    // Update other elements
    updateElementID();
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