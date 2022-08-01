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

const Input = styled(TextField) `
    display: block;
    left: 20px;
`

const ChangePassword = ({openDialogBox, handleClickClose, buttonTitle, buttonText, password, token}) => {

const [oldPassword, setOldPassword] = useState("")
const [newPassword, setNewPassword] = useState("")
const [retypePassword, setRetypePassword] = useState("")

const postNewPassword = async() => {
    
    try {
      const resp = await axios.post("https://interview.intrinsiccloud.net/profile/changePassword?name=user3", 
      { headers: {"Authorization" : `Bearer ${token}`},
        newPassword: oldPassword,
        oldPassword: newPassword
      })
      if (resp.status === 200) {
        alert("all posted")
      }
    } catch (error) {
      alert(error.toString())
      // handleClickOpen()
    }
}

    const changePassword = () => {
      if(password !== oldPassword) {
        alert("Current password is not correct")
      } else if (newPassword !== retypePassword) {
        alert("New password is not retyped correctly")
      } else if (newPassword.match
        (/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/)
        ) {
        alert("now good")
        console.log(token)
        postNewPassword()
        // setOldPassword("")
        // setNewPassword("")
        // setRetypePassword("")
        // handleClickClose()
      } else {
        alert("Password must be at least 8 characters long, containing at least one upper case, one lower case, one numeric and one special character")
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
          <Button onClick={cancelButton}>
            Cancel
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default ChangePassword