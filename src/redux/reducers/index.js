import { combineReducers } from 'redux'
import auth from './authReducer'
import notify from './notifyReducer'
import profile from './profileReducer'
import status from './statusReducer'
import post from './postReducer'
import modal from './modalReducer'
import detailpost from './detailPostReducer'
import discover from './discoverReducer'
import suggestion from './suggestionReducer'
import socket from './socketReducer'
import alert from './alertReducer'
import message from './messageReducer'
import call from './callReducer'
import peer from './peerReducer'

export default combineReducers({

    auth,notify,profile,status,post,modal,detailpost,discover,suggestion,socket,alert,message,call,peer
})