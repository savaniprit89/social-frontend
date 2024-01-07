import React from 'react'
import UserCard from './UserCard'
import { useDispatch, useSelector } from 'react-redux'
import FollowBtn from './FollowBtn'
function Following({users,setShowFollowing}) {
    const { auth ,profile} = useSelector(state => state)
    const dispatch = useDispatch()
  return (
<div className='follow'>
      <div className='follow_box'> 
<h5 className='text-center'> following</h5>
<hr/>
<div className='follow_content'>
{
   users.map(user =>(
    <UserCard user={user} key={user._id} setShowFollowing={setShowFollowing}
    >

        {
            auth.user._id !== user._id && <FollowBtn user={user}></FollowBtn>
        }
    </UserCard>
    
   )) 

}
</div>
<div className='close' onClick={() => setShowFollowing(false)}>&times;</div>
      </div>
    </div>
  )
}

export default Following