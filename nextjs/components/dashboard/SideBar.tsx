import React from 'react'
import { AiFillDashboard, AiOutlineMenu } from 'react-icons/ai'
import SideBarItem from './SideBarItem'

const sidebars = [
    {
        name : "Dashboard",
        icon : <AiFillDashboard size={20} />,
        url : "/"
    },
    {
        name : "Menu Management",
        icon : <AiOutlineMenu size={20} />,
        url : "/dashboard/menu-management"
    },
    {
        name : "Order Management",
        url : "/"
    },
    {
        name : "Order",
        url : "/",
        subitems : [
            {
                name : "Order Management",
                url : "/"
            },
        ]
    },
]

function SideBar() {
  return (
    <div className='w-full bg-bgGreen h-screen p-1 overflow-y-auto'>
        <div className='flex border-b-2 py-3'>
            <h1 className='text-2xl text-bgWhite font-semibold'>Fastfood Dashboard</h1>
        </div>
        {sidebars.map((sidebar,i) => (
            <SideBarItem key={i} sidebar={sidebar} />
        ))}
    </div>
  )
}

export default SideBar