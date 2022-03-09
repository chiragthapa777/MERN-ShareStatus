import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Users from "../components/Users";
import { getAllUser } from "../redux-store/actions/userActions";
import { useDispatch, useSelector } from "react-redux";

export default function Userpage() {
  let {users, auth}=useSelector(state=>state)

  users=users.filter(user=>{
    if(auth.id!==user._id){
      return user
    }
  })
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(getAllUser())
  },[])
  const [search, setSearch] = useState("");
  if(search!=="")
  {
    users=users.filter(user=>{
      if(user.name.includes(search)||user.email.includes(search))
      {
        return user
      }
    })
  }
  return (
    <div>
      <Navbar />
      <div className="HomePage">
        <div className="HomeFlex">
          <div className="Profileleft">
            <form className="userSearch">
              <div className="searchContainer">
                <button type="submit">
                  <i className="searchIcon fas fa-search"></i>
                </button>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  placeholder="Search Users"
                />
              </div>
            </form>
            {users.length!==0
            &&
            <Users users={users}/>
            }
          </div>
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
