import jwtDecode from "jwt-decode"
import { toast } from "react-toastify"
const nameFunc=()=>{
    try {
        return jwtDecode(localStorage.getItem("token")).user.name
    } catch (error) {
        return null
    }
}
const idFunc=()=>{
    try {
        return jwtDecode(localStorage.getItem("token")).user.id
    } catch (error) {
        return null
    }
}
const initAuth={
    name:nameFunc(),
    id:idFunc()
}
const authReducer=(state=initAuth,action)=>{
    switch (action.type) {
        case "LOGOUT":
        return {
            name:null,
            id:null
        }
        case "REGISTER":
        case "LOGIN":  
            toast(`${action.token.data.message}`,{
                position: toast.POSITION.BOTTOM_RIGHT
            })
            return {
                name:nameFunc(),
                id:idFunc()
            }
        case "UPDATE_BIO":
            return{
                ...state,
                bio:action.bio
            }
        case "AUTH_USER":
            return{
                ...action.user.data,
                id:action.user.data._id
            }
        default:
            return state;
    }
}

export default authReducer