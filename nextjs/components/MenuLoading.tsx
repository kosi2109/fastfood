import React from 'react'
import { BeatLoader } from 'react-spinners'

const MenuLoading = ()=> {
  return (
    <div className='flex justify-center items-center h-40'>
        <BeatLoader size={10} color='#307A59'/>
    </div>
  )
}

export default MenuLoading