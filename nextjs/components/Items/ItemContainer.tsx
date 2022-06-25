import React from 'react'
import Items from './Items'

const ItemContainer = ({title , menus = []} : any)=> {
  return (
    <div className='flex flex-col w-full mb-5'>
        <h3 className='font-bold text-lg mb-2'>{title}</h3>     
          <Items menus={menus} />
    </div>
  )
}

export default ItemContainer