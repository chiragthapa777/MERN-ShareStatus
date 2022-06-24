import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { updateBio } from "../../redux-store/actions/authAction";
import Users from "../users/Users";
import { followUnFollow } from "../../redux-store/actions/authAction";
import { url as apiUrl, setHeaders } from "../../urls/url";
import "./profile.css"

export default function Profile({ user }) {
  // console.log("user",user)
  const [image, setimage] = useState(null);
  const [imagebody, setimagebody] = useState({ url: "", public_id: "" });
  const [url, setUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [bio, setBio] = useState(user.bio);
  const dispatch = useDispatch();
  const { auth, users } = useSelector((state) => state);
  const [followState, setfollowState] = useState(
    auth.following.includes(user._id) ? "unfollow" : "follow"
    );
  const [followedBy, setFollowedBy] = useState(false);
  const [following, setFollowing] = useState(false);

  const handleFollowUnFollow = async () => {
    dispatch(followUnFollow(user._id));
    if (followState === "unfollow") {
      setfollowState("follow");
    } else {
      setfollowState("unfollow");
    }
  };

  const[editedFlag,setEditedFlag]=useState({bio:false,image:false})

  const handleUpdateBio = () => {
    if(editedFlag.image===false && editedFlag.bio===true){
      dispatch(updateBio(bio));
    }
    else if(editedFlag.bio===false && editedFlag.image===true){
      dispatch(updateBio(null,imagebody));
    }
    else if(editedFlag.image===true && editedFlag.bio===true){
      dispatch(updateBio(bio,imagebody));
    }
    setEditedFlag({image:false,bio:false})
    console.log(editedFlag)
  };
  async function handleImageUpload(immm) {
    const data = new FormData();
    data.append("file", immm);
    setUploading(true);
    fetch(`${apiUrl}/image/upload`, {
      method: "post",
      body: data,
      // headers:head.headers,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setEditedFlag({...editedFlag,image:true})
        setimagebody(data);
        console.log(data);
        setUrl(data.url);
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  }
  const location = useLocation();
  return (
    <>
      {user ? (
        <div className="Profile">
          <div className="profileCard">
            <div className="profilePictureWrapper">
              <div>
                <input
                  style={{ display: "none" }}
                  id="postProfileImg"
                  type="file"
                  placeholder="image"
                  accept=".png, .jpg, .jpeg"
                  onChange={(e) => {
                    setimage(e.target.files[0]);
                    handleImageUpload(e.target.files[0]);
                  }}
                />
              </div>
              <div className="profilePicture">
             
                <img
                  src={user.image?(user.image.url!==""?user.image.url:"images/blank-profile-picture-gb100cda33_1280.png"):"images/blank-profile-picture-gb100cda33_1280.png"}
                  alt=""
                />
              </div>
            </div>

            <table className="profileDetail">
              <tbody>
                <tr>
                  <td colSpan="2">              
                    <label
                  htmlFor="postProfileImg"
                  className="button"
                  style={{fontSize:"13px"}}
                >
                 <div className={`${uploading && "loaderIcon"}`}>
                      {uploading?<i className="fa-solid fa-spinner"></i>:"Upload"}
                      </div>
                </label></td>
                </tr>
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
                      <div className={`${uploading && "loaderIcon"}`}>
                      {uploading?<i className="fa-solid fa-spinner"></i>:"save"}
                      </div>
                    </button>
                  </th>
                  <td>
                    <textarea
                      readOnly={location.pathname !== "/profile" && "true"}
                      rows="2"
                      placeholder="Write something....."
                      value={bio}
                      onChange={(e) => {
                        setBio(e.target.value)
                        setEditedFlag({...editedFlag,bio:true})
                        console.log(editedFlag)
                      }}
                    ></textarea>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="profileCardBottomBar">
            {location.pathname !== "/profile" && (
                <div className="profileCardBottomBarItem">
              <button className="button" onClick={handleFollowUnFollow}>
                {followState}
              </button>
              </div>
            )}
            <div className="profileCardBottomBarItem profileCardFollowing" onClick={()=>{setFollowing(!following)}}>
              Following {user.following.length}
            </div>
            <div className="profileCardBottomBarItem profileCardFollowedBy" onClick={()=>{setFollowedBy(!followedBy)}}>
              Followed by {user.followedBy.length}
            </div>
            </div>
          </div>
          {location.pathname === "/user" ||
            (location.pathname === "/profile" && (
              <>
                {following && <Users optOne={"Following"} users={users} />}
                {followedBy && <Users optOne={"Followed by"} users={users} />}
              </>
            ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
