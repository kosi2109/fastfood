import { NextPage } from "next";
import React from "react";
import AppLayout from "../components/Layouts/AppLayout";
import Link from "next/link";
import CartItemContainer from "../components/client/Cart/CartItemContainer";
import { AppState } from "../context/AppProvider";

const cart: NextPage = () => {
  const { cartItems } = AppState();

  return (
    <AppLayout title="My Cart">
        <div className="w-full mx-auto md:w-2/3 lg:w-1/2 2xl:w-1/3 flex flex-col items-center">
          {cartItems.length > 0 ? (
            <>
              <CartItemContainer cartItems={cartItems} />
              <Link href="/order">
                <button className="mt-3 w-full h-10 rounded-md bg-bgGreen text-textWhite">
                  Place Order
                </button>
              </Link>
            </>
          ) : (
            <div className="w-full flex items-center justify-center flex-col mt-20">
              <h1 className="font-semibold text-2xl mb-3">Empty Cart</h1>
              <Link href="/menu" >
                <button className="bg-bgGreen w-full text-textWhite h-10 rounded-md">Shop Now</button>
              </Link>
            </div>
          )}
        </div>
    </AppLayout>
  );
};

export default cart;
