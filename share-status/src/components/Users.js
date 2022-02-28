import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

// location.pathname === "/profile"
import UserCard from "./UserCard";
export default function Users({ optOne }) {
  const { userList, userDetail } = useContext(UserContext);

  let location = useLocation();
  // const newArrFunc = () => {
  //   console.log(userDetail);
    
  //   if ((location.pathname = "/profile" && optOne === "Following")) {
  //     return userList.filter((obj) => {
  //       if (userDetail.following.includes(obj._id)) return obj;
  //     });
  //   } else if ((location.pathname = "/profile" && optOne === "Followed by")) {
  //     return userList.filter((obj) => {
  //       if (userDetail.followedBy.includes(obj._id)) return obj;
  //     });
  //   } else return [];
  // };
  let newUserList = [];

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
            <th className="tableHead">Email</th>
            <th className="tableHead">Status</th>
            <th className="tableHead">Link</th>
          </tr>
          {userList.length !== 0 && location.pathname !== "/profile"
            ? userList.map((user) => {
                return <UserCard key={user._id} user={user} />;
              })
            : "No users to show"}
          {newUserList.length !== 0 && location.pathname === "/profile"
            ? userList.map((user) => {
                return <UserCard key={user._id} user={user} />;
              })
            : "No users to show"}
        </tbody>
      </table>
    </div>
  );
}
