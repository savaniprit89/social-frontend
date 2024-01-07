import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardHeader from './CardHeader'
import CardBody from './CardBody'
import CardFooter from './CardFooter'
import Comment from './Comment'
import InputComment from './InputComment'
import LoadICON from '../../images/loading.gif'
import Loadmorebtn from '../Loadmorebtn'
import { getDataAPI } from '../../utils/fetchData'
import { Post_TYPES } from '../../redux/actions/postAction'
function Posts() {
  const {post,auth} = useSelector(state => state)
  const dispatch=useDispatch();
console.log(post.posts)
const [load,setload]=useState(false);
const handleLoadmore = async()=>{

  setload(true);
   const res= await getDataAPI(`posts?limit=${post.page * 9}`,auth.token)
  console.log(res.data);
   dispatch({type:Post_TYPES.GET_POSTS,payload:{...res.data,page:post.page+1}});
  setload(false)
}
  return (
    <div className="posts">
    {
        post.posts.map(post => (
            <div key={post._id} className='card my-3'>
            <CardHeader post={post}>
            </CardHeader >
            <CardBody post={post}></CardBody>
            <CardFooter post={post}></CardFooter>
            <Comment post={post} />
            <InputComment post={post} />
            </div>
        ))
    }
    
      {
     load &&  <img src={LoadICON} className='d-block mx-auto py-4'></img>
    
    }
    
      <Loadmorebtn result={post.result} page={post.page} load={load} handleLoadmore={handleLoadmore} ></Loadmorebtn>
    
    </div>
  )
}

export default Posts
