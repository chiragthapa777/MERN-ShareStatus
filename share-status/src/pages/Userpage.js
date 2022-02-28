import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Users from "../components/Users";

export default function Userpage() {
  const [search, setSearch] = useState("");

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
