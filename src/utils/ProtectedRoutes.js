import {Outlet, Navigate} from "react-router-dom"
import {useContext} from "react"
import { UserContext } from "./UserContext"

const ProtectedRoutes = () => {
    const {auth} = useContext(UserContext)
    return (
        auth ? <Outlet/> : <Navigate to="/"/>
    )
}

export default ProtectedRoutes