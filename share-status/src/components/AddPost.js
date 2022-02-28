import React,{useState, useContext, useEffect} from 'react'
import { PostContext } from '../context/PostContext'
import { UserContext } from '../context/UserContext'

export default function AddPost() {
  const {userDetail} = useContext(UserContext)
  const {addPost,updatePost, editContent} = useContext(PostContext)
  const [status, setStatus] = useState("")
  useEffect(() => {
    if(editContent.length!==0)
    {
      setStatus(editContent[0].status)
    }
  }, [editContent])
  
  
  const handleAddPost=(e)=>{
    e.preventDefault()
    if(editContent.length!==0)
    {
      updatePost({
        status
      })

    }
    else{
    addPost({
      status
    })
  }
  setStatus("") 
  }
  return (
    <div className="Addpost" onSubmit={handleAddPost}>
      <form action="" className='addPostForm'>

        <h3><span>{userDetail.name}</span>, update your status</h3>
        <textarea  value={status} rows="3" onChange={(e)=>{setStatus(e.target.value)}} placeholder="Write something....."></textarea>
        <button type='submit' className='button'>{editContent.length!==0?"Update":"Post"}</button>
      </form>
    </div>
  )
}
