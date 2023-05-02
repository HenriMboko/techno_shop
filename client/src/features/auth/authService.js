import axios from "axios"


const API_URL = "/api/users"

const API_Login = "/api/users/login"

const API_UPDATE = "/api/users/update_user"



const registerService = async (userData) => {

    const response = await axios.post(API_URL, userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data

}



const loginService = async (userData) => {
    const response = await axios.post(API_Login, userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}


const userProfile = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(API_URL, config);

    return response.data;
}

const updateUser = async (userData, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.put(API_UPDATE, config, userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}




const authService = {
    registerService,
    loginService,
    userProfile,
    updateUser
}



export default authService