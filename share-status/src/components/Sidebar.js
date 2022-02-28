import React,{useContext} from 'react'
import { UserContext } from '../context/UserContext'

export default function Sidebar() {
  const {userDetail}=useContext(UserContext)
  
 const {name, email, bio}=userDetail
  
  return (
    <div className="Sidebar">
      <div className="sidebarText">
        User: {name}
      </div>
      <div className="sidebarText">
        Email: {email}
      </div>
      <div className="sidebarText">
        Bio:
      </div>
      <div className="sidebarBio">
        {bio==null||bio.length==0?"Update your bio from profile":bio}
      </div>
    </div>
  )
}
