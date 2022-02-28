import { PostContext } from "../context/PostContext";
import React,{useState, useContext, useEffect} from "react";
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Profile from "../components/Profile"
import Posts from '../components/Posts'
import { UserContext } from "../context/UserContext";

export default function ProfilePage() {
  const { userDetail}=useContext(UserContext)
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
            <Profile userDetailProps={userDetail} />
            <Posts posts={profilePosts}/>

           </div>
            <Sidebar />
        </div>
    </div>
  </div>
  )
}
