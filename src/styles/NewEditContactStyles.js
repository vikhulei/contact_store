import styled from "styled-components"
import { Section, Form, GreyButton } from "./GeneralStyles"


const Wrapper = styled(Form)`
  padding: 20px 10px 20px;
  text-align: left;
`

const SectionContacts = styled(Section) `
  min-height: 700px;
`

const AddNumberButton = styled(GreyButton) `
&& {
  margin: 50px 0 20px;
}
`

const ButtonsWrapper = styled.div `
&& {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: space-between;
  // top: 120%;
  bottom: 0;
}
`

const NumbersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`

export {Wrapper, SectionContacts, AddNumberButton, ButtonsWrapper, NumbersWrapper}