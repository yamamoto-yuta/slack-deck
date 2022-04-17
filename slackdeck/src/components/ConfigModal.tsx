import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { SelectChangeEvent, IconButton, Modal, Box, Typography, Divider, FormControl, Select, MenuItem, Button, TextField } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import { COLUMN_WIDTH_OPTIONS_TEXT, COLUMN_WIDTH_OPTIONS_VALUE } from '../shared/column';
import { GeneralConfig } from '../shared/config';
import "../style/configModal.scss";
import { CLIENT_BASE_URL_PATTERN, SlackUrlConverter, WORKSPACE_BASE_URL_PATTERN } from '../shared/slackUrlConverter';

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

const WorkspaceName2IdInputRow: React.FC<{
  index: number,
  workspaceUrl: string,
  clientUrl: string,
  updatedGeneralConfig: GeneralConfig,
  setUpdatedGeneralConfig: React.Dispatch<React.SetStateAction<GeneralConfig>>,
}> = (props) => {
  const [clientBaseUrl, setClientBaseUrl] = React.useState("");
  const [workspaceBaseUrl, setWorkspaceBaseUrl] = React.useState("");

  const inputRefClientBaseUrl = React.useRef(null);
  const inputRefWorkspaceBaseUrl = React.useRef(null);

  const [isClientBaseUrlValid, setIsClientBaseUrlValid] = React.useState(false);
  const [isWorkspaceBaseUrlValid, setIsWorkspaceBaseUrlValid] = React.useState(false);

  const onChangeWorkspaceUrl = (workspaceUrl: string, index: number) => {
    // // Validate
    // let newSlackUrlValidateResult: SlackUrlValidateResult[] = validateUrl.slice();
    // newSlackUrlValidateResult[index].workspaceUrl = urlValidator(
    //   new RegExp("^https://[a-z0-9]+[a-z0-9\-]+.slack.com/$"),
    //   workspaceUrl
    // );
    // setValidateUrl(newSlackUrlValidateResult);
    // // Update All validation result
    // setIsValidAllUrl(isValidAllSlackUrl(newSlackUrlValidateResult));

    // Validate
    setWorkspaceBaseUrl(workspaceUrl);
    if (inputRefWorkspaceBaseUrl.current) {
      const ref = inputRefWorkspaceBaseUrl.current;
      if (ref.validity.valid) {
        setIsWorkspaceBaseUrlValid(true);
      } else {
        setIsWorkspaceBaseUrlValid(false);
      }
    }

    // Update state
    const newSlackUrlTable: SlackUrlConverter[] = props.updatedGeneralConfig.slackUrlTable.slice();
    newSlackUrlTable[index].workspaceUrl = workspaceUrl;
    props.setUpdatedGeneralConfig({ ...props.updatedGeneralConfig, slackUrlTable: newSlackUrlTable });
  };

  const onChangeClientUrl = (clientUrl: string, index: number) => {
    // // Validate
    // let newSlackUrlValidateResult: SlackUrlValidateResult[] = validateUrl.slice();
    // newSlackUrlValidateResult[index].clientUrl = urlValidator(
    //   new RegExp("^https://app.slack.com/client/[A-Z0-9]+/$"),
    //   clientUrl
    // );
    // setValidateUrl(newSlackUrlValidateResult);
    // // Update All validation result
    // setIsValidAllUrl(isValidAllSlackUrl(newSlackUrlValidateResult));

    // Validate
    setClientBaseUrl(clientUrl);
    if (inputRefClientBaseUrl.current) {
      const ref = inputRefClientBaseUrl.current;
      if (ref.validity.valid) {
        setIsClientBaseUrlValid(true);
      } else {
        setIsClientBaseUrlValid(false);
      }
    }

    // Update state
    const newSlackUrlTable: SlackUrlConverter[] = props.updatedGeneralConfig.slackUrlTable.slice();
    newSlackUrlTable[index].clientUrl = clientUrl;
    props.setUpdatedGeneralConfig({ ...props.updatedGeneralConfig, slackUrlTable: newSlackUrlTable });
  };

  const onClickDeleteButton = (index: number) => {
    // Update validation result state
    // let newSlackUrlValidateResult: SlackUrlValidateResult[] = validateUrl.slice();
    // newSlackUrlValidateResult.splice(index, 1)
    // setValidateUrl(newSlackUrlValidateResult);
    // // Update All validation result
    // setIsValidAllUrl(isValidAllSlackUrl(newSlackUrlValidateResult));
    // Update general config state
    const newSlackUrlTable: SlackUrlConverter[] = props.updatedGeneralConfig.slackUrlTable.slice();
    newSlackUrlTable.splice(index, 1);
    props.setUpdatedGeneralConfig({ ...props.updatedGeneralConfig, slackUrlTable: newSlackUrlTable });
  };

  React.useEffect(() => {
    onChangeWorkspaceUrl(props.workspaceUrl, props.index);
    onChangeClientUrl(props.clientUrl, props.index);
  }, []);

  return (
    <div key={props.index} className="url-mapper-row-element">
      <TextField
        label="Workspace URL"
        variant="outlined"
        size="small"
        fullWidth
        placeholder="https://[WORLSPACE_NAME].slack.com/"
        defaultValue={props.workspaceUrl}
        onChange={(e) => onChangeWorkspaceUrl(e.target.value, props.index)}
        required
        inputProps={{ pattern: WORKSPACE_BASE_URL_PATTERN }}
        inputRef={inputRefWorkspaceBaseUrl}
        helperText={inputRefWorkspaceBaseUrl?.current?.validationMessage}
        error={!isWorkspaceBaseUrlValid}
      />
      <TextField
        label="Client URL"
        variant="outlined"
        size="small"
        fullWidth
        placeholder="https://app.slack.com/client/XXXXXXXXXXX/"
        defaultValue={props.clientUrl}
        onChange={(e) => onChangeClientUrl(e.target.value, props.index)}
        required
        inputProps={{ pattern: CLIENT_BASE_URL_PATTERN }}
        inputRef={inputRefClientBaseUrl}
        helperText={inputRefClientBaseUrl?.current?.validationMessage}
        error={!isClientBaseUrlValid}
      />
      <Button
        variant="contained"
        color="error"
        size="small"
        style={{ height: "40px" }}
        onClick={() => onClickDeleteButton(props.index)}
      >
        <RemoveIcon color="inherit" />
      </Button>
    </div>
  )
};

const WorkspaceName2IdMapper: React.FC<{
  updatedGeneralConfig: GeneralConfig,
  setUpdatedGeneralConfig: React.Dispatch<React.SetStateAction<GeneralConfig>>,
}> = (props) => {
  const onClickAddButton = () => {
    // // Validate
    // let newSlackUrlValidateResult: SlackUrlValidateResult[] = validateUrl.slice();
    // newSlackUrlValidateResult.push({
    //   workspaceUrl: VALIDATION_FAILED,
    //   clientUrl: VALIDATION_FAILED,
    // });
    // setValidateUrl(newSlackUrlValidateResult);
    // // Update All validation result
    // setIsValidAllUrl(isValidAllSlackUrl(newSlackUrlValidateResult));
    // Update state
    const newSlackUrlTable: SlackUrlConverter[] = props.updatedGeneralConfig.slackUrlTable.slice();
    newSlackUrlTable.push({ workspaceUrl: "", clientUrl: "" });
    props.setUpdatedGeneralConfig({ ...props.updatedGeneralConfig, slackUrlTable: newSlackUrlTable });
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Map workspace name to workspace ID
      </Typography>
      <Typography variant="body1" gutterBottom>
        By mapping a workspace named URL <code>https://[WORLSPACE_NAME].slack.com/</code> to a workspace ID URL <code>https://app.slack.com/[WORKSPACE_ID]/</code>, columns can be added from a workspace named URL.
      </Typography>
      <div>
        {props.updatedGeneralConfig.slackUrlTable.map((row, index) => (
          <WorkspaceName2IdInputRow
            key={index}
            index={index}
            workspaceUrl={row.workspaceUrl}
            clientUrl={row.clientUrl}
            updatedGeneralConfig={props.updatedGeneralConfig}
            setUpdatedGeneralConfig={props.setUpdatedGeneralConfig}
          />
        ))}
      </div>
      <Button variant="contained" color="primary" onClick={onClickAddButton}>
        <AddIcon color="inherit" />
      </Button>
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
    width: 1000,
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

  React.useEffect(() => {
    // Initialize updates
    setUpdatedGeneralConfig(cloneDeep(props.currentGeneralConfig));

    // let validationResult: SlackUrlValidateResult[] = [];
    // for (let converter of props.currentGeneralConfig.slackUrlTable) {
    //   validationResult.push({
    //     workspaceUrl: urlValidator(new RegExp(`${WORKSPACE_URL_PATTERN}$`), converter.workspaceUrl),
    //     clientUrl: urlValidator(new RegExp(`${CLIENT_URL_PATTERN}$`), converter.clientUrl),
    //   });
    // }
    // setValidateUrl(validationResult);

    // setIsValidAllUrl(isValidAllSlackUrl(validationResult));

  }, [open]);

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

          <WorkspaceName2IdMapper
            updatedGeneralConfig={updatedGeneralConfig}
            setUpdatedGeneralConfig={setUpdatedGeneralConfig}
          />

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
      {console.log(updatedGeneralConfig.slackUrlTable)}
    </div>
  )
};