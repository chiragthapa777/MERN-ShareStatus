import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { UserContext } from '../context/UserContext'

export default function Login() {
  const navigate=useNavigate()
  const { login } = useContext(AuthContext)  
  const { getUserDetail } = useContext(UserContext)  
  const [email, setEmail] = useState("")
  const [pw, setPw] = useState("")
  const handleLogin=async (e)=>{
    e.preventDefault()
    const json= await login(email, pw)
    if(json.error)
    {
      // alert(json.error)
      console.log(json.error);
      
    }
    else{
      // alert(json.message)
      getUserDetail()
      navigate("/")
    }
  }
  return (
    <div className="Login">
      <form action="" className='loginForm' onSubmit={handleLogin}>
        <h1>ShareStatus.</h1>
        <input type="email" placeholder='Enter email' value={email} onChange={e=>{setEmail(e.target.value)}} />
        <input type="password" placeholder='Enter password' value={pw} onChange={e=>{setPw(e.target.value)}}/ >
        <button className="button">Login</button>
        <Link className="LoginSmall" to="/register" >New to Share status? click here</Link>
      </form>
    </div>
  )
}
