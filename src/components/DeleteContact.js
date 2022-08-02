import axios from "axios"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const DialogBox = ({openDialogBox, handleClickClose, action, buttonTitle, buttonText, token, contactId }) => {

const deleteContact = async() => {
  try {
    const resp = await axios.delete(`https://interview.intrinsiccloud.net/contacts/${contactId}?name=user3`,
      { headers: { "Authorization": `Bearer ${token}` } },
    )
    if (resp.status === 200) {
      alert("deleted")
      action()
    }
  } catch (error) {
    alert(error.toString())
    handleClickClose()
    // setButtonText(error.toString())
    // handleClickOpen()
  }
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
        <DialogActions>
          <Button onClick={deleteContact}
            autoFocus>Yes</Button>
          <Button onClick={handleClickClose}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DialogBox