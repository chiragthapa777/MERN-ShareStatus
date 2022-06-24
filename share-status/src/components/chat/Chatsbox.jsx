import React from 'react'

export default function Chatsbox(props) {
    const {chats,toggleBar}=props
    const handleClick=()=>{
      toggleBar()
    }
  return (
    <>
    <div>Chatsbox</div>
    <div onClick={handleClick}>toogle</div>
    </>
  )
}
