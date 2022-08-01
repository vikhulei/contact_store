import styled from "styled-components"
import { Section, Form, GreyButton } from "./GeneralStyles"


const Wrapper = styled(Form)`
  padding: 20px 10px 20px;
  text-align: left;
`

const SectionContacts = styled(Section) `
  height: 700px;
`

const AddNumberButton = styled(GreyButton) `
&& {
  margin: 50px 0 20px;
}
`

const ButtonsWrapper = styled.div `
  display: flex;
  margin-top: 70px;
  // bottom: 0;
  justify-content: space-between;
`

const NumbersWrapper = styled.div`
  display: flex;
`

const Number = styled.div`
  display: block;
`

export {Wrapper, SectionContacts, AddNumberButton, ButtonsWrapper, NumbersWrapper, Number}