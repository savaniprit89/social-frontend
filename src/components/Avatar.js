import React from 'react'
import { useSelector } from 'react-redux'

function Avatar ({src, size}) {
  

    return (
        <img src={src} alt="avatar" className={size}
         />
    )
}

export default Avatar