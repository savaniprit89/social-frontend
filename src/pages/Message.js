import React from 'react'
import Leftside from './Message/Leftside'

function Message() {
  return (
    <div className="message d-flex">
    <div className="col-md-4 border-right px-0">
        <Leftside />
    </div>

    <div className="col-md-8 px-0 right_mess">
        <div className="d-flex justify-content-center 
        align-items-center flex-column h-100">

            <i className="fab fa-facebook-messenger text-primary"
            style={{fontSize: '5rem'}} />
            <h4>Messenger</h4>

        </div>
    </div>
</div>
  )
}

export default Message
