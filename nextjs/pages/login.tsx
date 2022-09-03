import { setCookie } from "cookies-next";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { login } from "../api";
import { AppState } from "../context/AppProvider";
import { LOGIN } from "../types";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import GuestLayout from "../components/Layouts/GuestLayout";
import image from "../public/assets/login.gif";
import Image from "next/image";
import { HiOutlineMail } from "react-icons/hi";
import { BsKey } from "react-icons/bs";
import SocialLogin from "../components/client/SocialLogin";
import LoginOrRegister from "../components/Form/LoginOrRegister";

const Login: NextPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<LOGIN>({ email: "", password: "" });
  const route = useRouter();
  const { setUser } = AppState();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loading) {
      setLoading(true);
      login(form)
        .then((response: any) => {
          setUser(response.data);
          setCookie("jwt", response.data.token, {
            maxAge: 60 * 60 * 24 * 30, //1month
          });
          setCookie("fastfood_auth", response.data.user, {
            maxAge: 60 * 60 * 24 * 30, //1month
          });
          route.push("/");
        })
        .catch((response) => {
          setLoading(false);
          toast.error(response.response.data.message);
        });
    }
  };

  return (
    <GuestLayout>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full h-screen flex items-center px-3">
        <div className="fixed blur-sm	md:blur-none top-20 md:top-0 md:relative md:w-1/2 flex items-center justify-center">
          <Image src={image} alt="Image" />
        </div>
        <div className="w-full z-10 md:w-1/2 flex flex-col justify-center items-center md:p-3 py-10 h-full overflow-auto">
          <h1 className="text-3xl text-textGreen font-bold mb-3">
            Login Into Fastfood
          </h1>

          <form onSubmit={handleSubmit} className="w-full md:w-2/3">
            <div className="flex flex-col w-full mb-2">
              <label
                className="mb-2 text-textGray flex items-center"
                htmlFor="email"
              >
                <HiOutlineMail className="mr-2" /> Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="h-10 rounded-md border border-bgGreen px-2 focus:outline-textGreen"
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col w-full mb-5">
              <div className="flex justify-between items-center">
                <label
                  className="mb-2 text-textGray flex items-center"
                  htmlFor="password"
                >
                  <BsKey className="mr-2" /> Password
                </label>
                <Link href="/forgot-password" className="text-md font-semibold">
                  Forgot password?
                </Link>
              </div>
              <div className="w-full relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  className="w-full h-10 rounded-md border border-bgGreen px-2 focus-within:outline-textGreen"
                  onChange={handleChange}
                  required
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="flex items-center justify-center absolute top-0 right-0 w-10 h-full"
                >
                  {showPassword ? (
                    <AiOutlineEye size={20} />
                  ) : (
                    <AiOutlineEyeInvisible size={20} />
                  )}
                </div>
              </div>
            </div>

            <button className="mb-5 bg-bgGreen w-full flex items-center justify-center h-10 rounded-md text-textWhite font-bold hover:bg-textGreen">
              {loading ? <ClipLoader size={20} color="#ffffff" /> : "login"}
            </button>
          </form>

          <LoginOrRegister />

          <SocialLogin/>
          
        </div>
      </div>
    </GuestLayout>
  );
};

export default Login;
