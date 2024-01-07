import React from 'react'
import UserCard from '../components/UserCard'
import { useDispatch, useSelector } from 'react-redux'
import LoadIcon from '../images/loading.gif'
import FollowBtn from '../components/FollowBtn'
import { getSuggestions } from '../redux/actions/suggestionAction'
function RightSidebar() {
    const {auth,suggestion}=useSelector(state => state)
    const dispatch=useDispatch()
  return (
    <div className='my-4'>
    <UserCard user={auth.user}></UserCard>
    <div className="d-flex justify-content-between align-items-center my-2">
                <h5 className="text-danger">Suggestions for you</h5>
                {
                    !suggestion.loading &&
                    <i className="fas fa-redo" style={{cursor: 'pointer'}}
                    onClick={ () => dispatch(getSuggestions(auth.token)) } />
                }
            </div>
            {
        suggestion.loading
        ? <img src={LoadIcon} alt="loading" className="d-block mx-auto my-4" />
        : <div className="suggestions">
            {
                suggestion.users.map(user => (
                    <UserCard key={user._id} user={user} >
                        <FollowBtn user={user} />
                    </UserCard>
                ))
            }
        </div>
    }
    </div>
    
  )
}

export default RightSidebar
