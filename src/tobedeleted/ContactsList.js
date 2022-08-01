import { useState } from "react";
import { Section, Form, InputField, GreyButton, Select, MenuItem } from "../styles/Style"
import styled from "styled-components"
import { TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl"
import ContactDetails from "../pages/ContactDetails";
import NewContact from "../pages/NewContact"

// const fontColor = {
//   style: {color: "red"}
// }

// const DarkerDisabledTextField = styled(TextField) `
//     // pointer-events: none;
//     input:disabled {
//       font-weight: 900;
//     };
//     label {
//       font-weight: 900;
//       color: rgba(0,0,0,1) ;
//     }
// `

// const object = [
//   {id: 1,
//   value: "111111"},
//   {id: 2,
//   value: "222222"},
//   {id: 3,
//   value: "3333333"},
//   {id: 4,
//   value: "44444444"}
// ]

// const SectionContacts = styled(Section) `
//   height: 700px;
// `

// const Wrapper = styled(Form)`
//   padding: 20px 10px 20px;
//   text-align: left;
// `

// const SelectContact = styled(Select) `
//   margin-bottom: 50px;
// `

// const ContactFormControl = styled(FormControl) `

// `

// const ButtonsWrapper = styled.div `
//   display: flex;
//   margin-top: 50px;
//   justify-content: space-between;
// `







//   const [contactName, setContactName] = useState("")
//   const [check, setCheck] = useState(
//     {
//       name: "John Doe",
//       company: "PC",
//       email: "email@email.com",
//       phone: [
//         11111111,
//         2222222222
//       ]
//     })
//   const [edit, setEdit] = useState(false)
//   const [editButton, setEditButton] = useState("Edit")

//   const dataForSelect = 
//     object.map((val, inx) => {
//       return <MenuItem key={inx} value={val.value}>{val.value}</MenuItem>
//     })

//   const handleSelect = (e) => {
//     e.preventDefault();
//     setContactName(e.target.value)
//   }

const ContactsList = () => {

  return (
    <div></div>
    );
  }
  
  export default ContactsList

    // <SectionContacts>
    //   <h1>Contacts</h1>
    //   <Wrapper>
        {/* <ContactFormControl>

      <SelectContact
          onChange={handleSelect}
          value = {contactName}
          >
          {dataForSelect}

        </SelectContact>


        <InputField
          label="Name"
          type="text"
          variant="standard"
          readOnly
          onChange={(e) => edit ? setCheck(prev => ({...prev, name: e.target.value})) : null}
          value={check.name}
          />
          
      
        <InputField
          label="Company"
          type="text"
          variant="standard"
          readOnly
          onChange={(e) => edit ? setCheck(prev => ({...prev, company: e.target.value})) : null}
          value={check.company}
        />

        <InputField
          label="Email"
          type="text"
          variant="standard"
          readOnly
          onChange={(e) => edit ? setCheck(prev => ({...prev, email: e.target.value})) : null}
          value={check.email}
        />
        <InputField
          label="Phone Number(s)"
          type="text"
          variant="standard"
          readOnly
          onChange={(e) => edit ? setCheck(prev => ({...prev, phone: {...prev.phone, [0]: e.target.value} })) : null}
          value={check.phone[0]}
        />
         <InputField
          type="text"
          variant="standard"
          readOnly
          onChange={(e) => edit ? setCheck(prev => ({...prev, phone: {...prev.phone, [1]: e.target.value} })) : null}
          value={check.phone[1]}
        />
         <InputField
          type="text"
          variant="standard"
          readOnly
          onChange={(e) => edit ? setCheck(prev => ({...prev, phone: {...prev.phone, [2]: e.target.value} })) : null}
          value={check.phone[2] ? check.phone[2] : ""}
        />
  </ContactFormControl> */}
      {/* <NewContact */}
      // <ContactDetails 
      // handleSelect={handleSelect}
      // contactName={contactName}
      // dataForSelect={dataForSelect}
      // edit={edit}
      // check={check}
      // setCheck={setCheck}
      // />

        {/* <ButtonsWrapper>
        <GreyButton variant="contained" onClick={handleEdit} style={{"width": "90px"}}>{editButton}</GreyButton>
        <GreyButton variant="contained" onClick={handleCreate} style={{"width": "90px"}}>Create</GreyButton>
        <GreyButton variant="contained" style={{"width": "90px"}}>Delete</GreyButton>
        </ButtonsWrapper> */}
    //   </Wrapper>
    // </SectionContacts>
