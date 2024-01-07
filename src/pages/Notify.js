import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import Loading from '../components/Loading';
import Toast from '../components/Toast';
import { globaTypes } from '../redux/actions/globalTypes';
function Notify() {

const state=useSelector(state=>state)
const {auth,notify}=state;
const dispatch=useDispatch()

  return (
    <div>
    {notify.loading&&<Loading></Loading>}
    
    {notify.error&&<Toast msg={{title:'error',body:notify.error}}  handleShow={()=> dispatch({type:globaTypes.ALERT,payload:{}})} bgColor="bg-danger"></Toast>}
    {notify.success&&<Toast msg={{title:'success',body:notify.success}} handleShow={()=> dispatch({type:globaTypes.ALERT,payload:{}})} bgColor="bg-success"></Toast>}
    
    </div>
  )
}

export default Notify