import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Posts from "../components/Posts";
import Sidebar from "../components/Sidebar";
import { getHomePost } from "../redux-store/actions/postActions";

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
