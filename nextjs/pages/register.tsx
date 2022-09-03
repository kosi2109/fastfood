import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { register } from "../api";
import GoogleMap from "google-map-react";
import { HiLocationMarker } from "react-icons/hi";
import Input from "../components/Form/Input";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import GuestLayout from "../components/Layouts/GuestLayout";
import Image from "next/image";
import image from "../public/assets/register.gif";
import SocialLogin from "../components/client/SocialLogin";
import LoginOrRegister from "../components/Form/LoginOrRegister";

const MapPointer = ({}: any) => (
  <div>
    <HiLocationMarker size={30} />
  </div>
);

const initialForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
  password: "",
  password2: "",
  profile_img: "",
};

export type REGISTER = typeof initialForm;

const Register: NextPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPassword2, setShowPassword2] = useState<boolean>(false);
  const router = useRouter();
  const [form, setForm] = useState<typeof initialForm>(initialForm);
  const [coordinate, setCoordinate] = useState({ lat: 20.1544, lng: 94.9455 });
  const [errors, setErrors] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const google_key : any = process.env.GOOGLE_MAP_KEY;


  useEffect(() => {
    form.address = `${coordinate.lat},${coordinate.lng}`;
  }, [coordinate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!loading) {
      setLoading(true);
      register(form)
        .then((res) => {
          router.push("/login");
          toast.success("Account was scuuessfully created.");
        })
        .catch((res) => {
          if (res.response.status !== 500) {
            setErrors(res.response.data);
            setLoading(false);
            toast.error(res.response.data.message);
          }
        });
    }
  };

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <GuestLayout>
      <Head>
        <title>Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full h-screen flex">
        <div className="fixed blur-sm	md:blur-none top-20 md:top-0 md:relative md:w-1/2 flex items-center justify-center">
          <Image src={image} alt="Image" />
        </div>
        <div className="w-full z-10 md:w-1/2 flex flex-col items-center px-3 pt-20 md:pt-24 pb-4 h-full overflow-auto">
          <h1 className="text-3xl mb-3 text-textGreen font-bold">Signup</h1>

          <form onSubmit={handleSubmit} className="w-full md:w-2/3">
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
              <label
                className="mb-2 text-textGray"
                htmlFor="password_confirmation"
              >
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
              <input
                type="hidden"
                name="address"
                value={`${coordinate.lat},${coordinate.lng}`}
                required
              />
              <GoogleMap
                bootstrapURLKeys={{
                  key: google_key,
                }}
                defaultCenter={coordinate}
                center={coordinate}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={{ disableDefaultUI: true, zoomControl: true }}
                yesIWantToUseGoogleMapApiInternals
                onChange={(e) =>
                  setCoordinate({ lat: e.center.lat, lng: e.center.lng })
                }
              >
                <MapPointer lat={coordinate.lat} lng={coordinate.lng} />
              </GoogleMap>
            </div>

            <button className="mb-5 bg-bgGreen w-full h-10 rounded-md text-textWhite font-bold hover:bg-textGreen">
              {loading ? <ClipLoader size={20} color="#ffffff" /> : "Register"}
            </button>
          </form>
          
          <LoginOrRegister login={false}/>

          <SocialLogin/>

        </div>
      </div>
    </GuestLayout>
  );
};

export default Register;
