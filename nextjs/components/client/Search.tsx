import { NextPage } from 'next'
import { useRouter } from 'next/router';
import React from 'react'
import {FiSearch} from "react-icons/fi"

const Search : NextPage = ()=> {
  const router = useRouter();

  const searchOpen = ()=>{
    router.push('search')
  }
  return (
    <div className='md:hidden w-full relative h-10 text-textGray mb-5'>
        <div className='absolute left-0 top-0 h-full w-10 flex justify-center items-center'>
            <FiSearch size={20} />
        </div>
        <input onFocus={searchOpen} type="text" className='pl-10 w-full h-full border border-textGray flex rounded-md focus:outline-textGray' />
    </div>
  )
}

export default Search