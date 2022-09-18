import { useRouter } from "next/router";
import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { googleAuth } from "../../api";

const SocialLogin = () => {
  const router = useRouter();

  const googleLogin = () => {
    googleAuth()
      .then((res) => router.push(res.data.url))
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div className="w-full md:w-2/3 mb-3 text-center relative flex justify-center items-center">
        <h5 className="bg-bgWhite z-10 w-10">OR</h5>
        <div className="z-1 border-b border-textGreen w-full h-1/2 absolute top-0"></div>
      </div>
      <div className="w-full md:w-2/3 flex items-center justify-center">
        <div
          onClick={() =>
            toast.warn("Sorry! , This Feature isn't available now.")
          }
          className="border-2 p-2 rounded-full mx-2 cursor-pointer"
        >
          <FaFacebookF size={22} />
        </div>
        <div
          onClick={googleLogin}
          className="border-2 p-2 rounded-full mx-2 cursor-pointer"
        >
          <FcGoogle size={22} />
        </div>
      </div>
    </>
  );
};

export default SocialLogin;
