import React from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import img from '../../public/assets/malar.png'

const CartItem = ()=> {
  return (
    <div className='w-full flex py-3 border-b-2'>
        <div className='w-2/6'>
            <img className='md:h-40 rounded-md' src={img.src} alt="img" />
        </div>
        <div className='w-4/6 px-2 flex flex-col justify-between items-start'>
            <h2 className='text-lg font-semibold'>Malar Shan Kaw</h2>
            <div className='w-full flex justify-end'>
                <div className='mr-5 flex justify-between items-center bg-bgLightGreen rounded-xl h-7'>
                    <div className='flex items-center justify-center p-1 text-center font-semibold text-lg cursor-pointer rounded-full bg-textGray text-textWhite'>
                        <AiOutlineMinus size={15}/>
                    </div>
                    <span className='px-2'>
                        1
                    </span>
                    <div className='flex items-center justify-center p-1 text-center font-semibold text-lg cursor-pointer rounded-full bg-bgGreen text-textWhite'>
                        <AiOutlinePlus size={15}/>
                    </div>
                </div>
                <h5 className='font-semibold text-textGreen text-lg'>3500 Ks</h5>
            </div>
        </div>
    </div>
  )
}

export default CartItem