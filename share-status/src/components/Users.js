import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// location.pathname === "/profile"
import UserCard from "./UserCard";
export default function Users({ optOne }) {
  let location = useLocation();


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
          <UserCard />
        </tbody>
      </table>
    </div>
  );
}
