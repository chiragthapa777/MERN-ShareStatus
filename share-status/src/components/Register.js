import React,{useContext, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { UserContext } from '../context/UserContext'



export default function Register() {
  const navigate=useNavigate()
  const {register}=useContext(AuthContext)
  const {getUserDetail}=useContext(UserContext)
  const [email, setEmail] = useState("")
  const [pw, setPw] = useState("")
  const [name, setName] = useState("")
  const handleRegister=async(e)=>{
    e.preventDefault()
    const json= await register(name, email, pw)
    if(json.error)
    {
      alert(json.error)
    }
    else{
      alert(json.message)
      getUserDetail()
      navigate("/")
    }
  }
  return (
    <div className="Login">
      <form action="" className='loginForm' onSubmit={handleRegister}>
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
