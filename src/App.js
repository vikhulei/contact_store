import "./App.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {useState} from "react"
import Login from "./Login"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import ContactsList from "./pages/ContactsList"
import ContactDetails from "./pages/ContactDetails"
import {UserContext} from "./utils/UserContext"
import ProtectedRoutes from "./utils/ProtectedRoutes"


const App = () => {
  
  const [auth, setAuth] = useState(false)

  return (
    <div className="App">
      <Router>
        <UserContext.Provider value={{auth, setAuth}}>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/contacts" element={<ContactsList />} />
            <Route path="/details" element={<ContactDetails />} />
          </Route>
        </Routes>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
