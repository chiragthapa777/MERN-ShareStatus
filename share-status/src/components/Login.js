import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { authLogin } from '../redux-store/actions/authAction'


export default function Login() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const auth=useSelector(state=>state.auth)
  const [email, setEmail] = useState("")
  const [pw, setPw] = useState("")
  const handleSubmit=e=>{
    e.preventDefault()
    dispatch(authLogin({email,password:pw}))
  }
  if(auth.id!==null)  navigate("/profile")
  

  
  return (
    <div className="Login" >
      <form action="" className='loginForm' onSubmit={handleSubmit}>
        <h1>ShareStatus.</h1>
        <input type="email" placeholder='Enter email' value={email} onChange={e=>{setEmail(e.target.value)}} />
        <input type="password" placeholder='Enter password' value={pw} onChange={e=>{setPw(e.target.value)}}/ >
        <button className="button">Login</button>
        <Link className="LoginSmall" to="/register" >New to Share status? click here</Link>
      </form>
    </div>
  )
}
