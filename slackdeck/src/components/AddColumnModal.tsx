import React from 'react';
import { SelectChangeEvent, IconButton, Modal, Box, Typography, Divider, FormControl, Select, MenuItem } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { COLUMN_WIDTH_OPTIONS_TEXT } from '../consts/columnWidth';

const DefaultColumnWidthSelect: React.FC = () => {
  const [selectedColumnWidth, setSelectedColumnWidth] = React.useState<string>("");

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedColumnWidth(event.target.value as string);
  };
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Default column width
      </Typography>
      <Typography variant="body1" gutterBottom>
        When adding columns, the column width set here is used as the default value.
      </Typography>
      <FormControl fullWidth>
        <Select
          value={selectedColumnWidth}
          onChange={handleChange}
        >
          {COLUMN_WIDTH_OPTIONS_TEXT.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
};

const WorkspaceName2IdMapper: React.FC = () => {
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Map workspace name to workspace ID
      </Typography>
      <Typography variant="body1" gutterBottom>
        By mapping a workspace named URL <code>https://[WORLSPACE_NAME].slack.com</code> to a workspace ID URL <code>https://app.slack.com/[WORKSPACEID]</code>, columns can be added from a workspace named URL.
      </Typography>
    </div>
  )
};

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
  return (
    <div>
      {console.log(props.open)}
      <Modal
        open={props.open}
        onClose={props.onClose}
      >
        <Box sx={style}>
          <Typography variant="h4">
            Config
          </Typography>
          <Divider sx={{ my: 1 }} />
          <DefaultColumnWidthSelect />
          <Divider sx={{ my: 1 }} />
          <WorkspaceName2IdMapper />
        </Box>
      </Modal>
    </div>
  )
};