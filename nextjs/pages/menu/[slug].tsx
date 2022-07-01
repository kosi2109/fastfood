import { NextPage } from 'next'
import React from 'react'
import { allMenus, showMenus } from '../../api'
import AppLayout from '../../components/Layouts/AppLayout'
import { CATEGORY, MENU } from '../../types'

interface Props{
  menu : MENU
}

const Menu : NextPage<Props> = ({menu})=> {
  
  return (
    <AppLayout title="Detail" back={true} >
      <div className='pt-2'>
        <div className='mb-2 w-full flex justify-center items-center'>
          <img className='w-2/3 rounded-md' src={menu.cover_img} alt={menu.name} />
        </div>

        <div>
          <h1 className='text-3xl font-semibold mb-2'>
          {menu.name}
          </h1>
          <h5 className='mb-3 text-lg font-semibold'>Category 
            <ul className='font-medium text-md'>
              {menu.categories.map((category:CATEGORY)=> (<li key={category.id}>- {category.name}</li>))}
            </ul>
          </h5>
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
            <p className='text-md text-textBlack'>{menu.description}</p>
          </div>
          <button className='w-full h-10 bg-bgGreen text-textWhite rounded-md'>Add To Cart</button>
        </div>
      </div>
    </AppLayout>
  )
}

export async function getStaticPaths(){
  const menus = await allMenus();
  return {
    paths : menus.data.map(({slug}:any)=> ({params:{slug}})),
    fallback : false
  }
}

export async function getStaticProps({params}:any){
  const menu = await showMenus(params.slug);
  return {
    props : {menu:menu.data}
  }
}

export default Menu