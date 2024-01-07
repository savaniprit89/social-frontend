import React, { useEffect, useState } from 'react'
import CommentCard from './CommentCard'

function CommentDisplay({comment,post,replycomment}) {
  const [showRep, setShowRep] = useState([])
  const [next, setNext] = useState(1)
  useEffect(() => {
    setShowRep(replycomment.slice(replycomment.length - next))
},[replycomment, next])
  return (
    <div className='comment_display'>
      <CommentCard comment={comment} post={post} commentId={comment._id}>
<div className='pl-4'>
  {
    showRep.map((item,index)=>(
      item.reply && <CommentCard key={index} comment={item} post={post}  commentId={comment._id}></CommentCard>
    ))
  }
  {
                        replycomment.length - next > 0
                        ? <div style={{cursor: 'pointer', color: 'crimson'}}
                        onClick={() => setNext(next + 10)}>
                            See more comments...
                        </div>

                        : replycomment.length > 1 &&
                        <div style={{cursor: 'pointer', color: 'crimson'}}
                        onClick={() => setNext(1)}>
                            Hide comments...
                        </div>
                    }
</div>
      </CommentCard>
    </div>
  )
}

export default CommentDisplay
