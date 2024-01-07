import React from 'react'
import Leftside from './Leftside'
import RightSide from './RightSide'

function MessageId() {
  return (
    <div className="message d-flex">
    <div className="col-md-4 border-right px-0 left_mess">
        <Leftside />
    </div>

    <div className="col-md-8 px-0 ">
       

           <RightSide></RightSide>

        
    </div>
</div>
  )
}

export default MessageId
