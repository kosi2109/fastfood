import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { emailVerify } from '../api';
import Auth from '../components/Auth'
import AppLayout from '../components/Layouts/AppLayout'

function EmailVerify() {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const {id, hash, expires, signature} = router.query;
    
    useEffect(()=> {
        if (id && hash && expires && signature) {
            emailVerify({id,hash,expires,signature})
            .then((res)=> {                
                toast.success(res.data.message);
                setLoading(false);
                router.push('/');
            })
            .catch((res)=> {    
                toast.error(res?.response?.data?.message);
                setLoading(false);
            })
        }
    },[id])

  return (
    <AppLayout>
        <Head>
            <title>Fastfood | Email Verify</title>
        </Head>

        <Auth>
            {loading && <h5 className='text-center text-lg font-semibold mt-4'>Your Email is verifying ...</h5>}
        </Auth>
    </AppLayout>
  )
}

export default EmailVerify