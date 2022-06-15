import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/navbar/Navbar";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import { getHomePost } from "../../redux-store/actions/postActions";
import "./homepage.css"

export default function Homepage() {
  useEffect(() => {
    dispatch(getHomePost());
  }, []);
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  return (
    <>
      <Navbar />
      <div className="HomePage">
        <div className="HomeFlex">
          <Posts posts={{posts}} />
          <Sidebar />
        </div>
      </div>
    </>
  );
}
