import React from 'react'
import SideBar from '../dashboard/SideBar'

function DashboardLayout({children} : any) {
  return (
    <div className='flex relative h-screen'>
        <div className='w-1/6 h-full'>
            <SideBar />
        </div>
        <div className='w-5/6 h-full overflow-auto p-2'>
            {children}
        </div>
    </div>
  )
}

export default DashboardLayout