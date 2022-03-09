
import React,{useEffect, useState} from "react";
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Profile from "../components/Profile"
import Posts from '../components/Posts'
import {useDispatch, useSelector} from "react-redux"
import { getUserPost } from "../redux-store/actions/postActions";

export default function ProfilePage() {
  const auth=useSelector(state=>state.auth)
  const posts=useSelector(state=>state.posts)
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(getUserPost())
  },[])
  
  return (
    <div>   
      <Navbar />
    <div className="HomePage">
        <div className="HomeFlex">
           <div className="Profileleft">
            <Profile user={auth}  />
            <Posts posts={{posts}}/>

           </div>
            <Sidebar />
        </div>
    </div>
  </div>
  )
}
