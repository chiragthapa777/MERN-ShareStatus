import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { PostContext } from "../context/PostContext";

export default function PostCard(props) {



  const { deletePost, setEditContent, updateLike } = useContext(PostContext);

  let { post } = props;

  const timeFunc=(date1, date2)=>{
    let timeInterval=(date1-date2)/1000
  if(timeInterval<=60){
    return`few seconds ago`
  }
  else if(timeInterval<=60*10){
    return`few minutes ago`
  }
  else if(timeInterval<=60*60*12){
    return`few hours ago`
  }
 
  else if(timeInterval<=60*60*24){
    return`1 day ago`
  }
  else{
    return`on : ${post.date.slice(0,10)}`
  }
  }

  let timeText=timeFunc(new Date,new Date(post.date));
  
 

  let location = useLocation();
  const initLike=post.likes.includes("620b45e705ff97ec7297d73f")
  


  const [like, setLike] = useState(initLike);
  const [likeCount, setLikeCount] = useState(post.likes.length);

  const likeFunc = () => {
    updateLike(post._id)
    if(like===true){
      setLikeCount(likeCount - 1);
      setLike(!like);
    }
    else{
      setLike(!like);
      setLikeCount(likeCount + 1);
    }
  };

  const handleDelete = () => {
    deletePost(post._id);
  };
  const handleEdit = () => {
    setEditContent([{
      id:post._id,
      status:post.status,
    }])
  };
  return (
    <>
      <div className="PostCard">
        <div className="pcardTop">
          <div className="pcardUser">{post.userName}</div>
          <div className="pcardDate">Posted {timeText}</div>
        </div>
        <div className="pcardStatus">{post.status}</div>
        <div className="pcardBottom">
          <div className={`${like === true && "likeActive"} likes`}>
            <i className="likeIcon fas fa-thumbs-up" onClick={likeFunc}></i>
            <div className="likeCount">{likeCount} likes</div>
          </div>
          {location.pathname === "/profile" && (
            <div className="profileButton">
              <button className="button profileButton" onClick={handleEdit}>
                Edit
                </button>
              <button className="button profileButton" onClick={handleDelete}>
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
