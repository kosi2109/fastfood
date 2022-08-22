import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { register } from "../api";
import GoogleMap from "google-map-react"
import {HiLocationMarker} from "react-icons/hi"
import AppLayout from "../components/Layouts/AppLayout";
import Error from "../components/Error";
import Input from "../components/Form/Input";


const MapPointer = ({}:any) => <div><HiLocationMarker size={30}/></div>;

const initialForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
  password: "",
  password2: "",
  profile_img : "",
}

export type REGISTER = typeof initialForm;

const Register: NextPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPassword2, setShowPassword2] = useState<boolean>(false);
  const router = useRouter();
  const [form, setForm] = useState<typeof initialForm>(initialForm);
  const [coordinate, setCoordinate] = useState({lat : 20.1544 , lng : 94.9455});
  const [errors, setErrors] = useState<any>([]);

  useEffect(()=>{
    form.address = `${coordinate.lat},${coordinate.lng}`
  },[coordinate])
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register(form)
    .then(()=> router.push('/login'))
    .catch((res)=> setErrors(res.response.data))
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <AppLayout>
      <Head>
        <title>Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen md:w-1/2 md:mx-auto flex flex-col items-center py-3">
        <h1 className="text-3xl mb-3 text-textGreen font-semibold">Signup</h1>

        <form onSubmit={handleSubmit} className="w-full">
          <Input
            title="Name"
            id="name"
            name="name"
            handleChange={handleChange}
            errors={errors}
          />

          <Input
            title="Email"
            id="email"
            name="email"
            type="email"
            handleChange={handleChange}
            errors={errors}
          />

          <Input
            title="Phone"
            id="phone"
            name="phone"
            type="phone"
            handleChange={handleChange}
            errors={errors}
          />

          <div className="flex flex-col w-full mb-2 ">
            <label className="mb-2 text-textGray" htmlFor="password">
              Password
            </label>
            <div className="w-full relative">
              <input
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className="w-full h-10 rounded-md border border-bgGreen px-2 focus-within:outline-textGreen"
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

          <div className="flex flex-col w-full mb-5">
            <label className="mb-2 text-textGray" htmlFor="password2">
              Password Comfirm
            </label>
            <div className="w-full relative">
              <input
                onChange={handleChange}
                type={showPassword2 ? "text" : "password"}
                name="password2"
                id="password2"
                required
                className="w-full h-10 rounded-md border border-bgGreen px-2 focus-within:outline-textGreen"
              />
              <div
                onClick={() => setShowPassword2(!showPassword2)}
                className="flex items-center justify-center absolute top-0 right-0 w-10 h-full"
              >
                {showPassword2 ? (
                  <AiOutlineEye size={20} />
                ) : (
                  <AiOutlineEyeInvisible size={20} />
                )}
              </div>
            </div>
          </div>

          <div className="w-full h-40 md:h-80 mb-3 bg-bgGray border-2 rounded-md px-3 py-2">
          <input type="hidden" name="address" value={`${coordinate.lat},${coordinate.lng}`} required  />
          <GoogleMap
            bootstrapURLKeys={{key:"AIzaSyAWiuvmnGdI7dIdMX-I7JHWVhQV-8O9OyY"}}
            defaultCenter={coordinate}
            center={coordinate}
            defaultZoom={14}
            margin = {[50,50,50,50]}
            options={{ disableDefaultUI: true, zoomControl: true }}
            yesIWantToUseGoogleMapApiInternals
            onChange={(e)=>  setCoordinate({lat: e.center.lat,lng : e.center.lng})}
          >
            <MapPointer
              lat={coordinate.lat}
              lng={coordinate.lng}
            />
          </GoogleMap>
        </div>
          
          <button className="mb-5 bg-bgGreen w-full h-10 rounded-md text-textWhite font-bold hover:bg-textGreen">
            Sign Up
          </button>
        </form>
        <p className="mb-3">
          Already have an Account ?{" "}
          <Link href="/login">
            <span className="text-textGreen font-semibold cursor-pointer">
              Login
            </span>
          </Link>
        </p>
        <div className="mb-3 text-center relative flex justify-center items-center">
          <h5 className="bg-bgWhite z-10 w-10">OR</h5>
          <div className="z-1 border-b border-textGreen w-full h-1/2 absolute top-0"></div>
        </div>

        <button className="mb-3 bg-bgGreen h-10 w-full rounded-md text-textWhite font-bold hover:bg-textGreen">
          Sign Up with Google
        </button>
        <button className="mb-3 border border-bgGreen w-full h-10 rounded-md text-textGreen font-bold hover:bg-bgGreen hover:text-textWhite">
          Sign Up with Facebook
        </button>
      </div>
    </AppLayout>
  );
};

export default Register;
