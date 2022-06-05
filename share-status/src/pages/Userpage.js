import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Users from "../components/Users";
import { getAllUser } from "../redux-store/actions/userActions";
import { useDispatch, useSelector } from "react-redux";

export default function Userpage() {
  const [query, setquery] = useState("")
  let {users, auth}=useSelector(state=>state)
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(getAllUser())
  },[])
  const handleSearch=(e)=>{
    e.preventDefault()
    dispatch(getAllUser(query))
  }
  return (
    <div>
      <Navbar />
      <div className="HomePage">
        <div className="HomeFlex">
          <div className="Profileleft">
            <form className="userSearch">
              <div className="searchContainer">
                <button type="submit" onClick={(e)=>{handleSearch(e)}}>
                  <i className="searchIcon fas fa-search"></i>
                </button>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setquery(e.target.value)
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
