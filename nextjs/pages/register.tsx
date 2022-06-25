import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai"

const Register: NextPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPassword2, setShowPassword2] = useState<boolean>(false);
  
  return (
    <div>
      <Head>
        <title>Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col items-center py-3">
        <h1 className="text-3xl mb-3 text-textGreen font-semibold">Signup</h1>

        <form action="" className="w-4/6">
          <div className="flex flex-col w-full mb-2">
            <label className="mb-2 text-textGray" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="h-10 rounded-md border border-bgGreen px-2 focus:outline-textGreen"
            />
          </div>

          <div className="flex flex-col w-full mb-2">
            <label className="mb-2 text-textGray" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="h-10 rounded-md border border-bgGreen px-2 focus:outline-textGreen"
            />
          </div>

          <div className="flex flex-col w-full mb-2">
            <label className="mb-2 text-textGray" htmlFor="phone">
              Phone
            </label>
            <input
              type="phone"
              name="phone"
              id="phone"
              className="h-10 rounded-md border border-bgGreen px-2 focus:outline-textGreen"
            />
          </div>

          <div className="flex flex-col w-full mb-2 ">
            <label className="mb-2 text-textGray" htmlFor="password">
              Password
            </label>
            <div className="w-full relative">
              <input
                type={showPassword ? "text" : "password" }
                name="password"
                id="password"
                className="w-full h-10 rounded-md border border-bgGreen px-2 focus-within:outline-textGreen"
              />
              <div onClick={()=> setShowPassword(!showPassword)} className="flex items-center justify-center absolute top-0 right-0 w-10 h-full">
                {showPassword ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} /> }
              
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full mb-5">
            <label className="mb-2 text-textGray" htmlFor="password2">
              Password Comfirm
            </label>
            <div className="w-full relative">
              <input
                type={showPassword2 ? "text" : "password" }
                name="password2"
                id="password2"
                className="w-full h-10 rounded-md border border-bgGreen px-2 focus-within:outline-textGreen"
              />
              <div onClick={()=> setShowPassword2(!showPassword2)} className="flex items-center justify-center absolute top-0 right-0 w-10 h-full">
                {showPassword2 ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} /> }
              </div>
            </div>
          </div>

          <button className="mb-5 bg-bgGreen w-full h-10 rounded-md text-textWhite font-bold hover:bg-textGreen">
            Sign Up
          </button>
        </form>
        <p className="mb-3">Already have an Account ? <Link href="/login"><span className="text-textGreen font-semibold cursor-pointer">Login</span></Link></p>
        <div className="w-4/6 mb-3 text-center relative flex justify-center items-center">
          <h5 className="bg-bgWhite z-10 w-10">OR</h5>
          <div className="z-1 border-b border-textGreen w-full h-1/2 absolute top-0"></div>
        </div>

        <button className="mb-3 bg-bgGreen w-4/6 h-10 rounded-md text-textWhite font-bold hover:bg-textGreen">
          Sign Up with Google
        </button>
        <button className="mb-3 border border-bgGreen w-4/6 h-10 rounded-md text-textGreen font-bold hover:bg-bgGreen hover:text-textWhite">
          Sign Up with Facebook
        </button>
      </div>
    </div>
  );
};

export default Register;
