import { url, setHeaders } from "../../urls/url";
import axios from "axios"
import {toast} from "react-toastify"



export const getUserPost=()=>{
    return(dispatch)=>{
        axios.get(`${url}/post/getuserpost`, setHeaders())
        .then((posts=>{
            dispatch({
                type: "GET_USER_POST",
                posts:posts.data
            })
        }))
        .catch(error=>{
            console.log(error.response.data)
            toast.error(error.response?.data.error,{
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
    }
}
export const addPost=(status)=>{
    return(dispatch)=>{
        axios.post(`${url}/post/addpost`,status, setHeaders())
        .then((post=>{
            console.log(post)
            dispatch({
                type: "ADD_POST",
                post
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

export const updatePost=(status, id)=>{
    return(dispatch)=>{
        axios.put(`${url}/post/updatepost/${id}`,{status}, setHeaders())
        .then((post=>{
            dispatch({
                type: "UPDATE_POST",
                post
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

export const deletePost=(id)=>{
    return(dispatch)=>{
        axios.delete(`${url}/post/deletepost/${id}`, setHeaders())
        .then((post=>{
            dispatch({
                type: "DELETE_POST",
                id,
                post
            })
        }))
        .catch(error=>{
            // console.log(error)
            toast.error(error.response?.data.error,{
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
    }
}
export const likePost=(id)=>{
    return(dispatch)=>{
        axios.patch(`${url}/post/like/${id}`,{}, setHeaders())
        .then((post=>{
            // const delId=post.data.post._id
            dispatch({
                type: "LIKE_POST",
                id,
                post
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
export const commentPost=(comment, id)=>{
    return(dispatch)=>{
        axios.patch(`${url}/post/commentadd/${id}`,{comment}, setHeaders())
        .then((post=>{
            dispatch({
                type: "COMMENT_POST",
                id,
                post
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



