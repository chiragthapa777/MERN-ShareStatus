import { toast } from "react-toastify"

const postReducer=(state=[], action)=>{
    switch (action.type) {
        case "GET_HOME_POST":
        case "GET_USER_POST":
            return[...action.posts]
        case "ADD_POST":
            toast.success(`${action.post.data.message}`,{
                position: toast.POSITION.TOP_RIGHT
            })
            return[action.post.data.post, ...state]
        case "UPDATE_POST":
            toast.success(`${action.post.data.message}`,{
                position: toast.POSITION.TOP_RIGHT
            })
            return state.map((post)=>
            post._id === action.post.data.post._id ? action.post.data.post : post
        )
        case "LIKE_POST":
            return state.map((post)=>
            post._id === action.post.data.post._id ? action.post.data.post : post
        )
        case "COMMENT_POST":
            return state.map((post)=>
            post._id === action.post.data.post._id ? action.post.data.post : post
        )
        case "DELETE_POST":
            toast.success(`${action.post.data.message}`,{
                position: toast.POSITION.TOP_RIGHT
            })
            return state.filter((post)=>
            post._id !== action.id
        )
        default:
            return state
    }
}

export default postReducer