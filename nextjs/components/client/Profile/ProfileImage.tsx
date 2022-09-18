import React from 'react'
import img from "../../../public/assets/textlogo.png"


const ProfileImage = ({image_url} : {image_url : string})=> {
  return (
    <div className='w-full md:w-1/2 lg:w-1/3 flex items-center justify-center aspect-square rounded-full overflow-hidden border-2'>
        <img className='w-full h-full object-cover' src={image_url ? image_url : img.src} alt="profile_image" />
    </div>
  )
}

export default ProfileImage