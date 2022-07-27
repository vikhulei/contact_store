import { useContext, useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Section, Form, Input, GreyButton } from "./styles/Style"
import { UserContext } from "./utils/UserContext";


const Login = () => {
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");

  const {setAuth } = useContext(UserContext)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post("https://interview.intrinsiccloud.net/auth/login", {
        password: pwd,
        username: user
      })
      if (resp.status === 200) {
        setPwd("");
        setUser("");
        navigate("/home")
        setAuth(true)
      }
    } catch (error) {
      alert(error)
    }
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