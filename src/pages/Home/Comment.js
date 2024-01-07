import React, { useEffect, useState } from 'react'
import CommentDisplay from './CommentDisplay'

function Comment({post}) {

  const [comments, setComments] = useState([])
  const [showComments, setShowComments] = useState([])
  const [next, setNext] = useState(2)

  const [replyComments, setReplyComments] = useState([])

  useEffect(() => {
      const newCm = post.comments.filter(cm => !cm.reply)
      setComments(newCm)
      setShowComments(newCm.slice(newCm.length - next))
  },[post.comments, next])

  useEffect(() => {
  const newreply=post.comments.filter(cm => cm.reply)
  setReplyComments(newreply)
  }, [post.comments])
  return (
    <div className='comments'>
 
 {
  showComments.map(comment => (
        <CommentDisplay key={comment._id} comment={comment} post={post} replycomment={replyComments.filter(item => item.reply === comment._id)} />
    ))
 }
 {
                comments.length - next > 0
                ? <div className="border-top"
                style={{cursor: 'pointer', color: 'grey' ,paddingLeft:20,paddingBottom:4,paddingTop:4}}
                onClick={() => setNext(next + 10)}>
                    See more comments...
                </div>

                : comments.length > 2 &&
                <div className="p-2 border-top"
                style={{cursor: 'pointer', color: 'crimson'}}
                onClick={() => setNext(2)}>
                    Hide comments...
                </div>
            }
    </div>
  )
}

export default Comment
