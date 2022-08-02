import { useState, useEffect } from "react";
import axios from "axios";
import { MenuItem, InputField } from "../styles/GeneralStyles"
import { Wrapper, InputFormControl, ButtonsFormControl, SectionContacts, SelectContact, ButtonsWrapper, GreyButtonContacts } from "../styles/ContactDetailsStyles"
import DeleteContact from "../components/DeleteContact";


const ContactDetails = ({ navigate, token }) => {
  const [contacts, setContacts] = useState([])
  const [selectedContact, setSelectedContact] = useState()
  const [contactId, setContactId] = useState("")
  const [contactName, setContactName] = useState("")
  const [openDialogBox, setOpenDialogBox] = useState(false)


  const getContacts = async () => {
    try {
      const resp = await axios.get("https://interview.intrinsiccloud.net/contacts?name=user3",
        { headers: { "Authorization": `Bearer ${token}` } },
      )
      if (resp.status === 200) {
        setContacts(resp.data)
        setSelectedContact(contacts[0])
      }
    } catch (error) {
      alert(error.toString())
      // setButtonText(error.toString())
      // handleClickOpen()
    }
  }

  const handleClickOpen = () => {
    setOpenDialogBox(true);
  };

  const handleClickClose = () => {
    setOpenDialogBox(false);
  };

  const action = () => {
    getContacts()
    handleClickClose()
  }

  const dataForSelect =
    contacts.map((val, inx) => {
      return <MenuItem key={inx} value={val.id}>{val.contactName}</MenuItem>
    })

  const handleSelect = (e) => {
    e.preventDefault();
    const contact = contacts.filter(value => value.id === e.target.value)
    setSelectedContact(contact[0])
    setContactId(contact[0].id)
    setContactName(contact[0].contactName)
  }

  useEffect(() => {
    getContacts();
  }, [])

  return (

    <SectionContacts>
      <DeleteContact
        openDialogBox={openDialogBox}
        handleClickClose={handleClickClose}
        token={token}
        contactId={contactId}
        action={action}
        buttonTitle="Delete"
        buttonText={`Are you sure you want to delete ${contactName} from the database?`}
      />

      <h1>Contacts</h1>
      <Wrapper>
        <InputFormControl>
          <SelectContact
            onChange={handleSelect}
            value={selectedContact ? selectedContact.id : ""}
          >
            {dataForSelect}
          </SelectContact>
          <InputField
            label="Name"
            type="text"
            variant="standard"
            readOnly
            onChange={(e) => e.target.value}
            value={selectedContact ? selectedContact.contactName : ""}
          />
          <InputField
            label="Company"
            type="text"
            variant="standard"
            readOnly
            onChange={(e) => e.target.value}
            value={selectedContact ? selectedContact.company : ""}
          />
          <InputField
            label="Email"
            type="text"
            variant="standard"
            readOnly
            onChange={(e) => e.target.value}
            value={selectedContact ? selectedContact.primaryEmailAddress : ""}
          />

          <div>
            {selectedContact ? selectedContact.phoneNumbers.map((val, idx) => {
              return <div key={idx}>
              <InputField
                label="Phone number"
                type="text"
                variant="standard"
                value={val.phoneNumberFormatted}
              />
              </div>
            }) : null}
          </div>

          {/* <InputField
            label="Phone Number(s)"
            type="text"
            variant="standard"
            readOnly
            onChange={(e) => edit ? setCheck(prev => ({ ...prev, phone: { ...prev.phone, [0]: e.target.value } })) : null}
            value={check.phone[0]}
          />
          <InputField
            type="text"
            variant="standard"
            readOnly
            onChange={(e) => edit ? setCheck(prev => ({ ...prev, phone: { ...prev.phone, [1]: e.target.value } })) : null}
            value={check.phone[1]}
          />
          <InputField
            type="text"
            variant="standard"
            readOnly
            onChange={(e) => edit ? setCheck(prev => ({ ...prev, phone: { ...prev.phone, [2]: e.target.value } })) : null}
            value={check.phone[2] ? check.phone[2] : ""}
          /> */}
        </InputFormControl>
        <ButtonsFormControl>
          <ButtonsWrapper>
            <GreyButtonContacts variant="contained" onClick={(() => navigate("/newedit"))}>Edit</GreyButtonContacts>
            <GreyButtonContacts variant="contained" onClick={handleClickOpen}>Delete</GreyButtonContacts>
          </ButtonsWrapper>
          <ButtonsWrapper>
            <GreyButtonContacts variant="contained" onClick={(() => navigate("/newedit"))}>Add New</GreyButtonContacts>
            <GreyButtonContacts variant="contained" onClick={(() => navigate(-1))}>Go Back</GreyButtonContacts>
          </ButtonsWrapper>
        </ButtonsFormControl>
      </Wrapper>
    </SectionContacts>
  );
}

export default ContactDetails