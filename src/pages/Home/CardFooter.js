import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Send from '../../images/send.png'
import { useDispatch, useSelector } from 'react-redux';
import { likepost, unlikepost ,savePost, unsavePost} from '../../redux/actions/postAction';
import ShareModal from './ShareModal';
function CardFooter({post}) {
    const [like,setlike]=useState(false);
    const[loadlike,setloadlike]=useState(false);
    const { auth ,socket} = useSelector(state => state)
    const dispatch = useDispatch()
    const [save,setsave]=useState(false);
    const [share,setshare]=useState(false);
    useEffect(() => {
        if(post.likes.find(like => like._id === auth.user._id)){
            setlike(true)
        }else{
            setlike(false)
        }
    }, [post.likes, auth.user._id])
    const handlelike=async ()=>{
        if(loadlike){
            return;
        }

setloadlike(true);
await dispatch(likepost({post,auth,socket}))
setloadlike(false);
    }

    const handleunlike=async()=>{
        if(loadlike){ 
            return;
        }
       
setloadlike(true);
await dispatch(unlikepost({post,auth,socket}))
setloadlike(false);

    }
    useEffect(() => {
        if(auth.user.saved.find(id => post._id === id)){
            setsave(true)
        }else{
            setsave(false)
        }
    }, [post._id, auth.user.saved])

  return (
    <div className="card_footer">
    <div className="card_icon_menu">
        <div>
           {
    like? <i className="fas fa-heart text-danger" onClick={handleunlike} />: <i className="far fa-heart" onClick={(handlelike)} />
           }
       
            <Link to={`/post/${post._id}`} className="text-dark">
                <i className="far fa-comment" />
            </Link>

            <img src={Send}  alt="Send"   style={{color:"black"}} onClick={()=> setshare(!share)}/>
        </div>

        {
            save?
              <i className="fas fa-bookmark text-info " onClick={()=> dispatch(unsavePost({post,auth}))}
            />:<i className="far fa-bookmark " onClick={()=> dispatch(savePost({post,auth}))} />

          
        }
       
    </div>

    <div className="d-flex justify-content-between">
        <h6 style={{padding: '0 25px', cursor: 'pointer'}}>
            {post.likes.length} likes
        </h6>
        
        <h6 style={{padding: '0 25px', cursor: 'pointer'}}>
            {post.comments.length} comments
        </h6>
    </div>

{
    share && <ShareModal url={`https://socialnetworkwebsite.netlify.app/post/${post._id}`}></ShareModal>
}
  
</div>
  )
}

export default CardFooter
