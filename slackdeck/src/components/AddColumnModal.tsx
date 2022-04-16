import React from 'react';
import ReactDOM from 'react-dom';
import { SelectChangeEvent, Modal, Box, Typography, Divider, FormControl, Select, MenuItem, TextField, Button, InputLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { COLUMN_WIDTH_OPTIONS_TEXT } from '../shared/column';
import "../style/addColumnModal.scss";
import { Column } from './Column';


export const AddColumnModal: React.FC<{
  open: boolean,
  onClose: () => void,
}> = (props) => {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    color: 'text.primary',
    boxShadow: 24,
    p: 4,
  };
  const [selectedColumnWidth, setSelectedColumnWidth] = React.useState<string>("");
  const handleSelectedColumnWidthChange = (event: SelectChangeEvent) => {
    setSelectedColumnWidth(event.target.value as string);
  };
  const onClickAddButton = () => {
    let col = document.createElement('div');
    ReactDOM.render(<Column />, col);
    document.getElementById('wrapper').appendChild(col);

    props.onClose();
  };
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.onClose}
      >
        <Box sx={style}>
          <Typography variant="h4">
            Add new column
          </Typography>
          <Divider sx={{ my: 1 }} />

          <TextField label="URL" variant="outlined" sx={{ my: 1 }} fullWidth />

          <FormControl fullWidth>
            <InputLabel id="column-width-select-label">Column Width</InputLabel>
            <Select
              labelId="column-width-select-label"
              label="Column Width"
              value={selectedColumnWidth}
              onChange={handleSelectedColumnWidthChange}
            >
              {COLUMN_WIDTH_OPTIONS_TEXT.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField label="Column Name" variant="outlined" sx={{ my: 1 }} fullWidth />

          <Divider sx={{ my: 1 }} />

          <div id="add-column-button">
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={onClickAddButton}
            >
              Add
            </Button>
          </div>

        </Box>
      </Modal>
    </div >
  )
};