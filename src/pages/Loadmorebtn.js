import React from 'react'

function Loadmorebtn({result,page,load,handleLoadmore}) {
  return (
    <>
    {
        result < 3 * (page-1) ? '':
        !load && <button className='btn btn-dark mx-auto d-block ' onClick={handleLoadmore}>load more</button>
    }
    </>
  )
}

export default Loadmorebtn
