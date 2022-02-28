import React,{useContext} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';
import { UserContext } from '../context/UserContext';

export default function Navbar() {
  const {userDetail}=useContext(UserContext)
  
  const navigate=useNavigate()
  const{logout}= useContext(AuthContext)
  const handleLogout=()=>{
    logout()
    navigate("/login")
}
  let location = useLocation();
  return (
    <>
      <label htmlFor="menu">
        <i className="menuBar fa-solid fa-bars" ></i>
      </label>
      <input type="checkbox" id="menu" />
        

      <div className="navbar">
        <div className="navlogo">
          <Link className="navLogoText" to="/">
            ShareStatus.
          </Link>
        </div>
        <div className="navContent">
          <div className="navLeft">
            <li>
              <Link className={`navlinks ${
                  location.pathname === "/" ? "navActive" : ""
                }`} to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className={`navlinks ${
                  location.pathname === "/profile" ? "navActive" : ""
                }`} to="/profile">
                Profile
              </Link>
            </li>
            <li>
              <Link className={`navlinks ${
                  location.pathname === "/user" ? "navActive" : ""
                }`} to="/user">
                Find users
              </Link>
            </li>
          </div>
          <div className="navRight">
            <li>
              <p className="navUser">Logged in as {userDetail.name}</p>
            </li>
            <li>
              <a className="button" onClick={handleLogout}>
                Logout
              </a>
            </li>
          </div>
        </div>
      </div>
    </>
  )
}
