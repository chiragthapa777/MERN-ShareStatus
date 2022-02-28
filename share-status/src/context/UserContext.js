import { createContext, useState, useEffect } from "react";
import { PostContext } from "./PostContext";

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  useEffect(() => {
    getUserDetail()
    getUserList()
  },[localStorage.getItem("token")])
  const [userDetail, setUserDetail] = useState({name:"guest"})
  const [userList, setUserList] = useState([])

  const getUserList=async()=>{
    const response = await fetch(`http://localhost:2000/api/users/getallusers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
         localStorage.getItem('token'),
      },
    });
    const json = await response.json();    
    setUserList(json)
  }
  const getUserDetail=async()=>{
    const response = await fetch(`http://localhost:2000/api/auth/loggedinuser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
         localStorage.getItem('token'),
      },
    });
    const json = await response.json();    
    setUserDetail(json)
  }
  
  const updateUserBio=async(bio)=>{
    const response = await fetch(`http://localhost:2000/api/auth/updatebio`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
         localStorage.getItem('token'),
      },
      body: JSON.stringify({bio}),
    });
    const json = await response.json();    
    getUserDetail()
  }

  const updateFollow=async(id)=>{
    const response = await fetch(`http://localhost:2000/api/users/updatefollow/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
         localStorage.getItem('token'),
      }
    });
    const json = await response.json();    
    setUserDetail(json.meUser)
  }


  return (

    /**
     * logged in user detail
     * update user detail bio
     * users list(follow, unfollow, search list)
     */
    <UserContext.Provider value={{getUserList,getUserDetail,updateUserBio,updateFollow, userDetail,userList, setUserList  }}>
      {children}
    </UserContext.Provider>
  );
};
