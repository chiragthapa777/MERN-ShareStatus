import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import { authUser } from "../actions/authAction";
import { url, setHeaders } from "../../urls/url";
import axios from "axios";

const nameFunc = () => {
  try {
    return jwtDecode(localStorage.getItem("token")).user.name;
  } catch (error) {
    return null;
  }
};
const idFunc = () => {
  try {
    return jwtDecode(localStorage.getItem("token")).user.id;
  } catch (error) {
    return null;
  }
};
const emailFunc = () => {
  try {
    return jwtDecode(localStorage.getItem("token")).user.email;
  } catch (error) {
    return null;
  }
};
const followingFunc = () => {
  try {
    return jwtDecode(localStorage.getItem("token")).user.following;
  } catch (error) {
    return null;
  }
};
const followedByFunc = () => {
  try {
    return jwtDecode(localStorage.getItem("token")).user.followedBy;
  } catch (error) {
    return null;
  }
};
const bioFunc = () => {
  try {
    return jwtDecode(localStorage.getItem("token")).user.bio;
  } catch (error) {
    return null;
  }
};

let initAuth = {
  name: nameFunc(),
  id: idFunc(),
  email: emailFunc(),
  following: followingFunc(),
  followedBy: followedByFunc(),
  bio: bioFunc(),
};

const authReducer = (state = initAuth, action) => {
  switch (action.type) {
    case "LOGOUT":
      return {
        name: null,
        id: null,
      };
    case "REGISTER":
    case "LOGIN":
      toast(`${action.token.data.message}`, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return {
        name: nameFunc(),
        id: idFunc(),
        email: emailFunc(),
        following: followingFunc(),
        followedBy: followedByFunc(),
        bio: bioFunc(),
      };
    // return getInitialState()
    case "UPDATE_BIO":
      return {
        ...state,
        bio: action.bio,
      };
    case "FOLLOW":
      return {
        ...state,
        following: action.user.data.meUser.following,
      };
    case "AUTH_USER":
      return {
        ...action.user.data,
        id: action.user.data._id,
      };
    default:
      return state;
  }
};

export default authReducer;
