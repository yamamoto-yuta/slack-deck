import React from 'react';
import ReactDOM from 'react-dom';
import { SelectChangeEvent, Modal, Box, Typography, Divider, FormControl, Select, MenuItem, TextField, Button, InputLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { ColumnConfig, COLUMN_WIDTH_OPTIONS_TEXT, COLUMN_WIDTH_OPTIONS_VALUE, DEFAULT_COLUMN_CONFIG, saveColumns } from '../shared/column';
import "../style/common.scss";
import { Column } from './Column';


export const AddColumnModal: React.FC<{
  open: boolean,
  onClose: () => void,
  columnList: ColumnConfig[],
  rerender: React.Dispatch<React.SetStateAction<number>>
}> = (props) => {

  React.useEffect(() => {
    setSelectedColumnWidth(DEFAULT_COLUMN_CONFIG.width);
  }, [props.open]);

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
  const [newColumnConfig, setNewColumnConfig] = React.useState<ColumnConfig>(DEFAULT_COLUMN_CONFIG);
  const [selectedColumnWidth, setSelectedColumnWidth] = React.useState<string>(DEFAULT_COLUMN_CONFIG.width);

  const handleSelectedColumnWidthChange = (event: SelectChangeEvent) => {
    setSelectedColumnWidth(event.target.value as string);
    setNewColumnConfig({ ...newColumnConfig, width: event.target.value as string });
  };

  const onChangeUrl = (inputUrl: string) => {
    setNewColumnConfig({ ...newColumnConfig, url: inputUrl });
  };

  const onChangeColumnName = (inputColumnName: string) => {
    setNewColumnConfig({ ...newColumnConfig, name: inputColumnName });
  };

  const onClickAddButton = () => {
    // Add column
    let col = document.createElement('div');
    ReactDOM.render(<Column
      rerender={props.rerender}
      columnList={props.columnList}
      columnIndex={props.columnList.length}
      columnConfig={newColumnConfig}
      columnElement={col}
    />, col);
    document.getElementById('wrapper').appendChild(col);

    // Fix slack dom
    let pClient = document.getElementsByClassName('p-client')[0] as HTMLElement;
    pClient.style.width = '100%';

    // Push to columnList
    props.columnList.push(newColumnConfig);

    // Save current column state
    saveColumns(props.columnList);

    // Rerender deck
    props.rerender(Math.random());

    // Close Mordal
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

          <TextField
            label="URL"
            variant="outlined"
            sx={{ my: 1 }}
            fullWidth
            onChange={(e) => { onChangeUrl(e.target.value) }}
          />

          <FormControl fullWidth>
            <InputLabel id="column-width-select-label">Column Width</InputLabel>
            <Select
              labelId="column-width-select-label"
              label="Column Width"
              value={selectedColumnWidth}
              onChange={handleSelectedColumnWidthChange}
            >
              {COLUMN_WIDTH_OPTIONS_TEXT.map((option, index) => (
                <MenuItem key={index} value={COLUMN_WIDTH_OPTIONS_VALUE[index]}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Column Name"
            variant="outlined"
            sx={{ my: 1 }}
            fullWidth
            onChange={(e) => { onChangeColumnName(e.target.value) }}
          />

          <Divider sx={{ my: 1 }} />

          <div className="apply-button-element">
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