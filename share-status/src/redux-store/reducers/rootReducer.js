import { combineReducers } from "redux";
import postReducer from "./postReducer";
import authReducer from "./authReducer"
import userReducer from "./userReducer";

const rootReducer= combineReducers({
    posts:postReducer,
    auth:authReducer,
    users:userReducer,
})
export default rootReducer