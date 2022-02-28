import React,{useContext, useEffect} from 'react'
import Navbar from '../components/Navbar'
import Posts from '../components/Posts'
import Sidebar from '../components/Sidebar'
import { PostContext } from '../context/PostContext'



export default function Homepage() {
  const {homePosts, getHomePosts} = useContext(PostContext)
  useEffect(()=>{
    getHomePosts()
  },[])
  return (
    <>
    <Navbar />
    <div className="HomePage">
        <div className="HomeFlex">
          <Posts posts={homePosts}/>
            <Sidebar />
        </div>
    </div>
    </>
    
  )
}
