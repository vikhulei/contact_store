import styled from "styled-components"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Input = styled(TextField) `
    display: block;
    left: 20px;
`

const ChangePassword = ({openDialogBox, handleClickClose, buttonTitle, buttonText}) => {

    const handleSubmit = (e) => {
        e.preventDefault()
        handleClickClose()
    }

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
        <form onSubmit={handleSubmit}>
        <Input 
        label="Old password"
        type="password"
        variant="standard"
        required
        />
        <br/>
        <Input 
        label="New password"
        type="password"
        variant="standard"
        required
        />
        <br/>
        <Input 
        label="Retype new password"
        type="password"
        variant="standard"
        required
        />
        <DialogActions>
          <Button autoFocus type="submit">Change</Button>
          <Button onClick={((e) => {
            e.preventDefault()
            handleClickClose()
          }
            )}>
            Cancel
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default ChangePassword