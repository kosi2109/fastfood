import { NextPage } from 'next'
import React from 'react'
import { MENU } from '../../types'
import Items from './Items'

interface Props {
  title : string,
  menus:MENU[] | null
}

const ItemContainer : NextPage<Props> = ({title , menus = []})=> {
  return (
    <div className='flex flex-col w-full mb-3'>
        <h3 className='font-bold text-lg mb-2'>{title.toUpperCase()}</h3>     
          <Items menus={menus} />
    </div>
  )
}

export default ItemContainer