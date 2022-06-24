import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUnFollow } from "../../redux-store/actions/authAction";
import { Link } from "react-router-dom";
import "./users.css";

export default function UserCard({ user }) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleFollow = () => {
    dispatch(followUnFollow(user._id));
  };

  return (
    <tr className="UserCard">
      <td className="tableUserName">
        <div style={{display:"flex"}}>
          <img
            style={{
              height: "40px",
              width: "40px",
              borderRadius: "50%",
              objectFit: "cover",
              margin: "auto 4px",
              display: "inline",
            }}
            src={
              user.image
                ? user.image.url !== ""
                  ? user.image.url
                  : "images/blank-profile-picture-gb100cda33_1280.png"
                : "images/blank-profile-picture-gb100cda33_1280.png"
            }
            alt=""
          />
          <div style={{ display: "inline",margin: "auto 4px", }}>
            <p>{user.name}</p>
            <div className="tableUserEmail">{user.email}</div>
          </div>
        </div>
      </td>
      <td className="userCardFollowAction">
        <button className="button" onClick={handleFollow}>
          {auth !== null && auth.following.includes(user._id)
            ? "Unfollow"
            : "Follow"}
        </button>
      </td>
      <td>
        <button className="button">
          <Link to={`/user/${user._id}`}>profile</Link>
        </button>
      </td>
    </tr>
  );
}
