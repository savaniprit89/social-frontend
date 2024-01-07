import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import LoadIcon from '../../images/loading.gif'
import PostCard from './PostCard';
import { getPost } from '../../redux/actions/postAction';
import CardHeader from '../Home/CardHeader';
import CardBody from '../Home/CardBody';
import CardFooter from '../Home/CardFooter';
import InputComment from '../Home/InputComment';
import Comment from '../Home/Comment';
function Id() {
    const {id} =useParams();
    const [post, setpost] = useState([])

    const {auth,detailpost}=useSelector(state => state);
    const dispatch=useDispatch();

    useEffect(() => {
        console.log(detailpost)
    dispatch(getPost({detailpost,id,auth}))
    if(detailpost.length > 0){
        const newArr = detailpost.filter(post => post._id === id)
        setpost(newArr)
    }
},[detailpost, dispatch, id, auth])
  return (
    <div className="posts">
            {
                post.length === 0 &&
                <img src={LoadIcon} alt="loading" className="d-block mx-auto my-4" />
            }

            {
                post.map(post=> (
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
        </div>
  )
}

export default Id
