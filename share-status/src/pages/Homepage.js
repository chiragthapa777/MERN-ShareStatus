import React from 'react'
import Navbar from '../components/Navbar'
import Posts from '../components/Posts'
import Sidebar from '../components/Sidebar'
import { posts } from '../json'


export default function Homepage() {
  return (
    <>
    <Navbar />
    <div className="HomePage">
        <div className="HomeFlex">
          <Posts posts={posts}/>
            <Sidebar />
        </div>
    </div>
    </>
    
  )
}
