import Link from "next/link";
import React from "react";
import { MENU } from "../../../types";
import { motion } from "framer-motion";

const SingleItem = ({ menu }: { menu: MENU }) => {

  function isDiscountActive () {
    let today = new Date();
    let from = new Date(menu?.discount?.discount_from);
    let to = new Date(menu?.discount?.discount_to);
    if (from <= today && today <= to ) {
      return true;
    }
    return false;
  }

  return (
    <Link href={`/menu/${menu?.slug}`}>
      <motion.div className="mr-2 pb-2 block flex flex-col cursor-pointer">
        <div className="w-full h-40 relative flex justify-center items-center rounded-md overflow-hidden mb-1">
          <motion.img
            layoutId={menu.name}
            className="object-cover w-full h-full"
            src={menu.cover_img}
            alt="img"
          />
          {isDiscountActive() && (
            <div className="absolute bottom-0 right-0 bg-red px-3 font-semibold text-white rounded">
              {menu?.discount.discount} %
            </div>
          )}
        </div>
        <div className="w-full flex flex-col">
          <h4 className="font-semibold color-textBlack truncate">
            {menu?.name}
          </h4>
          {menu.sizes.length > 1 ? (
            <h5 className="text-textGreen font-semibold">
              {menu.sizes[0].price} - {menu.sizes[menu.sizes.length - 1].price}{" "}
              Ks
            </h5>
          ) : (
            <h5 className="text-textGreen font-semibold">
              {menu.sizes[0].price} Ks
            </h5>
          )}
        </div>
      </motion.div>
    </Link>
  );
};

export default SingleItem;
