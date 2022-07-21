import React from 'react'
import { CART_ITEM } from '../../context/AppProvider'
import CartItem from './CartItem'

const CartItemContainer = ({cartItems}:{cartItems : CART_ITEM[]})=> {
  
  return (
    <div className='flex flex-col w-full w-full transition-all'>
        {cartItems.map((menu:CART_ITEM,i)=>(
          <CartItem key={i} menu={menu.item} size={menu.size} quantity={menu.quantity} />
        ))}
    </div>
  )
}

export default CartItemContainer