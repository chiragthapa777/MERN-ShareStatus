import { url, setHeaders } from "../../urls/url";
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
export const authLogout=()=>{
    return(dispatch)=>{
        localStorage.removeItem("token")
        dispatch({
            type:"LOGOUT"
        })
    }
}
export const authUser=()=>{
    return(dispatch)=>{
        axios.get(`${url}/auth/loggedinuser`,setHeaders())
        .then(user=>{
            dispatch({
                type:"AUTH_USER",
                user
            })
        })
        .catch(error=>{
            console.log(error);
        })
    }
}
export const updateBio=(bio)=>{
    return(dispatch)=>{
        axios.put(`${url}/auth/updatebio`,{bio},setHeaders())
        .then(user=>{
            dispatch({
                type:"UPDATE_BIO",
                bio
            })
        })
        .catch(error=>{
            toast.error(error.response?.data.error,{
                position: toast.POSITION.BOTTOM_RIGHT
            })
            console.log(error);
        })
    }
}
export const followUnFollow=(id)=>{
    return(dispatch)=>{
        axios.put(`${url}/users/updatefollow/${id}`,{},setHeaders())
        .then(user=>{
            console.log(user.data.meUser);
            dispatch({
                type:"FOLLOW",
                user
            })
        })
        .catch(error=>{
            toast.error(error.response?.data.error,{
                position: toast.POSITION.BOTTOM_RIGHT
            })
            console.log(error);
        })
    }
}
