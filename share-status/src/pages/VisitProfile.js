
import React from "react";
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Profile from "../components/Profile"
import Posts from '../components/Posts'

export default function VisitProfile() {
  
  return (
    <div>   
      <Navbar />
    <div className="HomePage">
        <div className="HomeFlex">
           <div className="Profileleft">
              <Profile userDetailProps={{}} />
            
            <Posts posts={{}}/>

           </div>
            <Sidebar />
        </div>
    </div>
  </div>
  )
}
