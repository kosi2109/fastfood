import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { GrLocation } from "react-icons/gr";
import OrderHistoryItem from "./OrderHistoryItem";
import { ORDER } from "../../types";

interface Props {
  order : ORDER
}

const OrderHistoryCard: NextPage<Props> = ({ order }) => {
  return (
    <div className="border-2 w-full shadow-md mb-4">
      <div className="flex justify-between border-b-2 border-bgLightGreen border-dashed items-start border-3 p-3">
        <div>
          <h5 className="text-textGreen">Order #{order.id}</h5>
          <div className="flex items-center">
            <TbTruckDelivery />
            <h6>{order.status == "1" ? "In Progress" : "Shipped"}</h6>
          </div>
        </div>
        <div>
          <h5>February 16,2022</h5>
        </div>
      </div>
      {order.items.map((item,i) => <OrderHistoryItem key={i} item={item} /> )}
      
      <div className="p-3 bg-bgGrey border-t-2 flex item-center justify-between">
        <div className="flex items-center">
          <GrLocation />
          <h6 className="font-bold">Palo Alto</h6>
        </div>
        <h5>Total {order.grand_total}</h5>
      </div>
    </div>
  );
};

export default OrderHistoryCard;
