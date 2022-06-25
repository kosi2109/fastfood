import { useRouter } from 'next/router'
import React from 'react'
import AppLayout from '../../components/Layouts/AppLayout'
import img from "../../public/assets/malar.png"


const Menu = ()=> {
  const router = useRouter();
  const { slug } = router.query;
  
  return (
    <AppLayout title="Detail" back={true} >
      <div className='pt-2'>
        <div className='mb-2 w-full flex justify-center items-center'>
          <img className='w-2/3 rounded-md' src={img.src} alt="img" />
        </div>

        <div>
          <h1 className='text-3xl font-semibold mb-2'>
            {slug}
          </h1>
          <h5 className='mb-3 font-semibold'>Category - Malar Shan Kaw</h5>
          <div className='columns-6 w-full mb-3 gap-4 mb-2'>
            <div className='shadow-lg cursor-pointer text-center mb-2 font-semibold text-lg p-1 -my-1 text-textWhite rounded-md border-2 bg-bgGreen'>
              <p>S</p>
            </div>
            <div className='cursor-pointer text-center mb-2 font-semibold text-lg p-1 text-textGreen rounded-md border-2 border-bgGreen'>
              <p>M</p>
            </div>
            <div className='cursor-pointer text-center mb-2 font-semibold text-lg p-1 text-textGreen rounded-md border-2 border-bgGreen'>
              <p>L</p>
            </div>    
          </div>
          
          <div className='mb-3'>
            <h2 className='font-semibold text-lg'>Description</h2>
            <p className='text-md text-textBlack'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius, officia.</p>
          </div>
          <button className='w-full h-10 bg-bgGreen text-textWhite rounded-md'>Add To Cart</button>
        </div>
      </div>
    </AppLayout>
  )
}

export default Menu