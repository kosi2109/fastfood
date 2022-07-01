import { NextPage } from 'next'
import React from 'react'
import AppLayout from '../components/Layouts/AppLayout'
import Link from 'next/link'
import CartItemContainer from '../components/Cart/CartItemContainer'
import Auth from '../components/Auth'

const cart : NextPage = ()=> {
  return (
    <AppLayout title="My Cart" >
      <Auth>
        <div className='w-full mx-auto md:w-2/3 lg:w-1/2 2xl:w-1/3 flex flex-col items-center'>
            <CartItemContainer/>
            <Link href="/order" >
                <button className='mt-3 w-full h-10 rounded-md bg-bgGreen text-textWhite'>Place Order</button>
            </Link>
        </div>
      </Auth>
    </AppLayout>
  )
}

export default cart