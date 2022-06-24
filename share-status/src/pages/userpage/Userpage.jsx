import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Users from "../../components/users/Users";
import { getAllUser } from "../../redux-store/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import "./userpage.css"

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
  console.log(users)
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
