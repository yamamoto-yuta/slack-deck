import React from 'react';
import { Box, AppBar, Toolbar, IconButton, InputBase, Button, Menu, MenuItem } from '@mui/material';

import ClearIcon from '@mui/icons-material/Clear';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import { ColumnConfig, COLUMN_WIDTH_OPTIONS_TEXT } from '../shared/column';

const columnMoveLeftButtonId = (_: TemplateStringsArray, columnIndex: number) => `col-mv-l-btn-${columnIndex}`;
const columnMoveRightButtonId = (_: TemplateStringsArray, columnIndex: number) => `col-mv-r-btn-${columnIndex}`;
const columnDuplicateButtonId = (_: TemplateStringsArray, columnIndex: number) => `col-dup-btn-${columnIndex}`;
const columnNameInputId = (_: TemplateStringsArray, columnIndex: number) => `col-name-input-${columnIndex}`;
const columnWidthSelectId = (_: TemplateStringsArray, columnIndex: number) => `col-select-${columnIndex}`;
const columnDeleteButtonId = (_: TemplateStringsArray, columnIndex: number) => `col-del-btn-${columnIndex}`;
const columnIframeId = (_: TemplateStringsArray, columnIndex: number) => `col-iframe-${columnIndex}`;
const columnElementId = (_: TemplateStringsArray, columnIndex: number) => `col-el-${columnIndex}`;
const extractColumnIdxFromId = (colDelBtnId: string) => parseInt(colDelBtnId.split('-').slice(-1)[0]);

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
  columnList: ColumnConfig[],
  columnIndex: number,
  columnConfig: ColumnConfig,
  columnElement: HTMLDivElement,
}> = (props) => {
  return (
    <div className="column-header">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="transparent">
          <Toolbar variant="dense">

            {/* Column action buttons */}

            <IconButton color="inherit" id={columnMoveLeftButtonId`${props.columnIndex}`}>
              <ChevronLeftIcon />
            </IconButton>

            <IconButton color="inherit">
              <ChevronRightIcon />
            </IconButton>

            <IconButton color="inherit">
              <ContentCopyIcon />
            </IconButton>

            <IconButton color="inherit">
              <ContentPasteGoIcon />
            </IconButton>

            {/* Column name input */}

            <InputBase
              inputProps={{ style: { color: "white" } }}
              sx={{ ml: 1, flex: 1 }}
              placeholder="Column name..."
            />

            {/* Column width menu */}

            <ColumnWidthMenu
              selectedColumnWidthOptionIndex={props.selectedColumnWidthOptionIndex}
              setSelectedColumnWidthOptionIndex={props.setSelectedColumnWidthOptionIndex}
            />

            {/* Delete buttion */}

            <IconButton color="inherit">
              <ClearIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </div >
  )
};