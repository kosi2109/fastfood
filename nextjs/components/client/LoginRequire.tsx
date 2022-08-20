import React from "react";
import sorryImg from "../../public/assets/sorry.svg";
import Link from "next/link";

const LoginRequire = () => {
  return (
    <div className="w-full h-full md:w-1/2 lg:w-1/3 md:mx-auto flex items-center justify-end flex-col">
      <img src={sorryImg.src} alt="img" />
      <Link href="/login">
        <button className="bg-bgGreen w-full text-textWhite h-10 rounded-md">
          Login
        </button>
      </Link>
    </div>
  );
};

export default LoginRequire;
