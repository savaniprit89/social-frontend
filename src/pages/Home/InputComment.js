import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from '../../redux/actions/commentAction';

function InputComment({children,post,setreply,reply}) {
    const [content, setContent] = useState('')
    const { auth ,socket} = useSelector(state => state)
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault()
        if(!content.trim()){
            if(reply){
                return setreply(false);
            }
            return;
        }

        setContent('')
        
        const newComment = {
            content,
            likes: [],
            user: auth.user,
            createdAt: new Date().toISOString(),
            reply:reply && reply.commentId,
            tag:reply && reply.user
        }
        
        dispatch(createComment({post, newComment, auth,socket}))
        if(reply){
           
            return setreply(false);
        }
    
    }
  return (
    <form className="card-footer comment_input"  onSubmit={handleSubmit}>
    {children}
    <input type="text" placeholder="Add your comments..."
    value={content} onChange={e => setContent(e.target.value)}
   />

 

    <button type="submit" className="postBtn">
        Post
    </button>
</form>
  )
}

export default InputComment
