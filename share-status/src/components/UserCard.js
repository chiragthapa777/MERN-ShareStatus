import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";


export default function UserCard(props) {
  const navigate=useNavigate()
  const { userDetail, updateFollow } = useContext(UserContext);
  const { user } = props;
  const { _id, name, email, following, followedBy } = user;
  const handleFollow=()=>{
    updateFollow(_id)
  }
  const handleNavigate=()=>{
    navigate(`/user/${_id}`)
  }
  return (
    <tr className={`UserCard ${_id == userDetail._id && "displayNone"}`}>
      <td className="tableUserName">{name}</td>
      <td className="tableUserName">{email}</td>
      <td>
        <button className="button" onClick={handleFollow}>
          {userDetail.following.includes(_id) ? "Unfollow" : "follow"}
        </button>
      </td>
      <td>
        <button className="button" onClick={handleNavigate}>profile</button>
      </td>
    </tr>
  );
}
