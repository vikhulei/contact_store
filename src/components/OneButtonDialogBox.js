import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const DialogBox = ({openDialogBox, handleClickClose, buttonTitle, buttonText}) => {

  return (
    <div>
      <Dialog
        open={openDialogBox}
        onClose={handleClickClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"  
      >
        <DialogTitle id="alert-dialog-title">
          {buttonTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           {buttonText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose} autoFocus>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DialogBox