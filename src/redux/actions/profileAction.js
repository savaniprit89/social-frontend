
import { getDataAPI, patchDataAPI } from '../../utils/fetchData'
import { imageUpload } from '../../utils/imageUpload'
import { DeleteData, globaTypes } from './globalTypes'
import { createNotify, removeNotify } from './notifyAction'
import { Post_TYPES } from './postAction'


export const PROFILE_TYPES={
    LOADING:'LOADING_PROFILE',
    GET_USER:'GET_PROFILE_USER',
    FOLLOW:'FOLLOW',
    UNFOLLOW:'UNFOLLOW',
    GET_ID:'GET_PROFILE_ID',
    GET_POSTS:'GET_PROFILE_POSTS',
    UPDATE_POST:'UPDATE_PROFILE_POST',
}

export const getProfileUsers=({ids,id,auth})=> async (dispatch)=>{
    dispatch({type: PROFILE_TYPES.GET_ID,payload:id})
    
    try {
        dispatch({type: PROFILE_TYPES.LOADING,payload:true})

       
        const res=  getDataAPI(`user/${id}`,auth.token)
        const res1= getDataAPI(`user_posts/${id}`,auth.token)

        const users=await res;
        const posts=await res1;

        dispatch({type: PROFILE_TYPES.GET_USER,payload:users.data})
        dispatch({type: PROFILE_TYPES.GET_POSTS,payload:{...posts.data,_id:id,page:2}})
        dispatch({type: PROFILE_TYPES.LOADING,payload:false})
    } catch (err) {
        dispatch({type: globaTypes.ALERT,payload:{error:err.response.data.msg}});
    }

}


export const updateProfileuser=({userData,avatar,auth}) => async(dispatch)=>{


    console.log(userData,avatar)
    if(!userData.fullname){
        return dispatch({type:globaTypes.ALERT,payload:{error: "please add fullname"}});
    }
    if(userData.fullname.length > 25){
        return dispatch({type:globaTypes.ALERT,payload:{error: "your fullname too long"}});
    }
    if(userData.story.length > 200){
        return dispatch({type:globaTypes.ALERT,payload:{error: "your story too long"}});
    }

try {
    let media;
    dispatch({type:globaTypes.ALERT,payload:{loading:true}})

    if(avatar){
        media =await imageUpload([avatar])
    }
    console.log(media)
    const res=await patchDataAPI("user",{...userData,avatar:avatar ? media[0].url : auth.user.avatar},auth.token)

dispatch({type:globaTypes.AUTH,payload:{...auth,user:{...auth.user,...userData,avatar:avatar? media[0].url : auth.user.avatar}}})
    dispatch({type:globaTypes.ALERT,payload:{success : res.data.msg}})
} catch (err) {
    dispatch({type:globaTypes.ALERT,payload:{error:err.response.data}});
}

}



export const follow=({users,user,auth,socket}) => async (dispatch) =>{
    /*
    let newUser={...user,followers:[...user.followers,auth.user]};
    console.log(newUser)*/
    let newUser;
    
    if(users.every(item => item._id !== user._id)){
        newUser = {...user, followers: [...user.followers, auth.user]}
    }else{
        users.forEach(item => {
            if(item._id === user._id){
                newUser = {...item, followers: [...item.followers, auth.user]}
            }
        })
    }
    dispatch({type:PROFILE_TYPES.FOLLOW,payload:newUser});
    dispatch({type:globaTypes.AUTH,payload:{...auth,user:{...auth.user,following:[...auth.user.following,newUser]}}})

try {
  const res=  await patchDataAPI(`user/${user._id}/follow`,null,auth.token);
    socket.emit('follow',res.data.newUser)


       // Notify
       const msg = {
        id: auth.user._id,
        text: 'has started to follow you.',
        recipients: [newUser._id],
        url: `/profile/${auth.user._id}`,
    }

    dispatch(createNotify({msg, auth, socket}))
} catch (err) {
    dispatch({type:globaTypes.ALERT,payload:{error:err.response.data}});
}
}


export const unfollow=({users,user,auth,socket}) => async (dispatch) =>{
   /*let newUser={...user,followers:user.followers.filter(item => item._id !== auth.user._id)};
   let newUser={...user,followers:DeleteData(user.followers,auth.user._id)};
*/
   let newUser;

    if(users.every(item => item._id !== user._id)){
        newUser = {...user, followers: DeleteData(user.followers, auth.user._id)}
    }else{
        users.forEach(item => {
            if(item._id === user._id){
                newUser = {...item, followers: DeleteData(item.followers, auth.user._id)}
            }
        })
    }
    dispatch({type:PROFILE_TYPES.UNFOLLOW,payload:newUser});
    dispatch({type:globaTypes.AUTH,payload:{...auth,user:{...auth.user,following:DeleteData(auth.user.following,newUser._id)}}})

    try {
      const res=await patchDataAPI(`user/${user._id}/unfollow`,null,auth.token);
      socket.emit('unfollow',res.data.newUser)

       // Notify
       const msg = {
        id: auth.user._id,
        text: 'has started to follow you.',
        recipients: [newUser._id],
        url: `/profile/${auth.user._id}`,
    }

    dispatch(removeNotify({msg, auth, socket}))
    } catch (err) {
        dispatch({type:globaTypes.ALERT,payload:{error:err.response.data}});
    }

}










/*

export const getProfileUsers=({users,id,auth})=> async (dispatch)=>{
    console.log({users,id,auth})
if(users.every(user => user._id !== id)){
  console.log()
    
    
    try {
        dispatch({type: PROFILE_TYPES.LOADING,payload:true})

       
        const res= await getDataAPI(`user/${id}`,auth.token)
        
        dispatch({type: PROFILE_TYPES.GET_USER,payload:res.data})
        dispatch({type: PROFILE_TYPES.LOADING,payload:false})
    } catch (err) {
        dispatch({type: globaTypes.ALERT,payload:{error:err.response.data.msg}});
    }
}
}*/