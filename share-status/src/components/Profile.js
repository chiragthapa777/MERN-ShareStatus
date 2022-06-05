import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { updateBio } from "../redux-store/actions/authAction";
import Users from "./Users";
import { followUnFollow } from "../redux-store/actions/authAction";


export default function Profile({ user }) {
  let [bio, setBio] = useState(user.bio);
  const dispatch = useDispatch();
  const { auth, users } = useSelector((state) => state);
  const [followState, setfollowState] = useState(auth.following.includes(user._id)?"unfollow":"follow")

  
  const handleFollowUnFollow=async ()=>{
    dispatch(followUnFollow(user._id))
    if(followState==="unfollow"){
      setfollowState("follow")
    }
    else{
      setfollowState("unfollow")
    }
  }

  const handleUpdateBio = () => {
    dispatch(updateBio(bio));
  };
  const location = useLocation();
  return (
    <>{user?(<div className="Profile">
    <div className="profileCard">
      <table className="profileDetail">
        <tbody>
          <tr>
            <th>Name</th>
            <td>{user.name}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{user.email}</td>
          </tr>
          <tr>
            <th>
              Bio
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
                readOnly={location.pathname !== "/profile" &&"true"}
                rows="5"
                placeholder="Write something....."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>
      {location.pathname !== "/profile" && (
        <button className="button" onClick={handleFollowUnFollow}>{followState}</button>
      )}
    </div>
    {location.pathname === "/user" ||
      (location.pathname === "/profile" && (
        <>
          <Users optOne={"Following"} users={users} />
          <Users optOne={"Follwed by"} users={users} />
        </>
      ))}
  </div>):<p>Loading...</p>}
      
    </>
  );
}
