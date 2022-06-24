import { url, setHeaders } from "../../urls/url";
import axios from "axios"
import {toast} from "react-toastify"


export const authLogin=(creds)=>{
    return(dispatch)=>{
        axios.post(`${url}/auth/login`,creds)
        .then((token=>{
            localStorage.setItem("token", token.data.authtoken)
            dispatch({
                type:"TOGGLE_LOADER",
                status:false
            })
            dispatch({
                type: "LOGIN",
                token
            })
        }))
        .catch(error=>{
            dispatch({
                type:"TOGGLE_LOADER",
                status:false
            })
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
                type:"TOGGLE_LOADER",
                status:false
            })
            dispatch({
                type: "REGISTER",
                token
            })
        }))
        .catch(error=>{
            dispatch({
                type:"TOGGLE_LOADER",
                status:false
            })
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
                type:"TOGGLE_LOADER",
                status:false
            })
            dispatch({
                type:"AUTH_USER",
                user
            })
        })
        .catch(error=>{
            dispatch({
                type:"TOGGLE_LOADER",
                status:false
            })
            console.log(error);
        })
    }
}
export const updateBio=(bio,image)=>{
    let body={}
    if(bio){
        body.bio=bio
    }
    if(image){
        body.image=image
    }
    console.log(body)
    return(dispatch)=>{
        axios.put(`${url}/auth/updatebio`,body,setHeaders())
        .then(user=>{
            dispatch({
                type:"UPDATE_BIO",
                bio,
                image:image
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
export const loaderToggle=(status)=>{
    return(dispatch)=>{
            dispatch({
                    type:"TOGGLE_LOADER",
                    status
            })
    }
}
