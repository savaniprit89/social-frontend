import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route,Routes, Navigate} from 'react-router-dom'
import PageRender from './PageRender';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Notify from './pages/Notify';
import {useSelector,useDispatch} from 'react-redux'
import { useEffect } from 'react';
import { refreshToken } from './redux/actions/authAction';
import Header from './components/Header';
import Message from './pages/Message';
import Notify1 from './pages/Notify1';
import Discover from './pages/Discover';
import Profile from './pages/Profile';
import StatusModal from './components/StatusModal';
import { getposts } from './redux/actions/postAction';
import Id from './pages/Posts/Id';
import { getSuggestions } from './redux/actions/suggestionAction';

import socketIO from 'socket.io-client';
import { globaTypes } from './redux/actions/globalTypes';
import SocketClient from './SocketClient';
import { getNotifies } from './redux/actions/notifyAction';
import MessageId from './pages/Message/MessageId';
import CallModal from './pages/Message/CallModal';
// import Peer from 'peerjs'

function App() {
   
const {auth,status,modal,call}=useSelector(state=>state)
const firstLogin = localStorage.getItem('firstLogin')
const dispatch=useDispatch()

useEffect(() => {
dispatch(refreshToken());

const socket = socketIO.connect('https://social-pg3k.onrender.com');

    dispatch({type:globaTypes.SOCKET, payload: socket})
    
    return () => socket.close()
}, [dispatch])
useEffect(() => {
  if(auth.token){
    dispatch(getposts(auth.token))
    dispatch(getSuggestions(auth.token))
    dispatch(getNotifies(auth.token))
  }
  }, [dispatch,auth.token])
  useEffect(() => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
    else if (Notification.permission === "granted") {}
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {}
      });
    }
  },[])

  // useEffect(() => {
  // const newpeer=new Peer(undefined,{
  //   host:'/',port:'3001'
  // })
  // dispatch({type:globaTypes.PEER,payload:newpeer})
  // }, [dispatch])
  return (
    <Router>
    <Notify></Notify>

 
    <div className={`App ${(status || modal) && 'mode'}`}>
    <div className='main'>
  {auth.token && <Header></Header>}
  {status && <StatusModal />}
  {auth.token && <SocketClient></SocketClient> }
  {call && <CallModal />}
    <Routes>
    <Route exact path='/register' element={<Register />}> </Route>
    <Route exact path='/' element={auth.token?<Home />:<Login />}> </Route>
    <Route exact path='/favorite' element={auth.token?<Notify1 />:<Navigate to="/" />}> </Route>
    <Route exact path='/message' element={auth.token?<Message />:<Login />}> </Route>
    <Route exact path='/profile' element={auth.token?<Profile />:<Login />}> </Route>
    <Route exact path='/profile/:id' element={auth.token?<Profile />:<Login />}> </Route>
    <Route exact path='/discover' element={auth.token?<Discover />:<Login />}> </Route>
    <Route exact path='/post/:id' element={auth.token?<Id />:<Login />}> </Route>
    <Route exact path='/message/:id' element={auth.token?<MessageId />:<Login />}> </Route>
    </Routes>
    </div>  
    </div>
   
    </Router>
  );
}

export default App;

/*
app.js
package .json
fetch data

*/