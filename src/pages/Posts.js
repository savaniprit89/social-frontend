import React, { useEffect, useState } from 'react'
import PostThumb from './PostThumb';
import LoadICON from '../images/loading.gif'
import Loadmorebtn from './Loadmorebtn';
import { getDataAPI } from '../utils/fetchData';
import { PROFILE_TYPES } from '../redux/actions/profileAction';
function Posts({auth,profile,dispatch,id}) {
  const [posts,setposts]=useState([]);
  const [result, setResult] = useState(9)
  const [page, setPage] = useState(0)
  const [load,setload]=useState(false);
  useEffect(() => {
    profile.userposts.forEach(data => {
        if(data._id === id){
            setposts(data.posts)
            setResult(data.result)
            setPage(data.page)
        }
    })
},[profile.userposts, id])
const handleLoadmore = async()=>{

  setload(true);
  const res= await getDataAPI(`user_posts/${id}?limit=${page * 3}`,auth.token)
  console.log(res.data)
  const newData = {...res.data, page: page + 1, _id: id}
  dispatch({type: PROFILE_TYPES.UPDATE_POST, payload: newData})
  setload(false)
}
  return ( 
    <div>
       <PostThumb posts={posts} result={result}  />
       {
      load && <img src={LoadICON} className='d-block mx-auto py-4'></img>
    }
    {
       <Loadmorebtn result={result} page={page} load={load} handleLoadmore={handleLoadmore} ></Loadmorebtn>
    }
    </div>
  )
}

export default Posts
