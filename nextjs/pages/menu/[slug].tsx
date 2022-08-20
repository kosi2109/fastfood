import { NextPage } from "next";
import React, { useCallback, useEffect, useState } from "react";
import { allMenus, showMenus } from "../../api";
import AppLayout from "../../components/Layouts/AppLayout";
import { AppState, CART_ACTION } from "../../context/AppProvider";
import { MENU, SIZE } from "../../types";
import useAnimateNumber from "use-animate-number";
import Head from "next/head";
import { motion } from "framer-motion";

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
  const [price, setPrice] = useAnimateNumber(
    menu?.sizes[0].price,
    animateOption
  );
  const [size, setSize] = useState(menu?.sizes[0]);

  const sizeHandle = useCallback(
    (size: SIZE) => {
      setPrice(size?.price, false);
      setSize(size);
    },
    [size]
  );

  return (
    <AppLayout title="Detail" back={true}>
      <Head>
        <title>{menu?.name}</title>
      </Head>
      <motion.div exit={{ opacity: 0 }} className="pt-2 md:flex">
        <div className="mb-2 w-full md:w-1/2 h-60 flex justify-center items-center">
          <motion.img
            layoutId={menu?.name}
            className="w-full h-full object-contain rounded-md"
            src={menu?.cover_img}
            alt={menu?.name}
          />
        </div>

        <div>
          <h1 className="text-3xl font-semibold mb-2">{menu?.name}</h1>
          <div className="mb-3">
            <h2 className="font-semibold text-lg">Description</h2>
            <p className="text-md text-textBlack">{menu?.description}</p>
          </div>

          <div className="w-full flex mb-3">
            <div className="w-1/2 md:hidden flex items-center justify-center text-center">
              <h5 className="font-bold text-3xl text-textGreen">
                {price}
                <span className="font-semibold text-xl">Ks</span>{" "}
              </h5>
            </div>
            <div className="w-1/2 md:w-full columns-3 md:columns-6 w-full gap-4">
              {menu?.sizes?.map((size) => (
                <div
                  onClick={() => sizeHandle(size)}
                  key={size?.id}
                  className={size?.price === price ? selected : unselected}
                >
                  <p>{size?.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full md:flex">
            <h5 className="hidden md:block md:w-1/6 font-bold text-3xl text-textGreen">
              {price}
              <span className="font-semibold text-xl">Ks</span>{" "}
            </h5>
            <button
              className="w-full md:w-5/6 h-10 bg-bgGreen text-textWhite rounded-md"
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
