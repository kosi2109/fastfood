import Link from 'next/link'
import { ImHome } from 'react-icons/im'
import { motion } from 'framer-motion'


const GuestLayout = ({children} : any) => {
  return (
    <motion.div exit={{ opacity : 0 }} className='relative px-3'>
        <div className='absolute top-5 left-5 z-20 md:top-10 md:left-10 border-2 hover:border-4 cursor-pointer bg-bgWhite hover:bg-bgGreen hover:text-bgWhite text-bgGreen rounded-full p-2'>
            <Link href="/" >
                <ImHome size={23}/>
            </Link>
        </div>
        {children}
    </motion.div>
  )
}

export default GuestLayout