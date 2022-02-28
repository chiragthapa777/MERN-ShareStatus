import { createContext, useState, useEffect } from "react";
// import PostReducer from "./PostReducer";

const host = "http://localhost:2000";
export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  // const [Posts, dispatch] = useReducer(PostReducer, initPosts)
  const [profilePosts, setProfilePosts] = useState([]);
  const [homePosts, setHomePosts] = useState([]);

  useEffect(() => {
    getProfilePosts();
  }, []);


  const getProfilePosts = async () => {
    const response = await fetch(`${host}/api/post/getuserpost`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
         localStorage.getItem('token'),
      },
    });
    const json = await response.json();

    setProfilePosts(json);
  };

  const getHomePosts = async () => {
    const response = await fetch(`${host}/api/post/getfollowpost`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
         localStorage.getItem('token'),
      },
    });
    const json = await response.json();

    setHomePosts(json);
  };

  const addPost = async (Postobj) => {
    try {
      const response = await fetch(`${host}/api/post/addpost`, {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
           localStorage.getItem('token'),
        },
        body: JSON.stringify(Postobj),
      });
      const json = await response.json();
      getProfilePosts();
      getHomePosts();
    } catch (error) {
      console.log(error);
    }
  };
  const deletePost = async (id) => {
    try {
      const response = await fetch(`${host}/api/post/deletePost/${id}`, {
        method: "Delete",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
           localStorage.getItem('token'),
        },
      });
      const json = await response.json();
      getProfilePosts();
    } catch (error) {
      console.log(error);
    }
  };

  const [editContent, setEditContent] = useState([]);
  const updatePost = async (Postobj) => {
    try {
      const response = await fetch(
        `${host}/api/post/updatepost/${editContent[0].id}`,
        {
          method: "Put",
          headers: {
            "Content-Type": "application/json",
            "auth-token":
             localStorage.getItem('token'),
          },
          body: JSON.stringify(Postobj),
        }
      );
      setEditContent([]);
      const json = await response.json();
      getProfilePosts();
    } catch (error) {
      console.log(error);
    }
  };
  const updateLike = async (PostId) => {
    try {
      const response = await fetch(`${host}/api/post/like/${PostId}`, {
        method: "Put",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
           localStorage.getItem('token'),
        },
      });
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PostContext.Provider
      value={{
        profilePosts,
        homePosts,
        getHomePosts,
        getProfilePosts,
        deletePost,
        addPost,
        editContent,
        setEditContent,
        updatePost,
        updateLike,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
