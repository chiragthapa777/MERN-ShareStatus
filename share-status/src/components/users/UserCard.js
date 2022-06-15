import React, {useEffect}  from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUnFollow } from "../../redux-store/actions/authAction";
import { Link } from "react-router-dom";
import "./users.css"



export default function UserCard({user}) {
  const dispatch=useDispatch()
  const auth=useSelector(state=>state.auth) 

  const handleFollow=()=>{
    dispatch(followUnFollow(user._id))
  }
 
  return (
    <tr className="UserCard">
      <td className="tableUserName">
        {user.name}
        <div className="tableUserEmail">
          {user.email}
        </div>
      </td>
      <td>
        <button className="button" onClick={handleFollow}>
          { 
            auth!==null &&
            auth.following.includes(user._id)?
            "Unfollow":
            "Follow"
          }
        </button>
      </td>
      <td>
        <button className="button" >
          <Link to={`/user/${user._id}`}>profile</Link>
          
        </button>
      </td>
    </tr>
  );
}
