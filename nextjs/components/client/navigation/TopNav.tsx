import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { FaShoppingCart, FaUserAlt } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { ImHome } from "react-icons/im";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useSelector } from "react-redux";
import logo from "../../../public/assets/logo.png"

interface Props {
  title?: string;
  back?: boolean;
}

const classN =
  "ml-10 text-lg font-semibold relative cursor-pointer flex items-center justify-center flex-col";
const active =
  "ml-10 text-lg font-semibold relative cursor-pointer text-textGreen flex items-center justify-center flex-col";

const TopNav: NextPage<Props> = ({ title, back = false }) => {
  const router = useRouter();
  const {cartQuantity} = useSelector((state : any) => state.cart);

  const [animate, setAnimate] = useState("w-5 h-5");
  useEffect(() => {
    setAnimate("w-6 h-6");
    setTimeout(() => {
      setAnimate("w-5 h-5");
    }, 1000);
  }, [cartQuantity]);

  return (
    <>
      {/* for smaller device */}
      <div className="md:hidden z-50 px-4 fixed top-0 left-0 w-full bg-bgWhite h-14 flex justify-between items-center">
        {back ? (
          <div className="w-1/5 flex justify-start">
            <div
              onClick={() => router.back()}
              className="cursor-pointer relative w-10 h-10 flex items-center justify-start"
            >
              <IoMdArrowRoundBack size={22} />
            </div>
          </div>
        ) : (
          <div className="w-1/5"></div>
        )}
        <div className="w-3/5 h-full flex overflow-hidden items-center justify-center">
          <Link href="/">
            <img src={logo.src} className="h-24  m-0 p-0" alt="logo" />
          </Link>
        </div>
        <div className="w-1/5 flex justify-end">
          {/* <div className="cursor-pointer relative w-10 h-10 flex items-center justify-end">
            <BsBell size={20} />
            <div className="w-2 h-2 rounded-full absolute top-1 right-0 bg-red"></div>
          </div> */}
        </div>
      </div>

      {/* for larger screen */}
      <div className="hidden md:flex justify-between h-20 bg-white z-20 shadow fixed top-0 w-full items-center px-10">
        <div className="flex w-1/5 h-full justify-start">
          <Link href="/">
            <div className="h-full flex items-center select-none cursor-pointer">
              <img src={logo.src} className="h-full" alt="logo" />
              <h3 className="text-textGreen text-xl font-semibold">Fastfood</h3>
            </div>
          </Link>
        </div>

        <div className="flex w-1/3 justify-end">
          <Link href="/">
            <div className={router.pathname == "/" ? active : classN}>
              <ImHome size={22} />
            </div>
          </Link>

          <Link href="/menu">
            <div
              className={router.pathname.startsWith("/menu") ? active : classN}
            >
              <AiOutlineUnorderedList size={22} />
            </div>
          </Link>

          <Link href="/cart">
            <div
              className={
                router.pathname == "/cart" || router.pathname == "/order"
                  ? active
                  : classN
              }
            >
              <div className="relative flex items-center justify-center flex-col">
                <FaShoppingCart className="animate-shake" size={22} />

                {router.pathname !== "/cart" && router.pathname !== "/order" && (
                  <div
                    className={
                      `absolute transition-all ease -top-2 -right-2 bg-red text-textWhite rounded-full flex items-center justify-center ` +
                      animate
                    }
                  >
                    <h5 className="text-xs font-semibold">{cartQuantity}</h5>
                  </div>
                )}
              </div>
            </div>
          </Link>

          <Link href="/profile">
            <div className={router.pathname == "/profile" ? active : classN}>
              <FaUserAlt size={22} />
            </div>
          </Link>

          <Link href="/search">
            <div className={router.pathname == "/search" ? active : classN}>
              <FiSearch size={22} />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default TopNav;
