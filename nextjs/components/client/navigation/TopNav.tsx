import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { BsBell } from "react-icons/bs";
import { FaShoppingCart, FaUserAlt } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { ImHome } from "react-icons/im";
import { IoMdArrowRoundBack } from "react-icons/io";
import { AppState } from "../../../context/AppProvider";

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
  const { cartItemTotal } = AppState();
  const [animate, setAnimate] = useState("w-5 h-5");
  useEffect(() => {
    setAnimate("w-6 h-6");
    setTimeout(() => {
      setAnimate("w-5 h-5");
    }, 1000);
  }, [cartItemTotal]);

  return (
    <>
      {/* for smaller device */}
      <div className="md:hidden z-20 px-4 fixed top-0 left-0 w-full bg-bgWhite h-14 flex justify-between items-center">
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

      {/* for larger screen */}
      <div className="hidden md:flex justify-between h-16 bg-white z-20 shadow fixed top-0 w-full items-center px-10">
        <div className="flex w-1/5 justify-start">
          <Link href="/">
            <h5 className="text-textGreen text-2xl font-bold mr-10">
              FastFood
            </h5>
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
                    <h5 className="text-xs font-semibold">{cartItemTotal}</h5>
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
