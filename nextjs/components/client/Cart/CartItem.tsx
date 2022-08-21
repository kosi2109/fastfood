import React from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { AppState, CART_ACTION } from '../../../context/AppProvider'
import { MENU, SIZE } from '../../../types'

const CartItem = ({menu,size,quantity}:{menu:MENU,size:SIZE,quantity:number})=> {
    const {increaseItem} = AppState();

    const getPrice = (size: SIZE) => {
        let price = size?.price;
        if (isDiscountActive()) {
          price = size?.price - size?.price * (menu?.discount.discount / 100);
        }
        return price;
      };
    
      function isDiscountActive () {
        let today = new Date();
        let from = new Date(menu?.discount?.discount_from);
        let to = new Date(menu?.discount?.discount_to);
        if (from <= today && today <= to ) {
          return true;
        }
        return false;
      }
      
  return (
    <div className='w-full flex py-3 border-b-2'>
        <div className='w-2/6 h-20 md:h-40 rounded-md overflow-hidden'>
            <img className='object-cover w-full h-full' src={menu.cover_img} alt="img" />
        </div>
        <div className='w-4/6 px-2 flex flex-col justify-between items-start'>
            <h2 className='text-lg font-semibold'>{menu.name} ({size.name})</h2>
            <div className='w-full flex justify-between'>
                <div className='mr-5 flex justify-between items-center bg-bgLightGreen rounded-xl h-7'>
                    <div onClick={()=>increaseItem(menu,size,CART_ACTION.DECREASE)} className='flex items-center justify-center p-1 text-center font-semibold text-lg cursor-pointer rounded-full bg-textGray text-textWhite'>
                        <AiOutlineMinus size={15}/>
                    </div>
                    <span className='px-2 w-8 text-center'>
                        {quantity}
                    </span>
                    <div onClick={()=>increaseItem(menu,size,CART_ACTION.INCREASE)} className='flex items-center justify-center p-1 text-center font-semibold text-lg cursor-pointer rounded-full bg-bgGreen text-textWhite'>
                        <AiOutlinePlus size={15}/>
                    </div>
                </div>
                <h5 className='font-semibold text-textGreen text-lg'>{getPrice(menu.sizes.filter((s)=> s.name == size.name)[0]) * quantity}</h5>
            </div>
        </div>
    </div>
  )
}

export default CartItem