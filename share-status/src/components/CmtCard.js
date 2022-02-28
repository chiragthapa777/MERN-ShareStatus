import React from 'react'

export default function CmtCard(props) {
  let {cmt}=props
  // console.log("cmt:",cmt);
  
  return (
    <div className="commentCard">
            <div className="commentUser">{cmt.commenterName}</div>
            <div className="comment">{cmt.comment}</div>
    </div>
  )
}
