import React,{useEffect} from 'react'
import Homepage from './pages/homepage/Homepage';
import ProfilePage from './pages/profilepage/ProfilePage';
import Userpage from './pages/userpage/Userpage';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import VisitProfile from './pages/visitprofile/VisitProfile';
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { authUser } from './redux-store/actions/authAction';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUser } from './redux-store/actions/userActions';



export default function App() {
  const auth=useSelector(state=>state.auth)
  let user=auth.id
  const dispatch=useDispatch()
  useEffect(() => {
    dispatch(getAllUser())
    user=auth.id
    if(user!==null){
      dispatch(authUser())
    }
  }, [user])
  
  return (
    <div>
      <BrowserRouter>
      <ToastContainer />
          <Routes>
            {
              user!==null && (
                <Route>
                  <Route path="/" element={<Homepage  />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/user/:profileId" element={<VisitProfile />} />
                  <Route path="/user" element={<Userpage />} />
                </Route>
              )
            }
            <Route path="/login" element={<Login  />} />
            <Route path="/register" element={<Register  />} />
            <Route path="*" element={<Navigate to={user!==null? "/":"/login"}/>  }/>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

