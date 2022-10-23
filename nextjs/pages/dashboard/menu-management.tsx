import React from 'react'
import ContentWrapper from '../../components/dashboard/ContentWrapper'
import Table from '../../components/dashboard/Table'
import DashboardLayout from '../../components/Layouts/DashboardLayout'
import {BiSearch} from "react-icons/bi"

const menuTable = {
  colNames: [
      {
        name: "Name",
        key: "name",
      },
      {
        name: "Total Order",
        key: "totalOrder",
      },
    ],
    data: [],
    action : true
}
function MenuManagement() {
  return (
    <DashboardLayout>
        <ContentWrapper name="Menu Management">
            <div className='flex mb-3 items-center'>
              <button className='border mr-3 border-bgGreen py-1 px-2 rounded-full hover:bg-bgGreen hover:text-white'>Add Menu</button>
              <div className='border h-10 px-2 rounded-md flex items-center justify-center'>
                <input className='outline-none border-none' type="text" />
                <button className='w-10 flex items-center justify-center'> <BiSearch size={20} /> </button>
              </div>
            </div>
            <Table data={menuTable}/>
        </ContentWrapper>
    </DashboardLayout>
  )
}

export default MenuManagement