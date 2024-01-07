import React, { useEffect, useState } from 'react'
import PostThumb from './PostThumb';
import LoadICON from '../images/loading.gif'
import Loadmorebtn from './Loadmorebtn';
import { getDataAPI } from '../utils/fetchData';
import { PROFILE_TYPES } from '../redux/actions/profileAction';
import { globaTypes } from '../redux/actions/globalTypes';
function Saved({auth,dispatch}) {
  const [savedposts,setsavedposts]=useState([]);
  const [result, setResult] = useState(9)
  const [page, setPage] = useState(2)
  const [load,setload]=useState(false);
  useEffect(() => {
   setload(true)
   getDataAPI(`getsavepost`,auth.token).then(res =>{
    setsavedposts(res.data.savedp)
    setResult(res.data.result)
    setload(false)
   }).catch(err =>{
    dispatch({type: globaTypes.ALERT, payload: {error:err.response.data.msg}})
   })
   
   return () => setsavedposts([]);
},[auth.token,dispatch])
const handleLoadmore = async()=>{

  setload(true);
  const res= await getDataAPI(`getsavepost?limit=${page * 3}`,auth.token)
  setsavedposts(res.data.savedp);
  setResult(res.data.result)
  setPage(page +1 );
  setload(false)
}
  return ( 
    <div>
       <PostThumb posts={savedposts} result={result}  />
       {
      load && <img src={LoadICON} className='d-block mx-auto py-4'></img>
    }
    {
       <Loadmorebtn result={result} page={page} load={load} handleLoadmore={handleLoadmore} ></Loadmorebtn>
    }
    </div>
  )
}

export default Saved
