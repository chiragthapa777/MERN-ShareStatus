import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { PostProvider } from "./context/PostContext";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <AuthProvider>
        <PostProvider>
          <App />
        </PostProvider>
      </AuthProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
