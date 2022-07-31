import Link from 'next/link'
import React from 'react'
import { MENU } from '../../types'


const SingleItem = ({menu}:{menu:MENU})=> {
  return (
    <Link href={`/menu/${menu?.slug}`}>
      <div className='mr-2 pb-2 block flex flex-col cursor-pointer'>
          <div className='w-full h-44 flex justify-center items-center rounded-md overflow-hidden mb-1'>
              <img className='object-cover w-full h-full' src={menu?.cover_img} alt="img" />
          </div>
          <div className='w-full flex flex-col'>
            <h4 className='font-semibold color-textBlack truncate'>{menu?.name}</h4>
            {menu.sizes.length > 1 ?
            <h5 className='text-textGreen font-semibold'>{menu.sizes[0].price.price} - {menu.sizes[menu.sizes.length-1].price.price} Ks</h5>
            :
            <h5 className='text-textGreen font-semibold'>{menu.sizes[0].price.price} Ks</h5>
            }
          </div>
      </div>
    </Link>
  )
}

export default SingleItem