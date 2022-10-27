import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { register } from "../api";
import GoogleMap from "google-map-react";
import Input from "../components/Form/Input";
import { toast } from "react-toastify";
import GuestLayout from "../components/Layouts/GuestLayout";
import Image from "next/image";
import image from "../public/assets/register.gif";
import SocialLogin from "../components/client/SocialLogin";
import LoginOrRegister from "../components/Form/LoginOrRegister";
import PasswordInput from "../components/Form/PasswordInput";
import FormButton from "../components/Form/FormButton";
import MapPointer from "../components/MapPointer";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsUpload } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { clearFormError, getErrors } from "../store/slices/formErrorSlice";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
  password: "",
  password_confirmation: "",
  profile_img: "",
};

export type REGISTER = typeof initialForm;

const Register: NextPage = () => {
  const router = useRouter();
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [form, setForm] = useState<typeof initialForm>(initialForm);
  const [coordinate, setCoordinate] = useState({ lat: 20.1544, lng: 94.9455 });
  const [loading, setLoading] = useState(false);
  const imageUploadRef = useRef<any>(null);
  const google_key : any = process.env.GOOGLE_MAP_KEY;
  const dispatch = useDispatch();
  const errors = useSelector((state : any) => state.formError);


  useEffect(() => {
    form.address = `${coordinate.lat},${coordinate.lng}`;
  }, [coordinate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(clearFormError());
    
    if (!loading) {
      setLoading(true);
      register(form)
        .then((res) => {
          setLoading(false);
          toast.success("Account was scuuessfully created.");
          setTimeout(()=> router.push("/login"), 500)
        })
        .catch((res) => {                    
          if (res.response.status !== 500) {
            dispatch(getErrors(res.response.data));
          }
          setLoading(false);                    
        });
    }
  };

    
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const imageUpload = async (e : React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      let image = await convertToBase64(e.target.files[0]); 
      setImagePreviewUrl(image);    
      setForm({...form,profile_img : image})
    }
  }

  const removePreview = ()=> {
    if (imageUploadRef) {
      setImagePreviewUrl("");
      imageUploadRef.current.value = null;
      setForm({...form,profile_img : ""})
    }
  }

  function convertToBase64(file : File) : any {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  
  return (
    <GuestLayout>
      <Head>
      <title>Fastfood | Register</title>
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
              errors={errors?.name ? errors.name[0] : null }
              value={form.name}
            />

            <Input
              title="Email"
              id="email"
              name="email"
              type="email"
              handleChange={handleChange}
              error={errors?.email ? errors.email[0] : null }
              value={form.email}
            />

            <Input
              title="Phone"
              id="phone"
              name="phone"
              type="phone"
              handleChange={handleChange}
              error={errors?.phone ? errors.phone[0] : null }
              value={form.phone}
            />

            <PasswordInput
              title="Password"
              name="password"
              handleChange={handleChange}
              id="password"
              error={errors?.password ? errors.password[0] : null }
            />

            <PasswordInput
              title="Password Comfirm"
              name="password_confirmation"
              handleChange={handleChange}
              id="password_confirmation"
              error={errors?.password_confirmation ? errors.password_confirmation : null }
            />

            <div className="w-full h-60 md:h-80 mb-3 bg-bgGray border-2 rounded-md px-3 py-2">
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

            <input ref={imageUploadRef} type="file" className="hidden" onChange={imageUpload} accept="image/*" />

            {imagePreviewUrl !== "" ?
              <div className="w-full h-60 md:h-80 mb-3 bg-bgGray border-2 rounded-md px-3 py-2 flex items-center justify-center relative">
                <img src={imagePreviewUrl} alt="" className="h-full w-auto" />
                <button onClick={removePreview} className="absolute top-0 right-0 p-3">
                  <AiFillCloseCircle size={25}/>
                </button>
              </div>
             : 
                <div className="w-full h-60 md:h-80 mb-3 bg-bgGray border-2 rounded-md px-3 py-2 flex items-center justify-center">
                  <button type="button" className="flex flex-col items-center" onClick={() => imageUploadRef.current.click()}>
                    <BsUpload className="text-textGreen mb-3" size={25}/>
                    Upload Profile
                  </button>
                </div>
             }
            
            <FormButton 
              loading={loading} 
              text="Register" 
            />

          </form>
          
          <LoginOrRegister login={false}/>

          <SocialLogin/>

        </div>
      </div>
    </GuestLayout>
  );
};

export default Register;
