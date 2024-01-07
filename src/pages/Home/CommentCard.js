import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../../components/Avatar'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import Commentmenu from './Commentmenu'
import { likeComment, unlikeComment, updateComment } from '../../redux/actions/commentAction'
import InputComment from './InputComment'
function CommentCard({children,comment,post,commentId}) {
    const [content, setContent] = useState('')
    const { auth} = useSelector(state => state)
    const dispatch = useDispatch()
    const [readMore, setReadMore] = useState(false)
    const [like,setlike]=useState(false);
    const [edit,setonedit]=useState(false);
    const [loadlike,setloadlike]=useState(false);
    const [reply, setreply] = useState(false);
        const handlelike =async()=>{
      if(loadlike){
        return;
    }
setlike(true)
setloadlike(true)
           await dispatch(likeComment({comment, post, auth}))
        setloadlike(false)
    }
     const handleunlike =async()=>{
      if(loadlike){
        return;
    }
        setlike(false)
        setloadlike(true)
       await dispatch(unlikeComment({comment, post, auth}))
        setloadlike(false)
     }
    useEffect(() => {
        setContent(comment.content)
        setlike(false)
        setreply(false)
        if(comment.likes.find(like => like._id === auth.user._id)){
          setlike(true)
      }
    },[comment,auth.user._id])
    const styleCard = {
        opacity: comment._id ? 1 : 0.5,
        pointerEvents: comment._id ? 'inherit' : 'none'
    }

    const handleUpdate = () => {
      if(comment.content !== content){
         dispatch(updateComment({comment, post, content, auth}))
       
          setonedit(false)
      }else{
          setonedit(false)
      }
  }

  const handlereply= ()=>{

   
    if(reply){
     return   setreply(false)
    }
   
    setreply({...comment,commentId});
  }

  return (
    <div className='comment_card mt-2' style={styleCard}>
  <Link to={`/profile/${comment.user._id}`} className='d-flex text-dark'>
    <Avatar src={comment.user.avatar} size='small-avatar'></Avatar>
    <h6 className='mx-1 '>{comment.user.username}</h6>
  </Link>
  <div className='comment_content'>
<div style={{width:"80%"}} >
{
  edit 
                        ? <textarea rows="2" value={content}
                        onChange={e => setContent(e.target.value)} />:

<div>
{
                                comment.tag && comment.tag._id !== comment.user._id &&
                                <Link to={`/profile/${comment.tag._id}`} className="mr-1">
                                    @{comment.tag.username}
                                </Link>
                            }
<span>
                                {
                                    content.length < 100 ? content :
                                    readMore ? content + ' ' : content.slice(0, 100) + '....'
                                }
                            </span>
                            {
                                content.length > 100 &&
                                <span className="readMore"  onClick={() => setReadMore(!readMore)}>
                                    {readMore ? 'Hide content' : 'Read more'}
                                </span>
                            }
                                                        </div>
}
                    <div style={{cursor: 'pointer'}}>
                        <small className="text-muted mr-3">
                            {moment(comment.createdAt).fromNow()}
                        </small>

                        <small className="font-weight-bold mr-3">
                            {comment.likes.length} likes
                        </small>
                        
                        {
                            edit
                            ? <>
                                <small className="font-weight-bold mr-3"
                               onClick={handleUpdate} >
                                    update
                                </small>
                                <small className="font-weight-bold mr-3"
                                onClick={() => setonedit(false)}>
                                    cancel
                                </small>
                            </>

                            : <small className="font-weight-bold mr-3"
                             onClick={handlereply}>
                                {reply ? 'cancel' :'reply'}
                            </small>
                        }
                    </div>
</div>
<div className='d-flex align-items-center' style={{cursor:"pointer  "}}>
{
like? <i className="fas fa-heart text-danger" onClick={handleunlike} />: <i className="far fa-heart" onClick={(handlelike)} />
}
<Commentmenu post={post} comment={comment} auth={auth} onedit={setonedit}> </Commentmenu>
</div>
  </div>
 {
    reply && <InputComment post={post} reply={reply} setreply={setreply} >

        <Link to={`/profile/${reply.user._id}`} className='mr-1'>
@{reply.user.username}:
        </Link>
    </InputComment>
 }
 {
    children
 }
 
    </div>
  )
}

export default CommentCard
