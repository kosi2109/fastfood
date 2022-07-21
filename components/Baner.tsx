import { NextPage } from 'next'
import React from 'react'
import malar from "../public/assets/malar.webp"


const Baner : NextPage = ()=> {
  return (
    <div className='w-full px-5 py-2 mb-3 bg-bgLightGreen flex items-center rounded-md'>
        <div className='w-4/6 flex flex-col items-start justify-between'>
            <h4 className='font-semibold mb-2 text-xl md:text-6xl text-textBlack'>Malar Shan Kaw</h4>
            <h5 className='font-medium mb-2 text-textBlack mb-2 md:text-3xl'>Discount 50%</h5>
            <button className='bg-bgGreen text-textWhite p-2 font-bold rounded-md md:text-lg md:px-3 '>Order Now</button>
        </div>
        <div className='w-2/6'>
          <img src={malar.src} alt="img" />
        </div>
    </div>
  )
}

export default Baner