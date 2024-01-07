import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from 'react-router-dom';
import Avatar from '../components/Avatar';
import { getProfileUsers } from '../redux/actions/profileAction';
import Editprofile from './Editprofile';
import FollowBtn from '../components/FollowBtn';
import Followers from '../components/Followers';
import Following from '../components/Following';
import { globaTypes } from '../redux/actions/globalTypes';
function Info({id,auth,profile,dispatch}) {
    // const {id} =useParams();
    // const { auth ,profile} = useSelector(state => state)
    // const dispatch = useDispatch()

    const [userData,setUserData]=useState([]);
    const [edit,setedit]=useState(false);
    const [showFollowers, setShowFollowers] = useState(false)
    const [showFollowing, setShowFollowing] = useState(false)

    useEffect(() => {
    if(id === auth.user._id){
      setUserData([auth.user])
        console.log(userData)
    }else{
//dispatch(getProfileUsers({users:profile.users,id,auth}))
const newData = profile.users.filter(user => user._id === id)
console.log(newData)
var clean = newData.filter((abc, index, self) =>
index === self.findIndex((t) => (t.save === newData.save && t.State === newData.State)))
console.log( clean);
setUserData(clean)
    }
    }, [id,profile.users,auth, dispatch])


    useEffect(() => {
        if(showFollowers || showFollowing || edit){
            dispatch({ type: globaTypes.MODAL, payload: true})
        }else{
            dispatch({ type: globaTypes.MODAL, payload: false})
        }
    },[showFollowers, showFollowing, edit, dispatch])
    
  return (
  
  
    <div className="info">
            {
                userData.map(user => (
                    <div className="info_container" key={user._id}>
                        <Avatar src={user.avatar} size="supper-avatar" />

                        <div className="info_content">
                            <div className="info_content_title">
                                <h2>{user.username}</h2>
                                {
                                    user._id === auth.user._id
                                    ?  <button className="btn btn-outline-info"
                                    onClick={() => setedit(true)}>
                                        Edit Profile
                                    </button>
                                    
                                    : <FollowBtn user={user} />
                                }
                            </div>

                            <div className="follow_btn">
                                <span className="mr-4" onClick={() => setShowFollowers(true)} >
                                    {user.followers.length} Followers
                                </span>
                                <span className="ml-4" onClick={() => setShowFollowing(true)} >
                                    {user.following.length} Following
                                </span>
                            </div>

                            <h6>{user.fullname} <span className="text-danger">{user.mobile}</span></h6>
                            <p className="m-0">{user.address}</p>
                            <h6 className="m-0">{user.email}</h6>
                            <a href={user.website} target="_blank" rel="noreferrer">
                                {user.website}
                            </a>
                            <p>{user.story}</p>
                    
                        </div>

                           
                        {
                          edit && <Editprofile setedit={setedit}></Editprofile>
                        }

                        {
                            showFollowers &&
                            <Followers 
                                users={user.followers} 
                            setShowFollowers={setShowFollowers} 
                            />
                        }
                        {
                            showFollowing &&
                            <Following 
                             users={user.following} 
                            setShowFollowing={setShowFollowing} 
                            />
                        }


                    </div>
                ))
            }
        </div>
  )
}

export default Info
