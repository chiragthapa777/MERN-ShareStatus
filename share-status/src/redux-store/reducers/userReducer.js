

const userReducer=(state=[], action)=>{
    switch (action.type) {
        case "GET_ALL_USERS":
            return[...action.users]
        case "GET_SINGLE_USER":
            return[action.users]
        default:
            return state
    }
}

export default userReducer