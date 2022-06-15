import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  commentPost,
  deletePost,
  likePost,
} from "../../redux-store/actions/postActions";
import "./posts.css"


export default function PostCard({ post, setStatus }) {
  const auth=useSelector(state=>state.auth)
  const [comment, setComment] = useState("");
  const [openCmt, setOpenCmt] = useState(false);
  const dispatch = useDispatch();
  const { _id, userName, status, date, likes, comments,image } = post;
  const handleEdit = () => {
    setStatus({
      status,
      _id,
    });
    window.scrollTo({
      top: 400,
      left: 0,
      behavior: "smooth",
    });
  };
  const openComment = () => {
    setOpenCmt(!openCmt);
  };
  const handleDelete = () => {
    dispatch(deletePost(_id));
  };
  const handleLike = () => {
    dispatch(likePost(_id));
  };
  const handlePostComment = () => {
    dispatch(commentPost(comment, _id));

    setComment("");
  };
  const location = useLocation();
  return (
    <>
      <div className="PostCard">
        <div className="pcardTop">
          <div className="pcardUser">
            <img src="images/blank-profile-picture-gb100cda33_1280.png" alt=""/>
            <div className="pcardUserName">{userName}</div>
            </div>
          <div className="pcardDate">Posted : {Moment(date).fromNow()}</div>
        </div>
        {
          image?.url!=="" && (<img className="pcardImg" src={image?.url} alt="" />)
        }
           
        <div className="pcardStatus">{status}</div>
        <div className="pcardBottom">
          {/* likes */}
          <div className="card-like-cmt">

          <div
            className={`likes ${
              likes.includes(auth.id) && "likeActive"
            }`}
          >
            <i className="likeIcon fas fa-thumbs-up" onClick={handleLike}></i>
            <div className="likeCount">
              {likes.length} {likes.length > 1 ? "Likes" : "Like"}
            </div>
          </div>
          {/* comments */}
          <div className="comments" onClick={openComment}>
            <i className="commentIcon fa-solid fa-comment-dots"></i>
            <div className="likeCount">{comments.length} Comments</div>
          </div>
          </div>
          {/* edit actions */}
          {location.pathname === "/profile" && (
            <div className="cardButtons">
              <button className="button cardButton" onClick={handleEdit}>
                Edit
              </button>
              <button className="button cardButton" onClick={handleDelete}>
                Delete
              </button>
            </div>
          )}
        </div>
        <div className={`${!openCmt && "hideComment"} commentSection`}>
          <div className="commentList">
            {comments.length > 0
              ? comments.map((comment) => {
                  return (
                    <div key={comment._id} className="commentDisplay">
                      <div className="commenterName">
                        {comment.commenterName}
                      </div>
                      <div className="commentText">{comment.comment}</div>
                    </div>
                  );
                })
              : "No comments yet"}
          </div>
          <div className="commentPost">
            <input
              type="text"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              className="commentInput"
              placeholder="Write a comment..."
            />
            <div className="button" onClick={handlePostComment}>
              Post
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
