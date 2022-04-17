import React from 'react';
import { SelectChangeEvent, IconButton, Modal, Box, Typography, Divider, FormControl, Select, MenuItem, Button } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import CheckIcon from '@mui/icons-material/Check';
import { COLUMN_WIDTH_OPTIONS_TEXT, COLUMN_WIDTH_OPTIONS_VALUE } from '../shared/column';
import { GeneralConfig } from '../shared/config';

const DefaultColumnWidthSelect: React.FC<{
  defaultColumnWidth: string,
  updatedGeneralConfig: GeneralConfig,
  setUpdatedGeneralConfig: React.Dispatch<React.SetStateAction<GeneralConfig>>,
}> = (props) => {
  const [selectedColumnWidth, setSelectedColumnWidth] = React.useState<string>(props.defaultColumnWidth);

  const handleChange = (e: SelectChangeEvent) => {
    setSelectedColumnWidth(e.target.value as string);
    props.setUpdatedGeneralConfig({ ...props.updatedGeneralConfig, defaultColumnWidth: e.target.value });
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
            <MenuItem key={index} value={COLUMN_WIDTH_OPTIONS_VALUE[index]}>
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
        By mapping a workspace named URL <code>https://[WORLSPACE_NAME].slack.com/</code> to a workspace ID URL <code>https://app.slack.com/[WORKSPACEID]/</code>, columns can be added from a workspace named URL.
      </Typography>
    </div>
  )
};

export const ConfigModal: React.FC<{
  currentGeneralConfig: GeneralConfig,
  setGeneralConfig: React.Dispatch<React.SetStateAction<GeneralConfig>>,
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
  const [updatedGeneralConfig, setUpdatedGeneralConfig] = React.useState<GeneralConfig>(props.currentGeneralConfig);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onClickApplyButton = () => {
    // Update
    props.setGeneralConfig(updatedGeneralConfig);
    // Save config
    chrome.storage.sync.set({ 'generalConfig': updatedGeneralConfig });
    // Close modal
    handleClose();
  };

  return (
    <div>
      <IconButton color="primary" size="large" onClick={handleOpen}>
        <SettingsIcon fontSize="inherit" />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Typography variant="h4">
            Config
          </Typography>

          <Divider sx={{ my: 1 }} />

          <DefaultColumnWidthSelect
            defaultColumnWidth={props.currentGeneralConfig.defaultColumnWidth}
            updatedGeneralConfig={updatedGeneralConfig}
            setUpdatedGeneralConfig={setUpdatedGeneralConfig}
          />

          <Divider sx={{ my: 1 }} />

          <WorkspaceName2IdMapper />

          <Divider sx={{ my: 1 }} />

          <div className="apply-button-element">
            <Button
              variant="contained"
              startIcon={<CheckIcon />}
              onClick={onClickApplyButton}
            >
              Apply
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  )
};