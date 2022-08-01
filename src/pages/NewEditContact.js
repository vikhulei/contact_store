import { useState } from "react";
import { InputField, GreyButton } from "../styles/GeneralStyles"
import { Wrapper, SectionContacts, AddNumberButton, ButtonsWrapper, NumbersWrapper, Number } from "../styles/NewEditContactStyles"
import FormControl from "@mui/material/FormControl"
import AddPhoneNumber from "../components/AddPhoneNumber"

const contacts = {
  company: "PC",
  contactName: "John Doe",
  phoneNumbers: [
    {
      areaCode: "011",
      category: "HOME",
      countryCode: "11",
      extension: "1",
      id: "1",
      number: "1111111"
    },
    {
      areaCode: "022",
      category: "HOME",
      countryCode: "22",
      extension: "2",
      id: "2",
      number: "2222222"
    },
    {
      areaCode: "033",
      category: "HOME",
      countryCode: "33",
      extension: "3",
      id: "3",
      number: "3333333"
    }
  ],
  primaryEmailAddress: "jodoe@email.com"
}


const NewEditContact = ({ navigate }) => {

  const [check, setCheck] = useState(
    {
      name: "John Doe",
      company: "PC",
      email: "email@email.com",
      phone: [
        11111111,
        2222222222
      ]
    })
  const [edit, setEdit] = useState(false)

  const [openAddPhoneNumber, setOpenAddPhoneNumber] = useState(false)

  const handleClickOpen = () => {
    setOpenAddPhoneNumber(true);
  };

  const handleClickClose = () => {
    setOpenAddPhoneNumber(false);
  };

  return (
    <SectionContacts>
      <h1>Contacts</h1>
      <Wrapper>
        <FormControl>
          <AddPhoneNumber
            openAddPhoneNumber={openAddPhoneNumber}
            handleClickClose={handleClickClose}
          />
          <InputField
            label="Name"
            type="text"
            variant="standard"
            readOnly
            onChange={(e) => edit ? setCheck(prev => ({ ...prev, name: e.target.value })) : null}
            value={check.name}
          />
          <InputField
            label="Company"
            type="text"
            variant="standard"
            readOnly
            onChange={(e) => edit ? setCheck(prev => ({ ...prev, company: e.target.value })) : null}
            value={check.company}
          />
          <InputField
            label="Email"
            type="text"
            variant="standard"
            readOnly
            onChange={(e) => edit ? setCheck(prev => ({ ...prev, email: e.target.value })) : null}
            value={check.email}
          />
          <AddNumberButton variant="contained" onClick={handleClickOpen}>Add phone number</AddNumberButton>
          <NumbersWrapper>
            <Number>
              {contacts.phoneNumbers.map((val, idx) => {
                return <InputField
                  key={idx}
                  type="text"
                  variant="standard"
                  value={val.countryCode}
                />
              })}
            </Number>
            <Number>
              {contacts.phoneNumbers.map((val, idx) => {
                return <InputField
                  key={idx}
                  type="text"
                  variant="standard"
                  value={val.areaCode}
                />
              })}
            </Number>
            <Number>
              {contacts.phoneNumbers.map((val, idx) => {
                return <InputField
                  key={idx}
                  type="text"
                  variant="standard"
                  value={val.extension}
                />
              })}
            </Number>
            <Number>
              {contacts.phoneNumbers.map((val, idx) => {
                return <InputField
                  key={idx}
                  type="text"
                  variant="standard"
                  value={val.number}
                />
              })}
            </Number>
          </NumbersWrapper>
          <ButtonsWrapper>
            <GreyButton variant="contained" style={{ "width": "40%" }} onClick={(() => navigate(-1))}>Save</GreyButton>
            <GreyButton variant="contained" style={{ "width": "40%" }} onClick={(() => navigate(-1))}>Cancel</GreyButton>
          </ButtonsWrapper>
        </FormControl>
      </Wrapper>
    </SectionContacts>
  );
}

export default NewEditContact