import React, { useEffect } from 'react'
import Status from './Home/Status'
import Posts from './Home/Posts'
import { useSelector } from 'react-redux'
import LoadIcon from '../images/loading.gif'
import RightSidebar from './RightSidebar'
let scroll=0;
function Home() {
  const {post} =useSelector(state => state);



window.addEventListener('scroll',()=>{
  if(window.location.pathname === '/'){
    scroll = window.pageYOffset
    return scroll;
  }

})

useEffect(() => {
setTimeout(() => {
  window.scrollTo({top:scroll,behavior:'smooth'})
}, 100);
}, [])


  return (
    <div className='home row mx-0'>
       <div className="col-md-8">
   <Status />
   {
    post.loading?<img src={LoadIcon} className='d-block mx-auto' alt='post'></img>:  
    (post.result === 0 && post.posts.length ===0) ?<h2 className='text-center'>no post</h2>: <Posts />
   
   }
 
   </div>
   <div className='col-md-4'>
<RightSidebar />
   </div>
    </div>
  )
}

export default Home