import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserCard from '../../components/UserCard'
import { getDataAPI } from '../../utils/fetchData'
import { globaTypes } from '../../redux/actions/globalTypes'
import { useNavigate, useParams } from 'react-router-dom'
import { MESS_TYPES, getConversations } from '../../redux/actions/messageAction'
function Leftside() {
    const { auth,message} = useSelector(state => state)
    const [search, setSearch] = useState('')
    const [searchUsers, setSearchUsers] = useState([])
const pageEnd=useRef();
const [page, setPage] = useState(0)

    const dispatch = useDispatch()
    const navigate=useNavigate()
    const {id}=useParams()
    const isActive = (user) => {
        if(id === user._id) return 'active';
        return ''
    }
    const handleSearch = async e => {
        e.preventDefault()
        if(!search) return setSearchUsers([]);

        try {
            const res = await getDataAPI(`search?username=${search}`, auth.token)
            setSearchUsers(res.data.users)
        } catch (err) {
            dispatch({
                type: globaTypes.ALERT, payload: {error: err.response.data.msg}
            })
        }
    }
    const handleAddUser = (user) => {
        setSearch('')
        setSearchUsers([])
       // dispatch(addUser({user,message}))
        dispatch({type: MESS_TYPES.ADD_USER, payload: {...user, text: '', media: []}})
        // dispatch({type: MESS_TYPES.CHECK_ONLINE_OFFLINE, payload: online})
        return navigate(`/message/${user._id}`)
        // navigate("/");
    }
    useEffect(() => {
        if(message.firstLoad) return;
        dispatch(getConversations({auth}))
    },[dispatch, auth, message.firstLoad])




    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting){
                setPage(p => p + 1)
            }
        },{
            threshold: 0.1
        })
    
        observer.observe(pageEnd.current)
        console.log("page",page)
    },[setPage])
    useEffect(() => {
    if(message.resultUsers >= (page-1) * 9 && page > 1 ){
        dispatch(getConversations({auth,page}))
    }
    }, [message.resultUsers,page,auth,dispatch])

  return (
    <>
    <form className="message_header"  onSubmit={handleSearch}  >
        <input type="text" 
        value={search}  
                placeholder="Enter to Search..."
                onChange={e => setSearch(e.target.value)}
        />

        <button type="submit" style={{display: 'none'}}>Search</button>
    </form>
    <div className="message_chat_list">
    {
                    searchUsers.length !== 0
                    ?  <>
                        {
                            searchUsers.map(user => (
                                <div key={user._id} className={`message_user ${isActive(user)}`}
                                onClick={() => handleAddUser(user)}
                                >
                                    <UserCard user={user}  />
                                </div>
                            ))
                        }
                        
                    </>:
                    <>
                        {
                            message.users.map(user => (
                                <div key={user._id} className={`message_user ${isActive(user)}`}
                                 onClick={() => handleAddUser(user)}
                                >
                                    <UserCard user={user} msg={true}>
                                    <i className="fas fa-circle" />
                                        
                                    </UserCard>
                                </div>
                            ))
                        }
                    </>
    }
    <button ref={pageEnd}>load more</button>
    </div>
    </>
  )
}

export default Leftside
  