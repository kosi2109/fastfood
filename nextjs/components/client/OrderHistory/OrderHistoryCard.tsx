import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { TbTruckDelivery } from "react-icons/tb";
import OrderHistoryItem from "./OrderHistoryItem";
import { ORDER } from "../../../types";
import moment from "moment";

interface Props {
  order: ORDER;
}

const OrderHistoryCard: NextPage<Props> = ({ order }) => {
  return (
    <div className="border-2 w-full md:mx-auto md:w-2/3 lg:w-1/2 shadow-md mb-4">
      <div className="flex justify-between border-b-2 border-bgLightGreen border-dashed items-start border-3 p-3">
        <div>
          <h5 className="text-textGreen">Order #{order.id}</h5>
          <div className="flex items-center">
            <TbTruckDelivery />
            <h6>{order.status == "1" ? "In Progress" : "Shipped"}</h6>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <h5>{moment(order.date).format("dddd D, MM-YYYY")}</h5>
          <h5 className="font-semibold">
            {moment(order.date).format("h:mm a")}
          </h5>
        </div>
      </div>
      {order.items.map((item, i) => (
        <OrderHistoryItem key={i} item={item} />
      ))}

      <div className="flex flex-col items-center justify-start p-3">
        <div className="flex w-full justify-between py-1">
          <div className="w-1/2">
            <h5 className="font-semibold pr-1">Deli Fee</h5>
          </div>
          <div className="w-1/2 flex justify-end">
            <h5>{order.deli_fee}</h5>
          </div>
        </div>
      </div>

      <div className="p-3 bg-bgGrey border-t-2 flex item-center justify-between">
        <div className="flex items-center"></div>
        <h5>
          Total : <span className="font-bold">{order.grand_total} Ks</span>
        </h5>
      </div>
    </div>
  );
};

export default OrderHistoryCard;
