import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { getOrders } from "../api";
import Auth from "../components/Auth";
import AppLayout from "../components/Layouts/AppLayout";
import MenuLoading from "../components/client/MenuLoading";
import OrderHistoryCard from "../components/client/OrderHistory/OrderHistoryCard";
import { AppState } from "../context/AppProvider";
import { ORDER } from "../types";

interface Props {
  orders: ORDER[];
}

const orderhistory: NextPage<Props> = () => {
  const { user } = AppState();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<ORDER[]>([]);
  const [status, setStatus] = useState('1');
  
  useEffect(() => {
    setLoading(true);
    getAllOrders();
  }, [status]);

  const getAllOrders = async () => {
    const res = await getOrders(status);
    setOrders(res.data.data);
    setLoading(false);       
  };

  return (
    <AppLayout title="History" back={true}>
      <Auth>
        <div className="flex w-full md:mx-auto md:w-2/3 lg:w-1/2 mb-3 border-2">
          <button onClick={()=> setStatus('1')} className={`w-1/2 h-10 ${status == '1' && "bg-bgGreen text-white"}`}>In Progress</button>
          <button onClick={()=> setStatus('2')} className={`w-1/2 h-10 ${status == '2' && "bg-bgGreen text-white"}`}>Shipped</button>
        </div>
        {loading ? (
          <MenuLoading />
        ) : (
          orders.length > 0 ?
          orders?.map((order) => (
            <OrderHistoryCard key={order.id} order={order} />
          ))
          :
          <div className="md:mx-auto md:w-2/3 lg:w-1/2">
            <h1 className="font-bold text-center mt-4 text-xl">No Order Found...</h1>
          </div>
        )}
      </Auth>
    </AppLayout>
  );
};

export default orderhistory;
