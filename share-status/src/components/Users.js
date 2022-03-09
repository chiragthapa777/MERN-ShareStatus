import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import UserCard from "./UserCard";

export default function Users({ optOne, users}) {
  const {profileId}=useParams()
  const auth=useSelector(state=>state.auth)
  let location = useLocation();
  const following=users.filter(user=>{
      if(auth.following.includes(user._id)){
        return user
      }
  })
  const followedBy=users.filter(user=>{
      if(auth.followedBy.includes(user._id)){
        return user
      }
  })
  console.log(location.pathname,`/user/${profileId}`);
  
  return (
    <div className="Users">
      {location.pathname === "/profile" ? (
        <h3>{optOne}</h3>
      ) : (
        <h3>StatusShare Users:</h3>
      )}
      <table className="userCardContents">
        <tbody>
          <tr>
            <th className="tableHead">Name</th>
            <th className="tableHead">Status</th>
            <th className="tableHead">Link</th>
          </tr>
          {location.pathname === "/profile" || location.pathname === `/user/${profileId}`
            ? 
            (
              optOne==="Following"?
              (
                
                following.length !== 0 &&
                following.map((user) => {
                  return <UserCard user={user} key={user._id} />;
                })
                ):
                (
                followedBy.length !== 0 &&
                followedBy.map((user) => {
                  return <UserCard user={user} key={user._id} />;
                })
                
              )
            )
            : // users finding page
              users.length !== 0 &&
              users.map((user) => {
                return <UserCard user={user} key={user._id} />;
              })
              }
        </tbody>
      </table>
    </div>
  );
}
