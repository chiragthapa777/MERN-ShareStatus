import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { updateBio } from "../redux-store/actions/authAction";
import Users from "./Users";

export default function Profile({user }) {
  const [bio, setBio] = useState(user.bio) 
  const dispatch = useDispatch();
  const { auth, users } = useSelector((state) => state);
  
  const handleUpdateBio = () => {
    dispatch(updateBio(bio));
  };
  const location = useLocation();
  return (
    <>
      <div className="Profile">
        <div className="profileCard">
          <table className="profileDetail">
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
                  rows="5"
                  placeholder="Write something....."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
              </td>
            </tr>
          </table>
          {location.pathname !== "/profile" && (
            <button className="button">follow</button>
          )}
        </div>
        {
          location.pathname==="/user" || location.pathname==="/profile"
          &&
          (
            <>
            <Users optOne={"Following"} users={users} />
          <Users optOne={"Follwed by"} users={users} />
            </>
            
          )
        }
          
      </div>
    </>
  );
}
