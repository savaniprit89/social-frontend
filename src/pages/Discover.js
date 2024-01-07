import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DISCOVER_TYPES, getdiscoverPosts } from '../redux/actions/discoverAction'
import LoadICON from '../images/loading.gif'
import PostThumb from './PostThumb';
import Loadmorebtn from './Loadmorebtn';
import { getDataAPI } from '../utils/fetchData';
function Discover() {
  const { auth,discover } = useSelector(state => state)
  const [load,setload]=useState(false);
  const dispatch = useDispatch()
useEffect(() => {
  if(!discover.firstLoad){
dispatch(getdiscoverPosts(auth.token))
  }
}, [dispatch,auth.token,discover.firstLoad])
const handleLoadmore = async()=>{

  setload(true);
  const res= await getDataAPI(`post_discover?num=${discover.page * 9}`,auth.token)
  console.log(res.data);
  dispatch({type:DISCOVER_TYPES.UPDATE_POST,payload:res.data});
  setload(false)
}
  return (
    <div>
    {
      discover.loading? <img src={LoadICON} className='d-block mx-auto py-4'></img>:
      <PostThumb posts={discover.posts} result={discover.result}></PostThumb>
    }
    {
      load && <img src={LoadICON} className='d-block mx-auto py-4'></img>
    }
    {
      !discover.loading &&  <Loadmorebtn result={discover.result} page={discover.page} load={load} handleLoadmore={handleLoadmore} ></Loadmorebtn>
    }
    
    </div>
  )
}

export default Discover
