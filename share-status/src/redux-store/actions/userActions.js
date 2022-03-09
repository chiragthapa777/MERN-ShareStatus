import { url, setHeaders } from "../../urls/url";
import axios from "axios"
import {toast} from "react-toastify"


export const getAllUser=()=>{
    return(dispatch)=>{
        axios.get(`${url}/users/getallusers`,setHeaders())
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