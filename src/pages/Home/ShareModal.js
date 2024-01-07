import React from 'react'
import {FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton} from 'react-share'
function ShareModal({url}) {
  return (
    <div className='d-flex justify-content-around py-2 bg-light'>
     <FacebookShareButton url={url}>
        <FacebookIcon round={true} size={32}></FacebookIcon>
     </FacebookShareButton>
     <TwitterShareButton url={url}>
        <TwitterIcon round={true} size={32}></TwitterIcon>
     </TwitterShareButton>
     <WhatsappShareButton  url={url}>
<WhatsappIcon round={true} size={32} ></WhatsappIcon>
     </WhatsappShareButton>
    </div>
  )
}

export default ShareModal
