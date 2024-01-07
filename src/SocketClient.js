import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Post_TYPES } from './redux/actions/postAction';
import { globaTypes } from './redux/actions/globalTypes';
import { NOTIFY_TYPES } from './redux/actions/notifyAction';
import audiobell from './got-it-done-613.mp3'
import { MESS_TYPES } from './redux/actions/messageAction';
const spawnNotification = (body, icon, url, title) => {
  let options = {
      body, icon
  }
  let n = new Notification(title, options)

  n.onclick = e => {
      e.preventDefault()
      window.open(url, '_blank')
  }
}

function SocketClient() {
const {auth,socket,alert,call}=useSelector(state => state);
const dispatch = useDispatch()
const audioRef = useRef()
//join
    useEffect(() => {
    socket.emit('joineduser',auth.user)
    },[socket,auth.user]);
 // Likes
 useEffect(() => {
  socket.on('likeToClient', newPost =>{
      dispatch({type: Post_TYPES.UPDATE_POST, payload: newPost})
  })

  return () => socket.off('likeToClient')
  
},[socket, dispatch])


useEffect(() => {
  socket.on('unlikeToClient', newPost =>{
      dispatch({type: Post_TYPES.UPDATE_POST, payload: newPost})
  })

  return () => socket.off('unlikeToClient')
  
},[socket, dispatch])
useEffect(() => {
  socket.on('commentToClient', newPost =>{
      dispatch({type: Post_TYPES.UPDATE_POST, payload: newPost})
  })

  return () => socket.off('commentToClient')
  
},[socket, dispatch])

useEffect(() => {
  socket.on('deletecommentToClient', newPost =>{
      dispatch({type: Post_TYPES.UPDATE_POST, payload: newPost})
  })

  return () => socket.off('deletecommentToClient')
  
},[socket, dispatch])
    // Follow
    useEffect(() => {
      socket.on('followToClient', newUser =>{
          dispatch({type: globaTypes.AUTH, payload: {...auth, user: newUser}})
      })

      return () => socket.off('followToClient')
  },[socket, dispatch, auth])

  useEffect(() => {
      socket.on('unFollowToClient', newUser =>{
          dispatch({type: globaTypes.AUTH, payload: {...auth, user: newUser}})
      })

      return () => socket.off('unFollowToClient')
  },[socket, dispatch, auth])


  useEffect(() => {
    socket.on('createNotifyToClient', msg =>{
        dispatch({type: NOTIFY_TYPES.CREATE_NOTIFY, payload: msg})

        if(alert.sound) audioRef.current.play()
        spawnNotification(
          msg.user.username + ' ' + msg.text,
          msg.user.avatar,
          msg.url,
          'SOCIAL-NETWORK'
      )
    })

    return () => socket.off('createNotifyToClient') 
},[socket, dispatch])

useEffect(() => {
  socket.on('removeNotifyToClient', msg =>{
    console.log(msg)
      dispatch({type: NOTIFY_TYPES.REMOVE_NOTIFY, payload: msg})
  })

  return () => socket.off('removeNotifyToClient') 
},[socket, dispatch])


useEffect(() => {
  socket.on('addMessageToClient', msg =>{
      dispatch({type: MESS_TYPES.ADD_MESSAGE, payload: msg})
      dispatch({type: MESS_TYPES.ADD_USER, payload: {...msg.user, text: msg.text, media: msg.media}})
  })

  return () => socket.off('addMessageToClient') 
},[socket, dispatch])


useEffect(() => {
  socket.on('callUserToClient', data =>{
      dispatch({type: globaTypes.CALL, payload: data})
      // dispatch({type: MESS_TYPES.ADD_USER, payload: {...msg.user, text: msg.text, media: msg.media}})
  })

  return () => socket.off('callUserToClient') 
},[socket, dispatch])


useEffect(() => {
  socket.on('userBusy', data =>{
      dispatch({type: globaTypes.ALERT, payload: {error: `${call.username} is busy!`}})
  })

  return () => socket.off('userBusy')
},[socket, dispatch, call])

  return 
  <>
  <audio controls ref={audioRef} style={{display: 'none'}} >
      <source src={audiobell} type="audio/mp3" />
  </audio>
</>
  
}

export default SocketClient
