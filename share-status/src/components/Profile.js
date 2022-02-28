import React from "react";
import { useLocation } from "react-router-dom";
import Users from "./Users";



export default function Profile(props) {
 
const location=useLocation()
  return (
    <>
      <div className="Profile">
        <div className="profileCard">
          <table className="profileDetail">
            <tr>
              <th>Name</th>
              <td>name</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>chirag@gmail.com</td>
            </tr>
            <tr>
              <th>
                Bio{" "}
                <button
                  className={`button ${
                    location.pathname !== "/profile" && "displayNone"
                  }`}
                >
                  save
                </button>
              </th>
              <td>
                <textarea
                  rows="5"
                  placeholder="Write something....."
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
