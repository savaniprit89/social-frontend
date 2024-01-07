import React from 'react'
import Avatar from '../../components/Avatar'
import { Link, useNavigate } from 'react-router-dom'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { globaTypes } from '../../redux/actions/globalTypes'
import { deletePost } from '../../redux/actions/postAction'
function CardHeader({post}) {
    const { auth,socket} = useSelector(state => state)
 
    const dispatch = useDispatch()
    
    const handleEditPost = () => {
        dispatch({ type: globaTypes.STATUS, payload: {...post, onEdit: true}})
    }
    const navigate = useNavigate();
    const handledelete = ()=>{
        if(window.confirm("are you want to delete post")){
            dispatch(deletePost({post,auth,socket}));
            navigate('/');
        }
       
    }

    const handlecopylink=()=>{
        navigator.clipboard.writeText(`https://socialnetworkwebsite.netlify.app/post/${post._id}`);
    }
      return (
    <div className="card_header">
    <div className="d-flex">
        <Avatar src={post.user.avatar} size="big-avatar" />

        <div className="card_name">
            <h6 className="m-0">
                <Link to={`/profile/${post.user._id}`} className="text-dark">
                    {post.user.username}
                </Link>
            </h6>
            <small className="text-muted">
                {moment(post.createdAt).fromNow()}
            </small>
        </div>
    </div>

    <div className="nav-item dropdown">
        <span className="material-icons" id="moreLink" data-toggle="dropdown">
            more_horiz
        </span>

        <div className="dropdown-menu">
            {
                auth.user._id === post.user._id &&
                <>
                    <div className="dropdown-item" onClick={handleEditPost} >
                        <span className="material-icons">create</span> Edit Post
                    </div>
                    <div className="dropdown-item" onClick={handledelete}  >
                        <span className="material-icons">delete_outline</span> Remove Post
                    </div>
                </>
            }

            <div className="dropdown-item" onClick={handlecopylink} >
                <span className="material-icons">content_copy</span> Copy Link
            </div>
        </div>
    </div>
</div>
  )
}

export default CardHeader
