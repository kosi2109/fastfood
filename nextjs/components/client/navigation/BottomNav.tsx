import { NextPage } from 'next'
import Link from 'next/link'
import React, {useEffect, useState } from 'react'
import { AiFillShop, AiOutlineUnorderedList } from 'react-icons/ai'
import {ImHome} from "react-icons/im"
import {FaShoppingCart, FaUserAlt} from "react-icons/fa"
import { useRouter } from 'next/router'
import { AppState } from '../../../context/AppProvider'

const classN = "w-1/4 relative cursor-pointer flex items-center justify-center flex-col";
const active = "w-1/4 relative cursor-pointer text-textGreen flex items-center justify-center flex-col";

const BottomNav : NextPage = ()=> {
    const router = useRouter();
    const {cartItemTotal} = AppState();
    const [animate, setAnimate] = useState("w-5 h-5");
    useEffect(()=>{
        setAnimate("w-6 h-6");
        setTimeout(()=>{
            setAnimate("w-5 h-5");
        },1000)
    },[cartItemTotal])
    
  return (
    <div className='z-20 md:px-28 fixed bottom-0 left-0 w-full bg-bgWhite h-16 flex justify-between items-center'>
        
        <Link href="/">
            <div className={router.pathname == "/" ? active : classN }>
                <ImHome size={20}/>
                Home
            </div>
        </Link>

        <Link href="/menu">
            <div className={router.pathname.startsWith("/menu") ? active : classN }>
                <AiOutlineUnorderedList size={20}/>
                Menu
            </div>
        </Link>

        <Link href="/cart">
            <div className={router.pathname == "/cart" || router.pathname == "/order" ? active : classN }>
                <div className='relative flex items-center justify-center flex-col'>
                    <FaShoppingCart className='animate-shake' size={20}/>
                    Cart
                    {(router.pathname !== "/cart" && router.pathname !== "/order") && 
                        <div className={`absolute transition-all ease -top-2 -right-2 bg-red text-textWhite rounded-full flex items-center justify-center ` + animate}>
                            <h5 className='text-xs font-semibold'>{cartItemTotal}</h5>    
                        </div>
                    }
                </div>
            </div>
        </Link>

        <Link href="/profile">
            <div className={router.pathname == "/profile" ? active : classN }>
                <FaUserAlt size={20}/>
                Profile
            </div>
        </Link>
        
    </div>
  )
}

export default BottomNav