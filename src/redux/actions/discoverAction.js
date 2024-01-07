import { getDataAPI } from "../../utils/fetchData";
import { globaTypes } from "./globalTypes"

export const DISCOVER_TYPES={
    LOADING:'LOADING_DISCOVER',
    GET_POSTS:'GET_DISCOVER_POSTS',
    UPDATE_POST:'UPDATE_DISCOVER_POST'
}

export const  getdiscoverPosts = (token) => async (dispatch) =>{
    try {
        dispatch({type:DISCOVER_TYPES.LOADING,payload:true});
        const res= await getDataAPI('post_discover',token)
        console.log("py",res.data);
        dispatch({type:DISCOVER_TYPES.GET_POSTS,payload:res.data})
        dispatch({type:DISCOVER_TYPES.LOADING,payload:false});
    } catch (err) {
        dispatch({ type: globaTypes.ALERT, payload: {error: err.response.data.msg} })
    }
}