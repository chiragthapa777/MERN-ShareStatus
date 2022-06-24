import React,{useState} from "react";
import Navbar from "../../components/navbar/Navbar";
import Chatsidebar from "../../components/chat/Chatsidebar"
import ChatBox from "../../components/chat/Chatsbox"
import "./chatpage.css"

export default function Chatpage() {
  let chats=[
    {
      id:1,
      sender:{id:1,name:"chirag thapa",image:""},
      receiver:{id:2,name:"ram thapa",image:""},
      chat:"hello how are you"
    },
    {
      id:2,
      receiver:{id:1,name:"chirag thapa",image:""},
      sender:{id:2,name:"ram thapa",image:""},
      chat:"i am fine and you"
    },
    {
      id:3,
      sender:{id:1,name:"chirag thapa",image:""},
      receiver:{id:2,name:"ram thapa",image:""},
      chat:"i am doin great, and whats up with your projects"
    },
    {
      id:4,
      receiver:{id:1,name:"chirag thapa",image:""},
      sender:{id:2,name:"ram thapa",image:""},
      chat:"i project is almost done, a chatting portion is left"
    },
    {
      id:5,
      sender:{id:1,name:"chirag thapa",image:""},
      receiver:{id:2,name:"ram thapa",image:""},
      chat:"i  have not started yet"
    },
    {
      id:6,
      receiver:{id:1,name:"chirag thapa",image:""},
      sender:{id:2,name:"ram thapa",image:""},
      chat:"ohh man you are gonna be late"
    },
  ]
  let users=[
    {
      _id:1,
      name:"ram"
    },
    {
      _id:2,
      name:"shyam"
    },
    {
      _id:3,
      name:"hari"
    },
    {
      _id:4,
      name:"john"
    },
    {
      _id:5,
      name:"alam"
    },
    {
      _id:6,
      name:"hari bahadur"
    },
    {
      _id:7,
      name:"purnima"
    },
    {
      _id:8,
      name:"ahahahah"
    },
  ]
  const [toggleChatbar, settoggleChatbar] = useState(false)
  function toggleBar(){
    console.log("click")
    settoggleChatbar(!toggleChatbar)
  }
  return (
    <>
      <Navbar />
      <div className="chatPage">
        <div className={`chatUserlist ${toggleChatbar?"toggleFullWidth":""}`}>
          <Chatsidebar toggleBar={toggleBar} users={users}/>
        </div>
        <div className="chatRightBox">
          <ChatBox chats={chats} toggleBar={toggleBar} />
        </div>
      </div>
    </>
  );
}
