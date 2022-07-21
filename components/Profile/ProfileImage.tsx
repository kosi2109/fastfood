import { NextPage } from 'next'
import React from 'react'
import img from "../../public/assets/profile.jpg"

interface Props{
    size? : number
}

const ProfileImage : NextPage<Props> = ()=> {
  return (
    <div className='w-full md:w-1/2 aspect-square rounded-full overflow-hidden'>
        <img src={img.src} alt="img" />
    </div>
  )
}

export default ProfileImage