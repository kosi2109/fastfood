import React from 'react'

function ContentWrapper({children, name} : any) {
  return (
    <div className='relative'>
        <h2 className='text-3xl text-textGreen'>{name}</h2>
        <div className='w-full my-3 p-3'>
            {children}
        </div>
    </div>
  )
}

export default ContentWrapper