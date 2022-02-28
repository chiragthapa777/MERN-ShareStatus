import React, { useState, useContext, useEffect } from "react";
import Users from "./Users";
import { PostContext } from "../context/PostContext";
import { UserContext } from "../context/UserContext";
import { useLocation } from "react-router-dom";

export default function Profile(props) {
  const location = useLocation();
  const { userDetailProps } = props;
  const { name, email, bio } = userDetailProps;
  const { updateUserBio, userDetail,updateFollow } = useContext(UserContext);
  const { getProfilePosts, ProfilePosts } = useContext(PostContext);

  const [Bio, setBio] = useState(userDetail.bio);
  useEffect(() => {
    setBio(bio);
  }, [bio]);

  useEffect(() => {
    getProfilePosts();
  }, []);

  const handleUpdateBio = () => {
    updateUserBio(Bio);
  };
  const handlefollow=()=>{
    updateFollow(userDetailProps._id)
  }

  return (
    <>
      <div className="Profile">
        <div className="profileCard">
          <table className="profileDetail">
            <tr>
              <th>Name</th>
              <td>{name}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{email}</td>
            </tr>
            <tr>
              <th>
                Bio{" "}
                <button
                  className={`button ${
                    location.pathname !== "/profile" && "displayNone"
                  }`}
                  onClick={handleUpdateBio}
                >
                  save
                </button>
              </th>
              <td>
                <textarea
                  value={Bio}
                  rows="5"
                  onChange={(e) => {
                    setBio(e.target.value);
                  }}
                  placeholder="Write something....."
                ></textarea>
              </td>
            </tr>
          </table>
          {location.pathname !== "/profile" && (
            <button className="button" onClick={handlefollow}>
              {userDetail.following.includes(userDetailProps._id)
                ? "Unfollow"
                : "follow"}
            </button>
          )}
        </div>
        <Users optOne={"Following"} />
        <Users optOne={"Follwed by"} />
      </div>
    </>
  );
}
