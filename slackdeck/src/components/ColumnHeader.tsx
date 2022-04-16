import React from 'react';
import { Box, AppBar, Toolbar, IconButton, InputBase, Button, Menu, MenuItem } from '@mui/material';

import ClearIcon from '@mui/icons-material/Clear';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import { COLUMN_WIDTH_OPTIONS_TEXT } from '../consts/columnWidth';

const ColumnWidthMenu: React.FC<{
  setSelectedColumnWidthOptionIndex: React.Dispatch<React.SetStateAction<number>>
}> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
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
  setSelectedColumnWidthOptionIndex: React.Dispatch<React.SetStateAction<number>>
}> = (props) => {
  return (
    <div className="column-header">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="transparent">
          <Toolbar variant="dense">

            {/* Column action buttons */}

            <IconButton color="inherit">
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
              sx={{ ml: 1, flex: 1 }}
              placeholder="Column name..."
            />

            {/* Column width menu */}

            <ColumnWidthMenu
              setSelectedColumnWidthOptionIndex={props.setSelectedColumnWidthOptionIndex}
            />

            {/* Delete buttion */}

            <IconButton color="inherit">
              <ClearIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
};