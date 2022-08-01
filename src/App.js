import "./App.css"
import { Routes, Route, useNavigate } from 'react-router-dom';
import {useState} from "react"
import Login from "./Login"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import NewEditContact from "./pages/NewEditContact"
import ContactDetails from "./pages/ContactDetails"
import {UserContext} from "./utils/UserContext"
import ProtectedRoutes from "./utils/ProtectedRoutes"


const App = () => {
  
  const [auth, setAuth] = useState(false)
  const [password, setPassword] = useState("")
  const [token, setToken] = useState("")

  const navigate = useNavigate()


  return (
    <div className="App">
        <UserContext.Provider value={{auth, setAuth}}>
        <Routes>
          <Route exact path="/" element={<Login
          navigate={navigate}
          setToken={setToken}
          setPassword={setPassword}
          />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/home" element={<Home navigate={navigate}/>} />
            <Route path="/profile" element={<Profile
              navigate={navigate}
              token={token}
              password={password}
              />} />
            <Route path="/contacts" element={<ContactDetails navigate={navigate}/>} />
            <Route path="/newedit" element={<NewEditContact
              navigate={navigate}
              token={token}
              />} />
          </Route>
        </Routes>
        </UserContext.Provider>
    </div>
  );
}

export default App;
