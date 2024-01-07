import React, { useEffect, useState } from 'react'
import Info from './Info'
import Posts from './Posts'
import { useDispatch, useSelector } from 'react-redux'
import LoadIcon from '../images/loading.gif'
import { getProfileUsers } from '../redux/actions/profileAction'
import { useParams } from 'react-router-dom'
import Saved from './Saved'
function Profile() {
  const {profile,auth} =useSelector(state => state);
  const {id} =useParams();
  const [savetab,setsavetab]=useState(false);
  const dispatch=useDispatch();
  useEffect(() => {
    if(profile.ids.every(item => item !== id)){
dispatch(getProfileUsers({ids:profile.ids,id,auth}))
    }
  }, [id,auth,dispatch,profile.ids])
  return (
    <div className='profile'>
<Info  auth={auth} profile={profile} dispatch={dispatch} id={id}>
    </Info>
    {
      auth.user._id === id &&
      <div className='profile_tab'> 
      <button className={savetab ? "":"active"} onClick={() => setsavetab(false)} >Posts</button>
      <button className={savetab ? "active":""} onClick={() => setsavetab(true)} >Saved</button>
      </div>
    }
    {
      profile.loading? <img src={LoadIcon} alt='loading' className='d-block mx-auto my-4'></img>: 
      <>
{savetab ? <Saved auth={auth}  dispatch={dispatch} />:
<Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />
}
      </>
     
    }
   
   

    {/*  old thing {
      profile.loading? <img src={LoadIcon} alt='loading' className='d-block mx-auto my-4'></img>: 
      <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />
    } */}
    </div>
  )
}

export default Profile
