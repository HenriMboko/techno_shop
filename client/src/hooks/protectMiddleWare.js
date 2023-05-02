import { useState, useEffect } from "react"
import { useSelector } from "react-redux"



export const UserAuthStatus = () => {


    const [loggedIn, setLoggedIn] = useState(false)
    const [checkUser, setCHeckUser] = useState(true)



    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if (user) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }

        setCHeckUser(false)

    }, [user])



    return { loggedIn, checkUser }
}

