import { PostContext } from "../context/PostContext";
import React,{useState, useContext, useEffect} from "react";
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Profile from "../components/Profile"
import Posts from '../components/Posts'
import { UserContext } from "../context/UserContext";
import { useLocation, useParams } from "react-router-dom";

export default function VisitProfile() {
    const location= useLocation
    const {id}=useParams()
  const { userDetail, userList}=useContext(UserContext)
  const viewUser= userList.find((item)=>{return item._id==id})
  console.log(viewUser);
  
  const {getProfilePosts, profilePosts} = useContext(PostContext)
  useEffect(() => {
    getProfilePosts()
  }, [])
  return (
    <div>   
      <Navbar />
    <div className="HomePage">
        <div className="HomeFlex">
           <div className="Profileleft">
              <Profile userDetailProps={viewUser} />
            
            <Posts posts={profilePosts}/>

           </div>
            <Sidebar />
        </div>
    </div>
  </div>
  )
}
