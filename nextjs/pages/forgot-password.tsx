import React, { useState } from 'react'
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { forgotPassword } from '../api'
import GuestLayout from '../components/Layouts/GuestLayout'

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleClick = ()=>{
        if (!loading) {
            setLoading(true);
    
            forgotPassword({email})
            .then((res)=> {
                toast.success(res.response.data.message);
                console.log(res);
                
                setLoading(false);
            })
            .catch((res)=> {
                console.log(res);
                
                toast.error(res?.response?.data?.message);
                setLoading(false);
            })
        }

    }
    
  return (
    <GuestLayout>
        <div className='w-full h-screen flex items-center justify-center'>
            <div className='border-2 flex flex-col rounded-sm shadow'>
                <div className='p-5 border-b-2'>
                    <h5 className='text-lg font-semibold'>Enter Email Address</h5>
                </div>
                <div className='p-5'>
                    <p className='mb-3'>Please enter your email address ,then We'll sent password reset link.</p>
                    <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder='Email' className='h-10 w-80 border-2 p-2 focus:outline-bgGreen' />
                </div>
                <div className='flex justify-end items-center px-5 py-2'>
                    <button className='bg-bgGray px-6 py-2 rounded-md text-textGreen border-2 font-semibold'>Cancel</button>
                    <button disabled={loading && true} onClick={handleClick} className='bg-bgGreen px-6 py-2 rounded-md text-white font-semibold ml-3'>
                        {loading ? <ClipLoader size={20} color="#ffffff" /> : "login"}
                    </button>
                </div>
            </div>
        </div>
    </GuestLayout>
  )
}

export default ForgotPassword