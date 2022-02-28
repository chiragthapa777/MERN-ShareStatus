import React from 'react'
import Homepage from './pages/Homepage';
import ProfilePage from './pages/ProfilePage';
import Userpage from './pages/Userpage';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import VisitProfile from './pages/VisitProfile';
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"


export default function App() {
  const user=true
  return (
    <div>
      <BrowserRouter>
      <ToastContainer />
          <Routes>
            {
              user && (
                <Route>
                  <Route path="/" element={<Homepage  />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/user/:id" element={<VisitProfile />} />
                  <Route path="/user" element={<Userpage />} />
                </Route>
              )
            }
            <Route path="/login" element={<Login  />} />
            <Route path="/register" element={<Register  />} />
            <Route path="*" element={<Navigate to={user? "/":"/login"}/>  }/>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

