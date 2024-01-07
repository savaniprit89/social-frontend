import React from 'react'
import CardHeader from '../Home/CardHeader'
import CardBody from '../Home/CardBody'
import CardFooter from '../Home/CardFooter'
import InputComment from '../Home/InputComment'
import Comment from '../Home/Comment'

const PostCard = ({post, theme}) => {
    return (
        <div className="card my-3"> 
        <CardHeader post={post} />
        <CardBody post={post} theme={theme} />
        <CardFooter post={post} />

        <Comment post={post} />
        <InputComment post={post} />
    </div>
    )
}


export default PostCard