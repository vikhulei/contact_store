import { useState } from "react";
import axios from "axios"
import {Section, Form, Input, GreyButton} from "./styles/Style"

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
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Input
          label="username"
          variant="outlined"
          type="text"
          id="username"
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
        />
        <Input
          label="password"
          variant="outlined"
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />
        <GreyButton variant="contained" type="submit">Sign In</GreyButton>
      </Form>
    </Section>
  );
}

export default Login