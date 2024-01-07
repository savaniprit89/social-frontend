import React from 'react'
import UserCard from './UserCard'
import { useDispatch, useSelector } from 'react-redux'
import FollowBtn from './FollowBtn'
function Followers({users,setShowFollowers}) {
    const { auth ,profile} = useSelector(state => state)
    const dispatch = useDispatch()
  return (
<div className='follow'>
      <div className='follow_box'> 
<h5 className='text-center'> followers</h5>
<hr/>
<div className='follow_content'>
{
   users.map(user =>(
    <UserCard user={user} key={user._id} setShowFollowers={setShowFollowers}
    >

        {
            auth.user._id !== user._id && <FollowBtn user={user}></FollowBtn>
        }
    </UserCard>
    
   )) 

}
</div>
<div className='close' onClick={() => setShowFollowers(false)}>&times;</div>
      </div>
    </div>
  )
}

export default Followers


/*



*/