import { useState } from "react";
import axios from "axios"
import { InputField, GreyButton, FormControlContacts } from "../styles/GeneralStyles"
import { Wrapper, SectionContacts, AddNumberButton, ButtonsWrapper, NumbersWrapper } from "../styles/NewEditContactStyles"
import AddPhoneNumber from "../components/AddPhoneNumber"



const NewEditContact = ({ navigate, token }) => {

  const [contact, setContact] = useState(
   {
  company: "",
  contactName: "",
  phoneNumbers: [
  ],
  primaryEmailAddress: ""
} 
  )

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

  const saveNumber = async (e) => {
    e.preventDefault();
    console.log(contact)
    try {
      const resp = await axios.post("https://interview.intrinsiccloud.net/contacts?name=user3",
      contact,
      { headers: {"Authorization" : `Bearer ${token}`} },
    )
    console.log(resp)
      if (resp.status === 200) {
        alert("all is good")
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

  const deleteNumber = (id) => {
    
    setContact(prev => ({...prev, phoneNumbers: contact.phoneNumbers.filter((val, ind) => ind !== id)}))
    console.log(contact.phoneNumbers)
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
              <GreyButton variant="contained" onClick={(e) => {
                e.preventDefault()
                deleteNumber(idx)
              }
                }
                style={{"margin": "0 0 10px 10px"}}
                >
                Delete
                </GreyButton>
              </div>
              }) : []}
            </NumbersWrapper>
          <ButtonsWrapper>
            <GreyButton variant="contained" style={{ "width": "40%" }} onClick={saveNumber}>Save</GreyButton>
            
            <GreyButton
            variant="contained"
            style={{ "width": "40%" }}
            onClick={
              // (() => console.log(contact))
              (() => navigate(-1))
            }
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