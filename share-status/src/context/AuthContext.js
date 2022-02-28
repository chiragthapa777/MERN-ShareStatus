import { createContext, useState } from "react";
import { PostContext } from "./PostContext";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const intialUser = () => {
    if (localStorage.getItem("token")) return true;
    else return false;
  };
  const [user, setUser] = useState(intialUser);

  const login = async (email, password) => {
    const response = await fetch(`http://localhost:2000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email, password }),
    });
    const json = await response.json();
    if (json.authtoken) {
      localStorage.setItem("token", json.authtoken);
      setUser(true);
      return json;
    } else {
      //it will contain error
      return json;
    }
  };
  const register = async (name, email, password) => {
    const response = await fetch(`http://localhost:2000/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    if (json.authtoken) {
      localStorage.setItem("token", json.authtoken);
      setUser(true);
      return json;
    } else {
      //it will contain error
      return json;
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    setUser(intialUser);
  };

  return (
    <AuthContext.Provider value={{ login, register, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};
