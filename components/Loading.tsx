import React from 'react'
import BeatLoader from "react-spinners/BeatLoader"
const Loading = ()=> {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
        <BeatLoader className='-mt-20' color='#307A59'/>
    </div>
  )
}

export default Loading