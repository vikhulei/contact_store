import { useState, useEffect } from "react";
import axios from "axios";
import { MenuItem, InputField } from "../styles/GeneralStyles"
import { Wrapper, InputFormControl, ButtonsFormControl, SectionContacts, SelectContact, ButtonsWrapper, GreyButtonContacts } from "../styles/ContactDetailsStyles"
import DeleteContact from "../components/DeleteContact";


const ContactDetails = ({ navigate, token, contact, setContact, user, contactId, setContactId, setIsAddNew }) => {
  const [contacts, setContacts] = useState([])
  const [selectedContact, setSelectedContact] = useState()
  const [contactName, setContactName] = useState("")
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)


  const getContacts = async () => {
    try {
      const resp = await axios.get("https://interview.intrinsiccloud.net/contacts",
        {
          params: { name: user },
          headers: { "Authorization": `Bearer ${token}` }
        },
      )
      if (resp.status === 200) {
        setContacts(resp.data)
        setSelectedContact(null)
      }
    } catch (error) {
      alert(error.toString())
      // setButtonText(error.toString())
      // handleClickOpen()
    }
  }

  const handleDeleteDialogOpen = () => {
    if (!selectedContact) {
      alert("select contact first")
      return
    }
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  const deleteAction = () => {
    getContacts()
    handleDeleteDialogClose()
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

  const addNewContact = () => {
    setContact({
      company: "",
      contactName: "",
      phoneNumbers: [
      ],
      primaryEmailAddress: ""
    })
    setIsAddNew(true)
    navigate("/newedit");
  }

  const editContact = () => {
    if (!selectedContact) {
      alert("select contact first")
      return
    }
    const numbersInArray = selectedContact.phoneNumbers.map((val) => val.phoneNumberFormatted.split("-") + "," + val.id + "," + val.category)
    const hashtagReplaced = numbersInArray.map(val => val.replace("#", ","))
    const numbersExtracted = hashtagReplaced.map(val => val.split(","))
    const phoneNumbersPopulated = []
    for (let i = 0; i < numbersExtracted.length; i++) {
      phoneNumbersPopulated.push({ countryCode: numbersExtracted[i][0], areaCode: numbersExtracted[i][1], number: numbersExtracted[i][2], extension: numbersExtracted[i][3], id: numbersExtracted[i][4], category: numbersExtracted[i][5] })
    }

    setContact({
      company: selectedContact.company,
      contactName: selectedContact.contactName,
      phoneNumbers: phoneNumbersPopulated,
      primaryEmailAddress: selectedContact.primaryEmailAddress
    })
    setIsAddNew(false)
    navigate("/newedit");
  }


  useEffect(() => {
    getContacts();
  }, [])

  return (

    <SectionContacts>
      <DeleteContact
        openDialogBox={openDeleteDialog}
        handleClickClose={handleDeleteDialogClose}
        token={token}
        contactId={contactId}
        deleteAction={deleteAction}
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

        </InputFormControl>
        <ButtonsFormControl>
          <ButtonsWrapper>
            <GreyButtonContacts variant="contained"
              onClick={editContact}
            >Edit</GreyButtonContacts>
            <GreyButtonContacts variant="contained" onClick={handleDeleteDialogOpen}>Delete</GreyButtonContacts>
          </ButtonsWrapper>
          <ButtonsWrapper>
            <GreyButtonContacts variant="contained" onClick={addNewContact}>Add New</GreyButtonContacts>
            <GreyButtonContacts variant="contained" onClick={(() => navigate(-1))}>Go Back</GreyButtonContacts>
          </ButtonsWrapper>
        </ButtonsFormControl>
      </Wrapper>
    </SectionContacts>
  );
}

export default ContactDetails