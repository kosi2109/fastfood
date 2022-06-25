import { NextPage } from 'next'
import React from 'react'
import AppLayout from '../components/Layouts/AppLayout'
import Detail from '../components/Profile/Detail'
import ProfileImage from '../components/Profile/ProfileImage'

const profile : NextPage = ()=> {
  return (
    <AppLayout title="Profile" >
        <div className='py-1 flex items-center flex-col w-full'>
            <div className='w-full flex items-center justify-center mb-3'>
                <ProfileImage size={150} />
            </div>
            <Detail title='Full Name' value='Si Thu Htet' />
            <Detail title='Email' value='kosi@gmail.com' />
            <Detail title='Phone' value='09781903836' />
        </div>
    </AppLayout>
  )
}

export default profile