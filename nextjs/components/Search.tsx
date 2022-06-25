import { NextPage } from 'next'
import React from 'react'
import {FiSearch} from "react-icons/fi"

const Search : NextPage = ()=> {
  return (
    <div className='w-full relative h-10 text-textGray mb-5'>
        <div className='absolute left-0 top-0 h-full w-10 flex justify-center items-center'>
            <FiSearch size={20} />
        </div>
        <input type="text" className='pl-10 w-full h-full border border-textGray flex rounded-md focus:outline-textGray' />
    </div>
  )
}

export default Search