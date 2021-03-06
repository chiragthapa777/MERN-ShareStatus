import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import AddPost from "./AddPost";
import PostCard from "./PostCard";
import "./posts.css"

export default function Posts(props) {
  const [status, setStatus] = useState({});
  let location = useLocation();
  const { posts } = props;
  const postArr = posts.posts;


  return (
    <div className="Posts">
      {
        new RegExp(`^/user`).test(location.pathname) ?"": (<AddPost setStatus={setStatus} status={status} />)
      }
      {/* <AddPost setStatus={setStatus} status={status} /> */}
      
      <div className="postList">
        {postArr.length > 0
          ? postArr.map((post) => {
              return (
                <PostCard post={post} key={post._id} setStatus={setStatus} />
              );
            })
          : "No post to show"}
      </div>
    </div>
  );
}
