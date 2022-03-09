
import React from "react";
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Profile from "../components/Profile"
import Posts from '../components/Posts'
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";


export default function VisitProfile() {
  const{ profileId}=useParams()
  console.log(profileId);
  let {users}=useSelector(state=>state)

  let user=users.find(user=>user._id===profileId)
  console.log(user);
  

  
  
  return (
    <div>   
      <Navbar />
    <div className="HomePage">
        <div className="HomeFlex">
           <div className="Profileleft">
              <Profile user={user} />
            
            {/* <Posts posts={{}}/> */}

           </div>
            <Sidebar />
        </div>
    </div>
  </div>
  )
}
