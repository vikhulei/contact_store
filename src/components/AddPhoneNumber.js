import { useState, useEffect } from "react"
import axios from "axios"
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

// https://interview.intrinsiccloud.net/utility/countries

const AddPhoneNumber = ({ openAddPhoneNumber, handleClickClose, token, newNumber, setNewNumber, addNewNumber }) => {

  const [countries, setCountries] = useState([])
  const [countryCode, setCountryCode0] = useState("")


  const handleSubmit = (e) => {
    e.preventDefault()
    handleClickClose()
  }

const getCountries = async () => {
  const result = await axios.get("https://interview.intrinsiccloud.net/utility/countries", 
  { headers: {"Authorization" : `Bearer ${token}`} }
  )
  // console.log(result.data)
  setCountries(result.data)
}

const countryNames = countries.map((value, idx) => {
  return <MenuItem key={idx} value={value.dialCode}>
    {value.name}
  </MenuItem>
})

const getCountryCode = (e) => {
    setCountryCode0(e.target.value)
    setNewNumber(prev => ({ ...prev, countryCode: e.target.value }))
}

useEffect(() => {
  getCountries()
}, [])

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
              onChange={(e => e.target.value)}
              value={countryCode}
            />
            <FormControlCountry variant="standard">
            <InputLabel id="phonenumber" >Choose country</InputLabel>
            <Select
            variant="standard"
            labelId="phonenumber"
            id="phonenumber"
            label="Choose country"
            onChange={getCountryCode}
            value={countryCode}
            >
              {countryNames}
            </Select>
            </FormControlCountry>
          </div>
          <Input
            label="Area code"
            type="text"
            variant="standard"
            required
            onChange={e => setNewNumber(prev => ({ ...prev, areaCode: e.target.value }))}
            value={newNumber.areaCode}
          />
          <Input
            label="Extension"
            type="text"
            variant="standard"
            onChange={e => setNewNumber(prev => ({ ...prev, extension: e.target.value }))}
            value={newNumber.extension}
          />
          <Input
            label="Number"
            type="text"
            variant="standard"
            required
            onChange={e => setNewNumber(prev => ({ ...prev, number: e.target.value }))}
            value={newNumber.number}
          />
          <Input
            label="id"
            type="text"
            variant="standard"
            required
            onChange={e => setNewNumber(prev => ({ ...prev, id: e.target.value }))}
            value={newNumber.id}
          />
          <DialogActions>
            <Button onClick={addNewNumber}>Add</Button>
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