import { url, setHeaders } from "../../urls/url";
import axios from "axios"
import {toast} from "react-toastify"


export const getAllUser=(query)=>{
    return(dispatch)=>{
        let q=query?`?search=${query}`:""
        axios.get(`${url}/users/getallusers${q}`,setHeaders())
        .then(users=>{
            dispatch({
                type:"GET_ALL_USERS",
                users:users.data
            })
        })
        .catch(error=>{
            console.log(error)
            toast.error(error.response?.data.error,{
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
    }
}

export const getSingleUser=(id)=>{
    return(dispatch)=>{
        axios.get(`${url}/users/getsingleuser/${id}`,setHeaders())
        .then(users=>{
            // toast.success("success")
            dispatch({
                type:"GET_SINGLE_USER",
                users:users.data
            })
        })
        .catch(error=>{
            console.log(error)
            toast.error(error.response?.data.error,{
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
    }
}