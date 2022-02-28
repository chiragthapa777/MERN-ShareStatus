import { url } from "../../urls/url";
import axios from "axios"
import {toast} from "react-toastify"


export const authLogin=(creds)=>{
    return(dispatch)=>{
        axios.post(`${url}/auth/login`,creds)
        .then((token=>{
            localStorage.setItem("token", token.data.authtoken)
            dispatch({
                type: "LOGIN",
                token
            })
        }))
        .catch(error=>{
            console.log(error)
            toast.error(error.response?.data.error,{
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
    }
}
export const authRegister=(creds)=>{
    return(dispatch)=>{
        axios.post(`${url}/auth/register`,creds)
        .then((token=>{
            localStorage.setItem("token", token.data.authtoken)
            dispatch({
                type: "REGISTER",
                token
            })
        }))
        .catch(error=>{
            console.log(error)
            toast.error(error.response?.data.error,{
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
    }
}
export const authLogout=(creds)=>{
    return(dispatch)=>{
        localStorage.removeItem("token")
        dispatch({
            type:"LOGOUT"
        })
    }
}