import React from 'react'
import BottomNav from '../client/navigation/BottomNav'
import TopNav from "../client/navigation/TopNav"
import { motion } from 'framer-motion'

const AppLayout = ({ children , back } : any)=> {
  return (
    <motion.div exit={{ opacity : 0 }}>
        <TopNav back={back} />
        <div className='pt-16 pb-20 w-full md:pt-24 md:pb-2 px-4 md:px-10 relative overflow-x-hidden z-10'>
            {children}
        </div>
        <BottomNav/>
    </motion.div>
  )
}

export default AppLayout