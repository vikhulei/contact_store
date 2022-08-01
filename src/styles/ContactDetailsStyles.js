import styled from "styled-components"
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Section, Form, GreyButton } from "./GeneralStyles"

const Wrapper = styled(Form)`
  padding: 20px 10px 20px;
  text-align: left;
`

const InputFormControl = styled(FormControl)`
`

const ButtonsFormControl = styled(FormControl)`
  top: -20px;
`

const SectionContacts = styled(Section)`
  height: 700px;
`

const SelectContact = styled(Select)`
&& {
  height: 32px;
  margin-bottom: 50px;
}
`

const ButtonsWrapper = styled.div`
&& {
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
}
`

const GreyButtonContacts = styled(GreyButton)`
  width: 40%
`

export { Wrapper, InputFormControl, ButtonsFormControl, SectionContacts, SelectContact, ButtonsWrapper, GreyButtonContacts }