import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { BsBell } from "react-icons/bs";
import { IoMdArrowRoundBack } from "react-icons/io";

interface Props {
  title?: string;
  back?: boolean;
}

const TopNav: NextPage<Props> = ({ title, back = false }) => {
  const router = useRouter();
  
  return (
    <div className="z-20 px-4 md:px-28 fixed top-0 left-0 w-full bg-bgWhite h-14 flex justify-between items-center">
      {back ? (
        <div className="w-1/5 flex justify-start">
          <div onClick={()=> router.back()} className="cursor-pointer relative w-10 h-10 flex items-center justify-start">
            <IoMdArrowRoundBack size={22} />
          </div>
        </div>
      ) : (
        <div className="w-1/5"></div>
      )}
      <div className="w-3/5 justify-center">
        <h5 className="font-semibold text-xl text-center">{title}</h5>
      </div>
      <div className="w-1/5 flex justify-end">
        <div className="cursor-pointer relative w-10 h-10 flex items-center justify-end">
          <BsBell size={20} />
          <div className="w-2 h-2 rounded-full absolute top-1 right-0 bg-red"></div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
