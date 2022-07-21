import { NextPage } from "next";
import React, { useState } from "react";
import OrderItem from "../components/Order/OrderItem";
import AppLayout from "../components/Layouts/AppLayout";
import ProfileImage from "../components/Profile/ProfileImage";
import Auth from "../components/Auth";
import { AppState } from "../context/AppProvider";

const order: NextPage = () => {
  const {cartItems} = AppState();
  let subTotal = 0;
  let deliFree = 1000;
  return (
    <AppLayout back={true} title="Order Status">
      <Auth>
      <div className="w-full py-2 mx-auto md:w-2/3 lg:w-1/2 2xl:w-1/3 flex flex-col">
        <div className="mb-3 w-full h-40 rounded-md bg-textGray"></div>
        <div className="mb-3 w-full flex px-5 py-4 rounded-md bg-bgGray border-2 items-center justify-start py-3">
          <div className="w-1/6 flex items-center justify-start">
            <ProfileImage />
          </div>
          <div className="w-5/6 pl-2 flex flex-col">
            <h4 className="font-bold text-textBlack text-lg">Si</h4>
            <h4 className="font-semibold">Thu Htet</h4>
          </div>
        </div>
        <h2 className="font-bold text-start text-lg mb-3">Order Detail</h2>
        <div className="p-2 border-2 bg-bgGray rounded-md">
          <div className="border-b py-3">
            {cartItems.map((item,i)=>{
              const total = item.quantity * item.item.sizes.filter((s)=> s.name == item.size)[0].price.price;
              subTotal += total;
              return <OrderItem key={i} size={item.size} quantity={item.quantity} name={item.item.name} total={total} />
            })}
          </div>

          <div className="w-full flex py-1">
            <div className="w-4/6 text-lg font-semibold">
              <p>Sub Total</p>
            </div>
            <div className="w-2/6 text-end">
              <p>{subTotal}</p>
            </div>
          </div>

          <div className="w-full flex py-1">
            <div className="w-4/6 font-semibold">
              <p>Delivary Free</p>
            </div>
            <div className="w-2/6 text-end">
              <p>{deliFree}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between py-3">
          <h4 className="font-bold text-lg">Grand Total</h4>
          <h4 className="font-semibold text-lg">{deliFree + subTotal} Ks</h4>
        </div>
        
        <button className="mt-3 w-full h-10 rounded-md bg-bgGreen text-textWhite">
          Comfirm Order
        </button>
      </div>
      </Auth>
    </AppLayout>
  );
};

export default order;
