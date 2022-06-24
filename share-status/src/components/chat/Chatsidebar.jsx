import React from 'react'
import UserBox from './UserBox'

export default function Chatsidebar(props) {
  const {toggleBar,users}=props
    const handleClick=()=>{
      toggleBar()
    }
  return (
    <div className="chatSideBar">
      {users && users.map((user)=>{
        return(
          <UserBox user={user} key={user._id} onClick={handleClick}/>    
        )
      })}
    </div>
  )
}
