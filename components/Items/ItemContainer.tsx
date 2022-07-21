import React from 'react'
import { MENU } from '../../types'
import Items from './Items'

const ItemContainer = ({title , menus = []} : {title : string,menus:MENU[]})=> {
  return (
    <div className='flex flex-col w-full mb-5'>
        <h3 className='font-bold text-lg mb-2'>{title}</h3>     
          <Items menus={menus} />
    </div>
  )
}

export default ItemContainer