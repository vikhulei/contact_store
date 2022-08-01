import { useState } from "react";
import { MenuItem, InputField } from "../styles/GeneralStyles"
import { Wrapper, InputFormControl, ButtonsFormControl, SectionContacts, SelectContact, ButtonsWrapper, GreyButtonContacts } from "../styles/ContactDetailsStyles"
import TwoButtonsDialogBox from "../components/TwoButtonsDialogBox";

const object = [
  {
    id: 1,
    value: "111111"
  },
  {
    id: 2,
    value: "222222"
  },
  {
    id: 3,
    value: "3333333"
  },
  {
    id: 4,
    value: "44444444"
  }
]

const ContactDetails = ({ navigate }) => {

  const [contactName, setContactName] = useState("")
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
  const [openDialogBox, setOpenDialogBox] = useState(false)

  const handleClickOpen = () => {
    setOpenDialogBox(true);
  };

  const handleClickClose = () => {
    setOpenDialogBox(false);
  };

  const action = () => {
    alert("Contact deleted")
    handleClickClose()
  }

  const dataForSelect =
    object.map((val, inx) => {
      return <MenuItem key={inx} value={val.value}>{val.value}</MenuItem>
    })

  const handleSelect = (e) => {
    e.preventDefault();
    setContactName(e.target.value)
  }

  return (

    <SectionContacts>
      <TwoButtonsDialogBox
        openDialogBox={openDialogBox}
        handleClickClose={handleClickClose}
        action={action}
        buttonTitle="Delete"
        buttonText="Are you sure you want to delete this contact?"
      />
      <h1>Contacts</h1>
      <Wrapper>
        <InputFormControl>
          <SelectContact
            onChange={handleSelect}
            value={contactName}
          >
            {dataForSelect}
          </SelectContact>
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
          <InputField
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
          />
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