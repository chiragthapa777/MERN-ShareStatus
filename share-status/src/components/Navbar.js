import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { authLogout } from '../redux-store/actions/authAction';





export default function Navbar() { 

  const auth=useSelector(state=>state.auth)
  const dispatch=useDispatch()
  let navigate=useNavigate()
  let location = useLocation();
  const handleLogout=()=>{
    dispatch(authLogout())
    navigate("/login")
  }
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
              <p className="navUser">Logged in as {auth.name}</p>
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
