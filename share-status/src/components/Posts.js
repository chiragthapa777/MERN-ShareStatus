import { PostContext } from "../context/PostContext";
import React,{useState, useContext, useEffect} from "react";
import {v4} from "uuid"
import AddPost from './AddPost'
import PostCard from "./PostCard"

export default function Posts(props) {
  let {posts}=props
  
  return (
    <div className="Posts">
      <AddPost />
      <div className="postList">
        {posts.length===0?<h2>no posts to show</h2>:posts.map((post)=><PostCard key={v4()} post={post}/>) }
        
      </div>
    </div>
  )
}
