import React,{useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { updateBio } from "../redux-store/actions/authAction";
import Users from "./Users";

export default function Profile({bio, setBio}) {
  const dispatch=useDispatch()
 const auth=useSelector(state=>state.auth)
 
 const handleUpdateBio=()=>{
    dispatch(updateBio(bio))
 }
const location=useLocation()
  return (
    <>
      <div className="Profile">
        <div className="profileCard">
          <table className="profileDetail">
            <tr>
              <th>Name</th>
              <td>{auth.name}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{auth.email}</td>
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
                  onChange={e=>setBio(e.target.value)}
                ></textarea>
              </td>
            </tr>
          </table>
          {location.pathname !== "/profile" && (
            <button className="button" >
              follow
            </button>
          )}
        </div>
        <Users optOne={"Following"} />
        <Users optOne={"Follwed by"} />
      </div>
    </>
  );
}
