import React from 'react'
import "./chat.css"

export default function UserBox({user}) {
  return (
    <div className='userBox'>
        <div className="userBoxLeft">
            <img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
        </div>
        <div className="userBoxRight">
            <p className="userBoxName">{user.name}</p>
        </div>
    </div>
  )
}
