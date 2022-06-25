import Link from 'next/link'
import React from 'react'
import img from "../../public/assets/malar.png"

const SingleItem = ({menu}:any)=> {
  return (
    <Link href={`/menu/${menu?.slug}`}>
      <div className='mr-2 pb-2'>
          <div className='w-full rounded-md overflow-hidden mb-1'>
              <img className='w-full' src={menu?.cover_img} alt="img" />
          </div>

          <h4 className='font-semibold color-textBlack'>{menu?.name}</h4>
          <h5 className='text-textGreen font-semibold'>3500 Ks</h5>
      </div>
    </Link>
  )
}

export default SingleItem