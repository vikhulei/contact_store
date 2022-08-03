import { useState } from "react";
import axios from "axios"
import { InputField, GreyButton, FormControlContacts } from "../styles/GeneralStyles"
import { Wrapper, SectionContacts, AddNumberButton, ButtonsWrapper, NumbersWrapper } from "../styles/NewEditContactStyles"
import AddPhoneNumber from "../components/AddPhoneNumber"



const NewEditContact = ({ navigate, token, contact, setContact, user, contactId, isAddNew }) => {

  const [newNumber, setNewNumber] = useState({
    areaCode: "",
    category: "HOME",
    countryCode: "",
    extension: "",
    id: "",
    number: ""
  })

  const [openAddPhoneNumber, setOpenAddPhoneNumber] = useState(false)
  const [phoneNumberFormatted, setPhoneNumberFormatted] = useState()

  const handleClickOpen = () => {
    setOpenAddPhoneNumber(true);
  };

  const handleClickClose = () => {
    setOpenAddPhoneNumber(false);
  };

  const addNewNumber = () => {
    contact.phoneNumbers.push(newNumber)
    setPhoneNumberFormatted(`${newNumber.countryCode}-${newNumber.areaCode}-${newNumber.number}#${newNumber.extension}`)
    handleClickClose()
  }

  const saveButton = () => {
    isAddNew ? saveContact() : editContact()
  }

  const saveContact = async () => {
    try {
      const resp = await axios.post("https://interview.intrinsiccloud.net/contacts",
        contact,
        {
          params: { name: user },
          headers: { "Authorization": `Bearer ${token}` }
        },
      )
      if (resp.status === 200) {
        alert("Changes saved")
        setContact({
          company: "",
          contactName: "",
          phoneNumbers: [
          ],
          primaryEmailAddress: ""
        })
      }
    } catch (error) {
      alert(error.toString())
      // setButtonText(error.toString())
      // handleClickOpen()
    }
  }

  const editContact = async () => {
    try {
      const resp = await axios.put(`https://interview.intrinsiccloud.net/contacts/${contactId}`,
        contact,
        {
          params: { name: user },
          headers: { "Authorization": `Bearer ${token}` }
        },
      )
      if (resp.status === 200) {
        alert("Changes saved")
        setContact({
          company: "",
          contactName: "",
          phoneNumbers: [
          ],
          primaryEmailAddress: ""
        })
        navigate(-1)
      }
    } catch (error) {
      alert(error.toString())
      // setButtonText(error.toString())
      // handleClickOpen()
    }
  }

  const deleteNumber = (id) => {
    setContact(prev => ({ ...prev, phoneNumbers: contact.phoneNumbers.filter((val, ind) => ind !== id) }))
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
            phoneNumberFormatted={phoneNumberFormatted}
            setPhoneNumberFormatted={setPhoneNumberFormatted}
          />
          <InputField
            label="Name"
            type="text"
            variant="standard"
            autoComplete="off"
            onChange={(e) => setContact(prev => ({ ...prev, contactName: e.target.value }))}
            value={contact ? contact.contactName : ""}
          />
          <InputField
            label="Company"
            type="text"
            variant="standard"
            readOnly
            onChange={(e) => setContact(prev => ({ ...prev, company: e.target.value }))}
            value={contact ? contact.company : ""}
          />
          <InputField
            label="Email"
            type="text"
            variant="standard"
            onChange={(e) => setContact(prev => ({ ...prev, primaryEmailAddress: e.target.value }))}
            value={contact ? contact.primaryEmailAddress : ""}
          />
          <AddNumberButton variant="contained" onClick={handleClickOpen}>Add phone number
          </AddNumberButton>

          <NumbersWrapper>
            {contact ? contact.phoneNumbers.map((val, idx) => {
              return <div key={idx}>
                <InputField
                  type="text"
                  variant="standard"
                  value={`(${val.countryCode}) ${val.areaCode}-${val.extension}-${val.number}`}
                />
                <GreyButton
                  variant="contained"
                  onClick={(e) => {
                    e.preventDefault()
                    deleteNumber(idx)
                  }}
                  style={{ "margin": "0 0 10px 10px" }}>
                  Delete
                </GreyButton>
              </div>
            }) : []}
          </NumbersWrapper>
          <ButtonsWrapper>
            <GreyButton
              variant="contained"
              style={{ "width": "40%" }}
              onClick={saveButton}>
              Save
            </GreyButton>

            <GreyButton
              variant="contained"
              style={{ "width": "40%" }}
              onClick={(() => navigate(-1))}
            >
              Cancel
            </GreyButton>
          </ButtonsWrapper>
        </FormControlContacts>
      </Wrapper>
    </SectionContacts>
  );
}

export default NewEditContact