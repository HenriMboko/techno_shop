import {Navigate, Outlet} from "react-router-dom"
import {UserAuthStatus} from "../hooks/protectMiddleWare"
import Spinner from "./Spinner"

const PrivateRouter = () => {

    const {loggedIn, checkUser} = UserAuthStatus()


    if(checkUser){
        return <Spinner />
    }

  return loggedIn ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRouter