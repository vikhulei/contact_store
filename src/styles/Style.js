import styled from "styled-components"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const GreyButton = styled(Button) `
&& {
    background-color: #63738a;
}
`

const Input = styled(TextField) ``

const Section = styled.div`
position: absolute;
top: 100px;
margin-left: 50%;
padding-top: 10px;
transform: translateX(-50%);
width: 400px;
height: 500px;
background-color: #63738a;
`

const Form = styled.form`
  border: 2px black solid;
  width: 80%;
  height: 80%;
  margin: 20px auto;
  padding: 70px 10px 120px;
  background-color: #f2f3f7;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export {Section, Form, Input, GreyButton}