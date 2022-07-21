import Link from 'next/link'
import React from 'react'


const SingleItem = ({menu}:any)=> {
  return (
    <Link href={`/menu/${menu?.slug}`}>
      <div className='mr-2 pb-2 block flex flex-col cursor-pointer'>
          <div className='w-full rounded-md overflow-hidden mb-1'>
              <img className='w-full aspect-square' src={menu?.cover_img} alt="img" />
          </div>
          <div className='w-full flex flex-col'>
            <h4 className='font-semibold color-textBlack truncate'>{menu?.name}</h4>
            <h5 className='text-textGreen font-semibold'>3500 Ks</h5>
          </div>
      </div>
    </Link>
  )
}

export default SingleItem