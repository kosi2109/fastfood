import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { resetPassword } from '../../api';
import GuestLayout from '../../components/Layouts/GuestLayout';

function ResetPassword() {
    var router = useRouter();
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [loading, setLoading] = useState(false)

    const token = router.query['token'];
    const email = router.query['email'];
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        if (!loading) {
            setLoading(true);
            resetPassword({email,token,password,password_confirmation:password2})
            .then((res) => {
                toast.success(res.data.message);
                router.push('/login');
                setLoading(false);
            })
            .catch((res) => {
                toast.error(res?.response?.data?.message);
                setLoading(false);
            })
        }
    }
    
  return (
    <GuestLayout>
        <div className='w-full h-screen flex items-center justify-center'>
            <form onSubmit={handleSubmit} className='border-2 flex flex-col rounded-sm shadow'>
                <div className='p-5 border-b-2'>
                    <h5 className='text-lg font-semibold'>Reset Password</h5>
                </div>
                <div className='p-5'>
                    <input onChange={(e) => setPassword(e.target.value)} type="text" placeholder='Password' className='h-10 w-80 border-2 p-2 focus:outline-bgGreen mb-3' />
                    <input onChange={(e) => setPassword2(e.target.value)} type="text" placeholder='Comfirm Password' className='h-10 w-80 border-2 p-2 focus:outline-bgGreen' />
                </div>
                <div className='flex justify-end items-center px-5 py-2'>
                    <button type='button' className='bg-bgGray px-6 py-2 rounded-md text-textGreen border-2 font-semibold'>Cancel</button>
                    <button className='bg-bgGreen px-6 py-2 rounded-md text-white font-semibold ml-3'>
                        {loading ? <ClipLoader size={20} color="#ffffff" /> : "login"}
                    </button>
                </div>
            </form>
        </div>
    </GuestLayout>
  )
}


export default ResetPassword