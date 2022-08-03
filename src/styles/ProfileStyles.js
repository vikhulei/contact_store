import styled from "styled-components"
import { Section, Form, InputField, GreyButton } from "./GeneralStyles"


const SectionProfile = styled(Section)`
  height: 700px;
`

const Wrapper = styled(Form)`
  position: relative;
  padding: 30px 10px 30px;
`

const InputNames = styled(InputField)`
  width: 130px;
  pointer-events: none;
`

const InputContacts = styled(InputField)`
  pointer-events: none;
`

const PictureControlsWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 120px;
  height: 190px;
`

const PictureText = styled.p`
  font-size: 12px;
  font-style: italic;
  margin-bottom: 6px;
`

const PictureWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 80%;
  border: 1px solid black;
  background-color: #63738a;
  &: hover {
    cursor: pointer;
    box-shadow: 0px 0px 8px;
  }
`

const PictureInput = styled.input`
  position: absolute;
  line-height: 150px;
  width: 100%;
  opacity: 0;
  &: hover {
    cursor: pointer;
  }
  &::file-selector-button {
    &: hover {
      cursor: pointer;
    }
  }
`

const Picture = styled.img`
  width: 100%;
  object-fit: contain;
`

const ButtonsWrapper = styled.div`
  display: flex;
  margin-top: 30px;
  justify-content: space-between;
`

const UploadButton = styled(GreyButton)`
  position: absolute;
  top: 165px;
  // bottom: 0;
  width: 100%;
  height: 25px;
  `

  
export { InputField, GreyButton, SectionProfile, Wrapper, InputNames, InputContacts, PictureControlsWrapper, PictureText, PictureWrapper, PictureInput, Picture, ButtonsWrapper, UploadButton }