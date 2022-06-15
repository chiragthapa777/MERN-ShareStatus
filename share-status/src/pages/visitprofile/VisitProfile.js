
import React, { useEffect } from "react";
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Profile from "../../components/profile/Profile"
import Posts from '../../components/posts/Posts'
import { useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import { getUserPost } from "../../redux-store/actions/postActions";
import { getSingleUser } from "../../redux-store/actions/userActions";
import "./visitprofile.css"


export default function VisitProfile() {
  
  const{ profileId}=useParams()
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(getSingleUser(profileId))
    dispatch(getUserPost(profileId))
  },[])
  let {users}=useSelector(state=>state)
  const posts = useSelector((state) => state.posts);
  let user=users[0]
  return (
    <div>   
    <Navbar />
    <div className="HomePage">
        <div className="HomeFlex">
           <div className="Profileleft">
             {
               user &&
            <Profile user={user} />
             }

            <Posts posts={{posts}}/>
           </div>
            <Sidebar />
        </div>
    </div>
  </div>
  )
}
