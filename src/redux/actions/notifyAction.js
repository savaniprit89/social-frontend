import { deleteDataAPI, getDataAPI, patchDataAPI, postDataAPI } from "../../utils/fetchData";
import { globaTypes } from "./globalTypes";
export const NOTIFY_TYPES = {
    GET_NOTIFIES: 'GET_NOTIFIES',
    CREATE_NOTIFY: 'CREATE_NOTIFY',
    REMOVE_NOTIFY: 'REMOVE_NOTIFY',
    UPDATE_NOTIFY: 'UPDATE_NOTIFY',
    UPDATE_SOUND: 'UPDATE_SOUND',
    DELETE_ALL_NOTIFIES: 'DELETE_ALL_NOTIFIES'
}
export const createNotify =({msg,auth,socket})=> async(dispatch)=>{
    try {
        const res=await postDataAPI('notify',msg,auth.token)
        console.log(res.data)
        socket.emit('createnotify',{
            ...res.data.notify,
            user:{
                username:auth.user.username,
                avatar:auth.user.avatar
            }
        })
    } catch (err) {
        dispatch({type: globaTypes.ALERT,payload:{error:err.response.data.msg}});
    }
}

export const removeNotify =({msg,auth,socket})=> async(dispatch)=>{
    try {
        const res=await deleteDataAPI(`notify/${msg.id}?url=${msg.url}`,auth.token)
        console.log("sjbdjsbd",res.data)
        socket.emit('removenotify',msg)
    } catch (err) {
        dispatch({type: globaTypes.ALERT,payload:{error:err.response.data.msg}});
    }
}

export const getNotifies = (token) => async (dispatch) => {
    try {
        const res = await getDataAPI('notifies', token)
        console.log("rp",res)
        dispatch({ type: NOTIFY_TYPES.GET_NOTIFIES, payload: res.data.notifies })
    } catch (err) {
        dispatch({type:globaTypes.ALERT, payload: {error: err.response.data.msg}})
    }
}


export const isReadNotify = ({msg,auth}) => async (dispatch) => {
    dispatch({type: NOTIFY_TYPES.UPDATE_NOTIFY, payload: {...msg, isRead: true}})
    try {
        await patchDataAPI(`/isReadNotify/${msg._id}`, null, auth.token)
    } catch (err) {
        dispatch({type:globaTypes.ALERT, payload: {error: err.response.data.msg}})
    }
}

export const deleteAllNotifies = (token) => async (dispatch) => {
    dispatch({type: NOTIFY_TYPES.DELETE_ALL_NOTIFIES, payload: []})
    try {
        await deleteDataAPI('deleteAllNotify', token)
    } catch (err) {
        dispatch({type: globaTypes.ALERT, payload: {error: err.response.data.msg}})
    }
}