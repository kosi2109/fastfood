import { NextPage } from 'next'
import React from 'react'
import img from "../../public/assets/profile.jpg"

interface Props{
    size? : number
}

const ProfileImage : NextPage<Props> = ({size})=> {
  return (
    <div style={{width : `${size}px` , height: `${size}px`}} className={`rounded-full overflow-hidden`}>
        <img src={img.src} alt="img" />
    </div>
  )
}

export default ProfileImage