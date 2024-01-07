import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Avatar from '../../components/Avatar'
import { globaTypes } from '../../redux/actions/globalTypes'

function Status() {
    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()
  return (
    <div className="status my-3 d-flex">
    <Avatar src={auth.user.avatar} size="big-avatar" />
    
    <button className="statusBtn flex-fill"
    onClick={() => dispatch({ type:globaTypes.STATUS, payload: true })}>
        {auth.user.username}, what are you thinking?
    </button>
</div>
  )
}

export default Status
