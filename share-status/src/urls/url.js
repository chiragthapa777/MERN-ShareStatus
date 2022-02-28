export const url="http://localhost:2000/api"

export const setHeaders=()=>{
    const header={
        headers:{
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem("token")
        }
    }
    return header
}