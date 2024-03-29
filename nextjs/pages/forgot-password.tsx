import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { forgotPassword } from '../api'
import GuestLayout from '../components/Layouts/GuestLayout'

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if (!loading) {
            setLoading(true);
    
            forgotPassword({email})
            .then((res)=> {                
                toast.success(res.data.message);
                setLoading(false);
            })
            .catch((res)=> {    
                toast.error(res?.response?.data?.message);
                setLoading(false);
            })
        }

    }
    
  return (
    <GuestLayout back={true}>
        <Head>
            <title>Fastfood | Forgot Password</title>
        </Head>
        <div className='w-full h-screen flex items-center justify-center'>
            <form onSubmit={handleSubmit} className='border-2 flex flex-col rounded-sm shadow'>
                <div className='p-5 border-b-2'>
                    <h5 className='text-lg font-semibold'>Enter Email Address</h5>
                </div>
                <div className='p-5'>
                    <p className='mb-3'>Please enter your email address ,then We'll sent password reset link.</p>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder='zzz@something.com' className='h-10 w-80 border-2 p-2 focus:outline-bgGreen' />
                </div>
                <div className='flex justify-end items-center px-5 py-2'>
                    <button onClick={()=> router.back()} type='button' className='bg-bgGray px-6 py-2 rounded-md text-textGreen border-2 font-semibold'>Cancel</button>
                    <button disabled={loading && true} className='bg-bgGreen px-6 py-2 rounded-md text-white font-semibold ml-3'>
                        {loading ? <ClipLoader size={20} color="#ffffff" /> : "Send"}
                    </button>
                </div>
            </form>
        </div>
    </GuestLayout>
  )
}

export default ForgotPassword