import React from 'react'

function Loading() {
  return (
    <div style={{background:"#0005",color:"white",top:0,left:0,zIndex:50}} className='position-fixed w-100 h-100 text-center loading'>
    <svg height="250" width="250" viewBox='0 0 40 50'>
<polygon stroke='#fff' strokeWidth="1" fill='none' points='20,1 40,40 1,40'></polygon>
<text fill='#fff' x='5' y='47'>Loading</text>
    </svg>
    </div>
  )
}

export default Loading