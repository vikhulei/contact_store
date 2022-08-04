import {useState} from "react"
import axios from "axios"
import styled from "styled-components"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OneButtonDialogBox from "./OneButtonDialogBox";


const Input = styled(TextField) `
    display: block;
    left: 20px;
`

const ChangePassword = ({openDialogBox, handleClickClose, buttonTitle, buttonText, password, token, user}) => {

const [oldPassword, setOldPassword] = useState("")
const [newPassword, setNewPassword] = useState("")
const [retypePassword, setRetypePassword] = useState("")
const [openOneButtonDialogBox, setOpenOneButtonDialogBox] = useState(false)
const [oneButtonTitle, setOneButtonTitle] = useState("")
const [oneButtonText, setOneButtonText] = useState("")


const handleOneButtonOpen = () => {
  setOpenOneButtonDialogBox(true);
};

const handleOneButtonClose = () => {
  setOpenOneButtonDialogBox(false);
};

const postNewPassword = async() => {
    
    try {
      const resp = await axios.post("https://interview.intrinsiccloud.net/profile/changePassword",
      {
        newPassword: newPassword,
        oldPassword: oldPassword
      },
       { params: { name: user } ,
        headers: {"Authorization" : `Bearer ${token}`} })

      if (resp.status === 200) {
        setOneButtonTitle("All correct")
        setOneButtonText("Password has been changed")
        handleOneButtonOpen()
      }
    } catch (error) {
      setOneButtonTitle("Error")
      setOneButtonText(error.toString())
      handleOneButtonOpen()
    }
}

    const changePassword = () => {
      if(password !== oldPassword) {
        setOneButtonTitle("Try again")
        setOneButtonText("Your current password has not been entered correctly")
        handleOneButtonOpen()
      } else if (newPassword !== retypePassword) {
        setOneButtonTitle("Try again")
        setOneButtonText("New password is not retyped correctly")
        handleOneButtonOpen()
      } else if (newPassword.match
        (/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/)
        ) {
        postNewPassword()
        setOldPassword("")
        setNewPassword("")
        setRetypePassword("")
        handleClickClose()
      } else {
        setOneButtonTitle("Try again")
        setOneButtonText("Password must be at least 8 characters long, containing at least one upper case, one lower case, one numeric and one special character")
        handleOneButtonOpen()
      } 
    }

    const cancelButton = () => {
      setOldPassword("")
      setNewPassword("")
      setRetypePassword("")
      handleClickClose()
    }

  return (
    <div>
      <OneButtonDialogBox
        openDialogBox={openOneButtonDialogBox}
        handleClickClose={handleOneButtonClose}
        buttonTitle={oneButtonTitle}
        buttonText={oneButtonText}
      />


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
        <form>
        <Input 
        label="Old password"
        type="password"
        variant="standard"
        onChange={e => setOldPassword(e.target.value)}
        value={oldPassword}
        required
        />
        <br/>
        <Input 
        label="New password"
        type="password"
        variant="standard"
        onChange={e => setNewPassword(e.target.value)}
        value={newPassword}
        required
        />
        <br/>
        <Input 
        label="Retype new password"
        type="password"
        variant="standard"
        onChange={e => setRetypePassword(e.target.value)}
        value={retypePassword}
        required
        />
        <DialogActions>
          <Button autoFocus onClick={changePassword}>Change</Button>
          <Button
          onClick={cancelButton}
          >
            Cancel
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default ChangePassword