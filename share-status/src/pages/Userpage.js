import React, { useState, useContext, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Users from "../components/Users";
import { UserContext } from "../context/UserContext";

export default function Userpage() {
  const { setUserList, userList, getUserList } = useContext(UserContext);
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (search === "") {
      getUserList();
    }
    const newarray = userList.filter((obj) => {
      if (obj.name.includes(search) || obj.email.includes(search)) return obj;
    });
    setUserList(newarray);
  }, [search]);

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
            <Users />
          </div>
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
