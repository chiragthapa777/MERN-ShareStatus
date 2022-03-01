import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { authRegister } from '../redux-store/actions/authAction'






export default function Register() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const auth=useSelector(state=>state.auth)
  const [email, setEmail] = useState("")
  const [pw, setPw] = useState("")
  const [name, setName] = useState("")

  const handleSubmit=e=>{
    e.preventDefault()
    dispatch(authRegister({name,email,password:pw}))
  }
    if(auth.id!==null) navigate("/profile")
  

  return (
    <div className="Login">
      <form action="" className='loginForm' onSubmit={handleSubmit}>
        <h1>ShareStatus.</h1>
        <input type="text" placeholder='Enter name' value={name} onChange={e=>{setName(e.target.value)}}/>
        <input type="email" placeholder='Enter email' value={email} onChange={e=>{setEmail(e.target.value)}}/>
        <input type="password" placeholder='Enter password' value={pw} onChange={e=>{setPw(e.target.value)}}/>
        <button className="button">Register</button>
        <Link className="LoginSmall" to="/login" >Already have an account? click here</Link>
      </form>
    </div>
  )
}
