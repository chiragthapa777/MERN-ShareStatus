import React from 'react'
import { useSelector } from 'react-redux'


export default function Sidebar() {
  const auth=useSelector(state=>state.auth)
  return (
    <div className="Sidebar">
      <div className="sidebarText">
        Name : {auth.name}
      </div>
      <div className="sidebarText">
        Email : {auth.email}
      </div>
      <div className="sidebarText">
        Bio : 
      </div>
      <div className="sidebarBio">
      {auth.bio?auth.bio:"update from profile"}
      </div>
    </div>
  )
}
