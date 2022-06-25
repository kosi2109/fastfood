import React from 'react'


const Category = ()=> {
  return (
    <ul className='flex mb-3 w-full overflow-auto py-2'>
        <li className='cursor-pointer mr-4 border-b-2 border-textGreen font-bold text-lg'>All</li>
        <li className='cursor-pointer mr-4 font-semibold text-md'>Feature</li>
        <li className='cursor-pointer mr-4 font-semibold text-md'>Soup</li>
    </ul>
  )
}

export default Category