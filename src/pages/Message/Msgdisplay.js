import React from 'react'
import Avatar from '../../components/Avatar'
import { useDispatch, useSelector } from 'react-redux'
import { deleteMessages } from '../../redux/actions/messageAction'

function Msgdisplay({user,msg,data}) {
    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()
  const imgshow =(src)=>{
    return(
        <img  alt='images' className='img-thumbnail'
        src= {src}
        />
    )
}
const videoshow =(src)=>{
    return(
        <video controls  alt='images' className='img-thumbnail'
        src= {src}
        />
    )
}
const handleDeleteMessages = () => {
    if(!data) return;
    
    if(window.confirm('Do you want to delete?')){
        dispatch(deleteMessages({msg, data, auth}))
    }
}
  return (
    <>
    <div className="chat_title">
        <Avatar src={user.avatar} size="small-avatar" />
        <span>{user.username}</span>
    </div>
    
    <div className="you_content">
                { 
                    user._id === auth.user._id && 
                    <i className="fas fa-trash text-danger"
                    onClick={handleDeleteMessages} />
                }

                <div>
                    {
                        msg?.text && 
                        <div className="chat_text">
                            {msg?.text}
                        </div>
                    }
                    {
                        msg.media.map((item, index) => (
                            <div key={index}>
                                {
                                    item.url.match(/video/i)
                                    ? videoshow(item.url)
                                    : imgshow(item.url)
                                }
                            </div>
                        ))
                    }
                </div>
                </div>
 
                        <div className="chat_time">
                {new Date(msg.createdAt).toLocaleString()}
            </div>
    </>
  )
}

export default Msgdisplay
