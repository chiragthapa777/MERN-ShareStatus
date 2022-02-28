import jwtDecode from "jwt-decode"
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
        return initAuth
    
        default:
            return state;
    }
}

export default authReducer