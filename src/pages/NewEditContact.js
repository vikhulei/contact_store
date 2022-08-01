import { useState } from "react";
import { InputField, GreyButton, FormControlContacts } from "../styles/GeneralStyles"
import { Wrapper, SectionContacts, AddNumberButton, ButtonsWrapper, NumbersWrapper } from "../styles/NewEditContactStyles"
import AddPhoneNumber from "../components/AddPhoneNumber"


const NewEditContact = ({ navigate, token }) => {

  const [contact, setContact] = useState({
    company: "",
    contactName: "",
    phoneNumbers: [
    ],
    primaryEmailAddress: ""

  })

  const [newNumber, setNewNumber] = useState ({
    areaCode: "",
    category: "HOME",
    countryCode: "",
    extension: "",
    id: "",
    number: ""
  })

  const [openAddPhoneNumber, setOpenAddPhoneNumber] = useState(false)

  const handleClickOpen = () => {
    setOpenAddPhoneNumber(true);
  };

  const handleClickClose = () => {
    setOpenAddPhoneNumber(false);
  };

  const addNewNumber = () => {
    contact.phoneNumbers.push(newNumber)
    handleClickClose()
  }

  const saveNumber = () => {
    console.log(contact)
  }

  const editNumber = (id) => {
    
    setContact(prev => ({...prev, phoneNumbers: contact.phoneNumbers.filter((val, ind) => ind !== id)}))
    console.log(contact.phoneNumbers)
    // let updatedPhoneNumbers = phoneNumbers.splice(id, 1)
    // setContact(prev => ({ ...prev, phoneNumbers: updatedPhoneNumbers }))
  }

  return (
    <SectionContacts>
      <h1>Contacts</h1>
      <Wrapper autoComplete="off">
        <FormControlContacts>
          <AddPhoneNumber
            openAddPhoneNumber={openAddPhoneNumber}
            handleClickClose={handleClickClose}
            token={token}
            newNumber={newNumber}
            setNewNumber={setNewNumber}
            addNewNumber={addNewNumber}
          />
          <InputField
            label="Name"
            type="text"
            variant="standard"
            autoComplete="off"
            onChange={(e) => setContact(prev => ({ ...prev, contactName: e.target.value }))}
            value={contact.contactName}
          />
          <InputField
            label="Company"
            type="text"
            variant="standard"
            readOnly
            onChange={(e) => setContact(prev => ({ ...prev, company: e.target.value }))}
            value={contact.company}
          />
          <InputField
            label="Email"
            type="text"
            variant="standard"
            onChange={(e) => setContact(prev => ({ ...prev, primaryEmailAddress: e.target.value }))}
            value={contact.primaryEmailAddress}
          />
          <AddNumberButton variant="contained" onClick={handleClickOpen}>Add phone number
          </AddNumberButton>

          <NumbersWrapper>
              {contact.phoneNumbers.map((val, idx) => {
                return <div key={idx}>
                <InputField
                  type="text"
                  variant="standard"
                  value={`(${val.countryCode}) ${val.areaCode}-${val.extension}-${val.number}`}
                />
              <GreyButton variant="contained" onClick={(e) => {
                e.preventDefault()
                editNumber(idx)}
                }
                style={{"margin": "0 0 10px 10px"}}
                >
                Delete
                </GreyButton>
              </div>
              })}
            </NumbersWrapper>
          <ButtonsWrapper>
            <GreyButton variant="contained" style={{ "width": "40%" }} onClick={saveNumber}>Save</GreyButton>
            <GreyButton variant="contained" style={{ "width": "40%" }} onClick={(() => navigate(-1))}>Cancel</GreyButton>
          </ButtonsWrapper>
        </FormControlContacts>
      </Wrapper>
    </SectionContacts>
  );
}

export default NewEditContact