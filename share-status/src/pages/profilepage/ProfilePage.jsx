
import React,{useEffect, useState} from "react";
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Profile from "../../components/profile/Profile"
import Posts from '../../components/posts/Posts'
import {useDispatch, useSelector} from "react-redux"
import { getUserPost } from "../../redux-store/actions/postActions";
import "./profilepage.css"
import { authUser, loaderToggle } from "../../redux-store/actions/authAction";
import Loader from "../../components/loader/Loader";

export default function ProfilePage() {
  useEffect(()=>{
    dispatch(loaderToggle(true))
    dispatch(getUserPost())
    dispatch(authUser())
  },[])
  const auth=useSelector(state=>state.auth)
  const posts=useSelector(state=>state.posts)
  const dispatch=useDispatch()
  
  return (
  <>
      {
      auth.toggleLoader?"Loading":
      (
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
  
  </>
    

  )
}
