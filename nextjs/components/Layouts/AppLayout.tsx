import { NextPage } from 'next'
import { AppProps } from 'next/app'
import React from 'react'
import BottomNav from '../navigation/BottomNav'
import TopNav from "../navigation/TopNav"


const AppLayout = ({ children , title , back } : any)=> {
  return (
    <div className='px-10 md:px-28'>
        <TopNav title={title} back={back} />
        <div className='pt-14 pb-20 w-full'>
            {children}
        </div>
        <BottomNav/>
    </div>
  )
}

export default AppLayout