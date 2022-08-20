import { NextPage } from 'next'
import React from 'react'

interface Props {
    title? : string,
    value? : string
}

const Detail : NextPage<Props> = ({title,value})=> {
  return (
    <div className='w-full md:w-1/2 mb-3 bg-bgGray border-2 rounded-md px-3 py-2'>
        <h3 className='text-textGray font-semibold'>{title}</h3>
        <h3 className='font-bold text-lg text-textBlack' >{value}</h3>
    </div>
  )
}

export default Detail