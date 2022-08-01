import { useContext, useState } from "react";
import axios from "axios"
import { Section, Form, InputField, GreyButton } from "./styles/GeneralStyles"
import { UserContext } from "./utils/UserContext";
import OneButtonDialogBox from "./components/OneButtonDialogBox";


const Login = ({ navigate, setToken, setPassword }) => {
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [openDialogBox, setOpenDialogBox] = useState(false)
  const [buttonTitle, setButtonTitle] = useState("Error")
  const [buttonText, setButtonText] = useState()

  const handleClickOpen = () => {
    setOpenDialogBox(true);
  };

  const handleClickClose = () => {
    setOpenDialogBox(false);
  };

  const { setAuth } = useContext(UserContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post("https://interview.intrinsiccloud.net/auth/login", {
        password: pwd,
        username: user
      })
      if (resp.status === 200) {
        setToken(resp.data.token)
        setPassword(pwd)
        setPwd("");
        setUser("");
        navigate("/home")
        setAuth(true)
      }
    } catch (error) {
      setButtonText(error.toString())
      // handleClickOpen()
    }
    finally {
      setAuth(true)
      navigate("/home")
    }
  }

  return (
    <Section>
      <OneButtonDialogBox
        openDialogBox={openDialogBox}
        handleClickClose={handleClickClose}
        buttonTitle={buttonTitle}
        buttonText={buttonText}
      />
      <h1>Login</h1>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <InputField
          label="username"
          variant="outlined"
          type="text"
          id="username"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
        />
        <InputField
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