import styled from "styled-components"
import Button from '@mui/material/Button';
import { Select, MenuItem, InputLabel, FormControl } from "../styles/GeneralStyles"
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Form = styled.form `
  display: flex;
  flex-direction: column;
  width: 90%;
`

const Input = styled(TextField)`
    display: block;
    left: 20px;
`

const FormControlCountry = styled(FormControl) `
&& {
  left: 15%;
  width: 50%;
}
`

const AddPhoneNumber = ({ openAddPhoneNumber, handleClickClose }) => {

  const handleSubmit = (e) => {
    e.preventDefault()
    handleClickClose()
  }

  return (
    <div>
      <Dialog
        open={openAddPhoneNumber}
        onClose={handleClickClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Add Phone Number
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please enter the new number details
          </DialogContentText>
        </DialogContent>
        <Form onSubmit={handleSubmit}>
          <div style={{"flexDirection": "row", "width": "100%", "justifyContent": "spaceBetween"}}>
            <Input style={{"width": "40%"}}
              label="Country code"
              type="text"
              variant="standard"
              required
              readOnly
            />
            <FormControlCountry variant="standard">
            <InputLabel id="phonenumber" >Choose country</InputLabel>
            <Select
            variant="standard"
            labelId="phonenumber"
            id="phonenumber"
            label="Choose country"
            >
              <MenuItem>111111</MenuItem>
              <MenuItem>22222</MenuItem>
              <MenuItem>333333</MenuItem>
            </Select>
            </FormControlCountry>
          </div>
          <Input
            label="Area code"
            type="text"
            variant="standard"
            required
          />
          <Input
            label="Extension"
            type="password"
            variant="standard"
          />
          <Input
            label="Number"
            type="password"
            variant="standard"
            required
          />
          <DialogActions>
            <Button autoFocus type="submit">Add</Button>
            <Button onClick={((e) => {
              e.preventDefault()
              handleClickClose()
            }
            )}>
              Cancel
            </Button>
          </DialogActions>
        </Form>
      </Dialog>
    </div>
  );
}

export default AddPhoneNumber