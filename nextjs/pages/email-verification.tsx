import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { emailVerificationNotification } from '../api'
import Auth from '../components/Auth';
import AppLayout from '../components/Layouts/AppLayout';

function EmailVarification() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if (!loading) {
            setLoading(true);
    
            emailVerificationNotification()
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
    <AppLayout back={true}>
        <Head>
            <title>Fastfood | Email Verification</title>
        </Head>
        
        <Auth>
            <div className='w-full flex justify-center px-2'>
                <form onSubmit={handleSubmit} className='border-2 w-full md:w-2/3 lg:w-1/3 flex flex-col rounded-sm shadow'>
                    <div className='p-5 border-b-2'>
                        <h5 className='text-lg font-semibold'>Email Verification</h5>
                    </div>
                    <div className='p-5'>
                        <p className='mb-3'>We will sent an email to verify your email address.</p>
                    </div>
                    <div className='flex justify-end items-center px-5 py-2'>
                        <button onClick={()=> router.back()} type='button' className='bg-bgGray px-6 py-2 rounded-md text-textGreen border-2 font-semibold'>Cancel</button>
                        <button disabled={loading && true} className='bg-bgGreen px-6 py-2 rounded-md text-white font-semibold ml-3'>
                            {loading ? <ClipLoader size={20} color="#ffffff" /> : "Send Email"}
                        </button>
                    </div>
                </form>
            </div>
        </Auth>
    </AppLayout>
  )
}

export default EmailVarification