import { NextPage } from "next";
import React from "react";
import AppLayout from "../components/Layouts/AppLayout";
import Link from "next/link";
import CartItemContainer from "../components/client/Cart/CartItemContainer";
import { AppState } from "../context/AppProvider";
import EmptyCart from "../components/client/EmptyCart";
import Head from "next/head";

const cart: NextPage = () => {
  const { cartItems } = AppState();

  return (
    <AppLayout>
      <Head>
        <title>Fastfood | Cart</title>
      </Head>
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
            <EmptyCart />
          )}
        </div>
    </AppLayout>
  );
};

export default cart;
