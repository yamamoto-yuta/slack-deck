import React from 'react';
import { Box, AppBar, Toolbar, InputBase, Button, Menu, MenuItem } from '@mui/material';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { MAIN_COLUMN_WIDTH_OPTIONS_TEXT, MAIN_COLUMN_WIDTH_OPTIONS_VALUE } from '../shared/column';

const ColumnWidthMenu: React.FC = () => {
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
    const mainColumnElement = document.getElementById("main-column-element");
    mainColumnElement.style.minWidth = MAIN_COLUMN_WIDTH_OPTIONS_VALUE[index];
    mainColumnElement.style.width = MAIN_COLUMN_WIDTH_OPTIONS_VALUE[index];
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
        {MAIN_COLUMN_WIDTH_OPTIONS_TEXT[selectedIndex]}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {MAIN_COLUMN_WIDTH_OPTIONS_TEXT.map((option, index) => (
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


export const MainColumnHeader: React.FC = () => {
  return (
    <div className="column-header">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="transparent">
          <Toolbar variant="dense">

            {/* Column name input */}

            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Column name..."
            />

            {/* Column width menu */}

            <ColumnWidthMenu />
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
};