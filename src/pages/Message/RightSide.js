import React, { useEffect, useRef, useState } from 'react'
import UserCard from '../../components/UserCard'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Msgdisplay from './Msgdisplay'
import { globaTypes } from '../../redux/actions/globalTypes'
import { imageUpload } from '../../utils/imageUpload'
import { MESS_TYPES, addMessage, deleteConversation, getMessages, loadMoreMessages } from '../../redux/actions/messageAction'
import LoadIcon from '../../images/loading.gif'
function RightSide() {
    const { auth, message ,socket,peer} = useSelector(state => state)
    const dispatch = useDispatch()

    const { id } = useParams()
    const [user, setUser] = useState([])
    const [text, setText] = useState('')
    const [media, setMedia] = useState([])
    const [loadMedia, setLoadMedia] = useState(false)

    const refDisplay = useRef()
    const pageEnd = useRef()
    const navigate=useNavigate()
    const [data, setData] = useState([])
    const [result, setResult] = useState(9)
    const [page, setPage] = useState(0)
    const [isLoadMore, setIsLoadMore] = useState(0)
    useEffect(() => {
        const newData = message.data.find(item => item._id === id)
        if(newData){
            setData(newData.messages)
            setResult(newData.result)
            setPage(newData.page)
        }
    }, [message.data, id])
    useEffect(() => {
       if(id && message.users.length>0){
        setTimeout(() => {
            refDisplay.current.scrollIntoView({behavior: 'smooth', block: 'end'})
        },50)
        const newUser = message.users.find(user => user._id === id)
        if(newUser) setUser(newUser)
       }

         
        
    }, [message.users, id])
    
    const handleChangeMedia = (e) => {
        console.log("skdks  ")
        const files = [...e.target.files]
        let err = ""
        let newMedia = []

        files.forEach(file => {
            if(!file) return err = "File does not exist."

            if(file.size > 1024 * 1024 * 5){
                return err = "The image/video largest is 5mb."
            }

            return newMedia.push(file)
        })

        if(err) dispatch({ type: globaTypes.ALERT, payload: {error: err} })
        setMedia([...media, ...newMedia])
       // console.log([...images, ...newImages])
        
    }
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
    const handleDeleteMedia = (index) => {
        const newArr = [...media]
        newArr.splice(index, 1)
        setMedia(newArr)
    }
    const handlesubmit =async (e)=>{
        e.preventDefault()
        if(!text.trim() && media.length === 0) return;
        setText('')
        setMedia([])
        setLoadMedia(true)
        let newArr = [];
        if(media.length > 0) newArr = await imageUpload(media)
        const msg = {
            sender: auth.user._id,
            recipient: id,
            text, 
            media: newArr,
            createdAt: new Date().toISOString()
        }

        setLoadMedia(false)
       await dispatch(addMessage({msg,auth,socket}))
        console.log(msg)
        if(refDisplay.current){
            refDisplay.current.scrollIntoView({behavior: 'smooth', block: 'end'})
        }
    }

    useEffect(() => {
    
        const getMessagesData =async ()=>{
            if(message.data.every(item => item._id !== id)){
            
            // dispatch({type:MESS_TYPES.GET_MESSAGES,payload:{messages:[]}})
           
            await dispatch(getMessages({auth,id}))
            
            // if(refDisplay.current){
            //     refDisplay.current.scrollIntoView({behavior: 'smooth', block: 'end'})
            // }
            setTimeout(() => {
                refDisplay.current.scrollIntoView({behavior: 'smooth', block: 'end'})
            },50)
        }
        }
        getMessagesData()
    

    }, [dispatch,id,auth,message.data])

 // Load More
 useEffect(() => {
    const observer = new IntersectionObserver(entries => {
        if(entries[0].isIntersecting){
            setIsLoadMore(p => p + 1)
        }
    },{
        threshold: 0.1
    })

    observer.observe(pageEnd.current)
    console.log("page",page)
},[setIsLoadMore])


useEffect(() => {
    if(isLoadMore > 1){
        if(result >= page * 9){
            dispatch(loadMoreMessages({auth, id, page: page + 1}))
            setIsLoadMore(1)
        }
    }
    // eslint-disable-next-line
},[isLoadMore])



// useEffect(() => {
//     if(refDisplay.current){
//         refDisplay.current.scrollIntoView({behavior: 'smooth', block: 'end'})
//     }
// }, [text])
const handleDeleteConversation = ()=>{
dispatch(deleteConversation({auth,id}))
return navigate(`/message`)
}

const caller =( {video})=>{
    const {_id,avatar,username,fullname}=user
    const msg={
        sender:auth.user._id,
        recipient:_id,
        avatar,
        username,
        fullname,
        video
    }
    dispatch({type:globaTypes.CALL,payload:msg})
}
const callUser = (video)=>{
    const { _id, avatar, username, fullname } = auth.user

    const msg = {
        sender: _id,
        recipient: user._id, 
        avatar, username, fullname, video
    }  
    if(peer.open){
     msg.peerId = peer._id
    }
    socket.emit('callUser', msg)
}
const handleAudioPhone =()=>{
caller({video:false})
callUser({video:false})
}
const handleVideocall =()=>{
    caller({video:true})
    callUser({video:true})
}
  return (

    <>
    <div className="message_header" style={{cursor: 'pointer'}} >
    
    {
                    user.length !== 0 &&
                    <UserCard user={user}>
                        <div>
                            

                            <i className="fas fa-trash text-danger"
                            onClick={handleDeleteConversation}
                            />
                        </div>
                    </UserCard>
                }
    
</div>
<div  className='chat_container'  style={{height: media.length > 0 ? 'calc(100% - 180px)' : ''}}>
<div className="chat_display" ref={refDisplay}>
<button style={{marginTop:'-25px'}} ref={pageEnd}>Load more</button>
{
                        data.map((msg, index) => (
                                <div key={index}>
                                    {
                                        msg.sender !== auth.user._id &&
                                        <div className="chat_row other_message">
                                            <Msgdisplay user={user} msg={msg}  />
                                        </div>
                                    }

                                    {
                                        msg.sender === auth.user._id &&
                                        <div className="chat_row you_message">
                                            <Msgdisplay user={auth.user} msg={msg} data={data} />
                                        </div>
                                    }
                                </div>
                        ))
                    }
                    {
                       loadMedia && 
                       <div className="chat_row you_message">
                           <img src={LoadIcon} alt="loading"/>
                       </div>
                   }
</div>
</div>
  <div className="show_media" style={{display: media.length > 0 ? 'grid' : 'none'}} >
                {
                    media.map((item, index) => (
                        <div key={index} id="file_media">
                            {
                                item.type.match(/video/i)
                                ? videoshow(URL.createObjectURL(item))
                                : imgshow(URL.createObjectURL(item))
                            }
                            <span onClick={() => handleDeleteMedia(index)}  >&times;</span>
                        </div>
                    ))
                }
            </div>

  <form className="chat_input"  >
                <input type="text" placeholder="Enter you message..."
                value={text} onChange={e => setText(e.target.value)}
                />
                  <div className="file_upload">
                    <i className="fas fa-image text-danger" />
                    <input type="file" name="file" id="file"
                    multiple accept="image/*,video/*" onChange={handleChangeMedia}  />
                </div>
                <button type="submit" className="material-icons" 
                disabled={(text || media.length > 0)? false : true} onClick={handlesubmit}>
                    near_me
                </button>
                </form>
</>
  )
}

export default RightSide
