import React from "react";
import {useDispatch} from "react-redux"
import { addPost } from "../redux-store/actions/postActions";
import { updatePost } from "../redux-store/actions/postActions";

export default function AddPost({ status, setStatus }) {
  const dispatch=useDispatch()
  const handlePost=e=>{
    e.preventDefault()
    if(status._id){
      dispatch(updatePost(status.status, status._id))
    }
    else{

      dispatch(addPost(status))
    }
    setStatus({status:""})
  }
  return (
    <div className="Addpost">
      <form action="" className="addPostForm">
        <h3>
          <span>Chirag</span>, update your status
        </h3>
        <textarea
          rows="3"
          value={status.status}
          onChange={(e) => setStatus({...status, status:e.target.value})}
          placeholder="Write something....."
        ></textarea>
        <button type="submit" className="button" onClick={handlePost}>
          {status._id?"Edit":"Post"}
        </button>
      </form>
    </div>
  );
}
