import React from 'react';
import { Alert, IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const InvalidUrlSnackbar: React.FC<{
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  clipboardText: string,
}> = (props) => {
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    props.setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      sx={{ minWidth: 400 }}
      open={props.open}
      autoHideDuration={3000}
      onClose={handleClose}
      action={action}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {`Clipboard URL is invalid: "${props.clipboardText.length > 10 ? props.clipboardText.slice(0, 10) + '...' : props.clipboardText}"`}
      </Alert>
    </Snackbar>
  )
};