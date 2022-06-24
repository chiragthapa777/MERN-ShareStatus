import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../redux-store/actions/postActions";
import { updatePost } from "../../redux-store/actions/postActions";
import Loader from "../loader/Loader";
import { url as apiUrl, setHeaders } from "../../urls/url";
import "./posts.css";

export default function AddPost({ status, setStatus }) {
  const [image, setimage] = useState(null);
  const [imagebody, setimagebody] = useState({ url: "", public_id: "" });
  const [url, setUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  //handling the post sudmit
  const handlePost = (e) => {
    e.preventDefault();
    if (status._id) {
      dispatch(updatePost(status.status, status._id));
    } else {
      dispatch(addPost({ status: status.status, image: imagebody }));
    }
    setStatus({ status: "" });
    setUrl(null);
    setimage(null);
    setimagebody({ url: "", public_id: "" });
  };

  //fucntion to insert image
  async function handleImageUpload(immm) {
    // let head = setHeaders();
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
        setimagebody(data);
        console.log(data);
        setUrl(data.url);
        console.log("set vayo haiiii",url)  
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  }
  return (
    <div className="Addpost">
      <form action="" className="addPostForm">
        <h3>
          <span style={{ textTransform: "uppercase" }}>{auth.name}</span>,
          update your status
        </h3>
        <textarea
          rows="3"
          value={status.status}
          onChange={(e) => setStatus({ ...status, status: e.target.value })}
          placeholder="Write something....."
        ></textarea>

        <input
          style={{ display: "none" }}
          id="postImg"
          type="file"
          placeholder="image"
          accept=".png, .jpg, .jpeg"
          onChange={(e) => {
            setimage(e.target.files[0]);
            handleImageUpload(e.target.files[0]);
          }}
        />
        {image && (
          <div
            style={{
              width: "inherit",
              height: "50vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "2px",
            }}
          >
            {url && (
              // eslint-disable-next-line jsx-a11y/img-redundant-alt
              <img
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
                src={url}
                alt="post image"
              />
            )}

            {uploading && <Loader />}
          </div>
        )}
        <div className="addPostButtonStack">
        <label
          htmlFor="postImg"
          style={{
            fontSize: "25px",
            display: "block",
            margin: "1px 10px",
            color: "#1dd3b0",
          }}
        >
          <i className="fa-solid fa-image"></i>
        </label>
        <button type="submit" className="button" onClick={handlePost}>
          {status._id ? "Edit" : "Post"}
        </button>
        </div>
      </form>
    </div>
  );
}
