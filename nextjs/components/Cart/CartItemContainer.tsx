import React from 'react'
import CartItem from './CartItem'

const CartItemContainer = ()=> {
  return (
    <div className='flex flex-col w-full w-full'>
        <CartItem/>
        <CartItem/>
        <CartItem/>
    </div>
  )
}

export default CartItemContainer