import { useState } from "react";
import styled from "styled-components"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios"

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

const Login = () => {
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await axios.post("https://interview.intrinsiccloud.net/auth/login", {
      password: pwd,
      username: user
    })
    console.log(resp.data)
    setPwd("");
    setUser("");
  }

  return (
    <Section>
      <h1>Sign In</h1>
      <Form onSubmit={handleSubmit}>
        <TextField
          label="username"
          variant="outlined"
          type="text"
          id="username"
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
        />
        <TextField
          label="password"
          variant="outlined"
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />
        <Button variant="contained" type="submit" style={{ "backgroundColor": "#63738a" }}>Sign In</Button>
      </Form>
    </Section>
  );
}

export default Login