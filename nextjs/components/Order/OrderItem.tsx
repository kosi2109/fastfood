import { NextPage } from "next";
import React from "react";

interface Props{
    size : string,
    quantity : number,
    name : string ,
    total : number
}

const OrderItem: NextPage<Props> = ({size,quantity , name , total}) => {
  return (
    <div className="w-full flex mb-1">
      <div className="w-1/6">
        <p>{quantity}x</p>
      </div>
      <div className="w-4/6 font-semibold">
        <p className="truncate">{name} ({size})</p>
      </div>
      <div className="w-1/6 text-end">{total}</div>
    </div>
  );
};

export default OrderItem;
