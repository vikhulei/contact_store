import { useState } from "react"
import axios from "axios"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OneButtonDialogBox from "./OneButtonDialogBox";


const DialogBox = ({ openDialogBox, handleClickClose, deleteAction, deleteButtonTitle, deleteButtonText, token, contactId, user }) => {

  const [openOneButtonDialogBox, setOpenOneButtonDialogBox] = useState(false)
  const [buttonTitle, setButtonTitle] = useState("")
  const [buttonText, setButtonText] = useState("")

  const handleOneButtonOpen = () => {
    setOpenOneButtonDialogBox(true);
  };

  const handleOneButtonClose = () => {
    setOpenOneButtonDialogBox(false);
  };


  const deleteContact = async () => {
    try {
      const resp = await axios.delete(`https://interview.intrinsiccloud.net/contacts/${contactId}`,
        {
          params: { name: user },
          headers: { "Authorization": `Bearer ${token}` }
        },
      )
      if (resp.status === 200) {
        setButtonTitle("Success")
        setButtonText("Contact has been deleted")
        handleOneButtonOpen()
        deleteAction()
      }
    } catch (error) {
      setButtonTitle("Error")
      setButtonText(error.toString())
      handleOneButtonOpen()
      handleClickClose()
    }
  }

  return (
    <div>

      <OneButtonDialogBox
        openDialogBox={openOneButtonDialogBox}
        handleClickClose={handleOneButtonClose}
        buttonTitle={buttonTitle}
        buttonText={buttonText}
      />

      <Dialog
        open={openDialogBox}
        onClose={handleClickClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {deleteButtonTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {deleteButtonText}
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