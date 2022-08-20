import { NextPage } from "next";
import React, { useCallback, useState } from "react";
import { allMenus, showMenus } from "../../api";
import AppLayout from "../../components/Layouts/AppLayout";
import { AppState, CART_ACTION } from "../../context/AppProvider";
import { MENU, SIZE } from "../../types";
import useAnimateNumber from "use-animate-number";
import Head from "next/head";
import { motion } from "framer-motion";
import moment from "moment";
import ItemGridContainer from "../../components/client/Items/ItemGridContainer";

interface Props {
  menu: MENU;
}

const selected =
  "w-full cursor-pointer text-center mb-2 font-semibold text-lg p-1 text-textGreen rounded-md border-2 border-bgGreen";
const unselected =
  "w-full cursor-pointer text-center mb-2 font-semibold text-lg p-1 text-textGray rounded-md border-2";
const animateOption = {
  duration: 200,
  enterance: true,
  direct: false,
  disabled: false,
  decimals: 0,
};

const Menu: NextPage<Props> = ({ menu }) => {
  const { increaseItem } = AppState();
  const [originalPrice, setOriginalPrice] = useState(menu?.sizes[0]?.price);

  const getPrice = (size: SIZE) => {
    let price = size?.price;
    if (isDiscountActive()) {
      price = size?.price - size?.price * (menu?.discount.discount / 100);
    }
    return price;
  };

  function daysRemaining(date:string) {
    var eventdate = moment(date);
    var todaysdate = moment();
    return eventdate.diff(todaysdate, 'days');
  }
  
  function isDiscountActive () {
    let today = new Date();
    let from = new Date(menu?.discount?.discount_from);
    let to = new Date(menu?.discount?.discount_to);
    if (from <= today && today <= to ) {
      return true;
    }
    return false;
  }
  

  const [price, setPrice] = useAnimateNumber(
    getPrice(menu?.sizes[0]),
    animateOption
  );
  const [size, setSize] = useState(menu?.sizes[0]);

  const sizeHandle = useCallback(
    (size: SIZE) => {
      setPrice(getPrice(size), false);
      setSize(size);
      setOriginalPrice(size?.price);
    },
    [size]
  );

  return (
    <AppLayout back={true}>
      <Head>
        <title>{menu?.name}</title>
      </Head>
      <motion.div exit={{ opacity: 0 }} className="pt-2 w-full md:flex">
        <div className="mb-2 relative w-full md:w-1/2 h-60 flex justify-center items-center">
          <motion.img
            layoutId={menu?.name}
            className="w-full h-full object-contain rounded-md"
            src={menu?.cover_img}
            alt={menu?.name}
          />
        </div>  

        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-semibold mb-2">{menu?.name}</h1>
          <div className="mb-3">
            <h2 className="font-semibold text-lg">Description</h2>
            <p className="text-md text-textBlack p-2">{menu?.description}</p>
          </div>

          <div className="w-full flex mb-3">
            {isDiscountActive() && (
              <div className="md:hidden relative flex items-center mr-1">
                <h6 className="text-lg">{originalPrice}</h6>
                <div
                  style={{ height: "2px" }}
                  className="absolute -rotate-[17deg] w-full bg-red"
                ></div>
              </div>
            )}
            <div className="w-1/2 md:hidden flex items-center justify-center text-center">
              <h5 className="font-bold text-3xl text-textGreen">
                {price}
                <span className="font-semibold text-xl">Ks</span>
              </h5>
            </div>
            <div className="w-1/2 md:w-full columns-3 md:columns-6 w-full gap-4">
              {menu?.sizes?.map((size) => (
                <div
                  onClick={() => sizeHandle(size)}
                  key={size?.id}
                  className={getPrice(size) === price ? selected : unselected}
                >
                  <p>{size?.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full md:flex">
            {isDiscountActive() && (
              <>
              <div className="relative hidden md:flex items-center mr-3">
                <h6 className="text-lg">{originalPrice}</h6>
                <div
                  style={{ height: "2px" }}
                  className="absolute -rotate-[17deg] w-full bg-red"
                ></div>
              </div>
              </>
            )}
            <h5 className="hidden md:block md:w-2/6 font-bold text-3xl text-textGreen">
              {price}
              <span className="font-semibold text-xl">Ks</span>
            </h5>
            <button
              className="w-full md:w-4/6 h-10 bg-bgGreen text-textWhite rounded-md"
              onClick={() => increaseItem(menu, size, CART_ACTION.INCREASE)}
            >
              Add To Cart
            </button>
          </div>
        </div>

      </motion.div>
      
    </AppLayout>
  );
};

export async function getStaticPaths() {
  const menus = await allMenus();
  return {
    paths: menus.data.data.map((menu: any) => ({
      params: { slug: menu.slug },
    })),
    fallback: true,
  };
}

export async function getStaticProps({ params }: any) {
  const menu = await showMenus(params.slug);
  return {
    props: { menu: menu.data.data },
  };
}

export default Menu;
