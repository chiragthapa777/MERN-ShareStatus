import React from "react";
import { useSelector } from "react-redux";
import "./sidebar.css"

export default function Sidebar() {
  const auth = useSelector((state) => state.auth);
  return (
    <div className="Sidebar">
      <img
        src="images/blank-profile-picture-gb100cda33_1280.png"
        alt="prfile"
      />
  <div>
  <div className="sidebarText">Name : {auth.name}</div>
      <div className="sidebarText">Email : {auth.email}</div>
      <div className="sidebarText">Bio :</div>
      <div className="sidebarBio">
        {auth.bio ? auth.bio : "update from profile"}
      </div>
  </div>
    </div>
  );
}
