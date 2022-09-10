import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import OrderItem from "../components/client/Order/OrderItem";
import AppLayout from "../components/Layouts/AppLayout";
import ProfileImage from "../components/client/Profile/ProfileImage";
import Auth from "../components/Auth";
import { AppState } from "../context/AppProvider";
import GoogleMap from "google-map-react";
import { HiLocationMarker } from "react-icons/hi";
import {
  caculateDeliPricePerDistance,
  calcCrow,
} from "../utils/mapCaculation";
import { storeOrder } from "../api";
import { CREATE_ORDER, MENU, SIZE } from "../types";
import test from "../public/assets/delivery.gif";
import EmptyCart from "../components/client/EmptyCart";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import Head from "next/head";
import MapPointer from "../components/MapPointer";

const order: NextPage = () => {
  const { cartItems, clearCart } = AppState();
  const [coordinate, setCoordinate] = useState({ lat: 0, lng: 0 });
  const [showAnimation, setShowAnimation] = useState(false);
  const [loading, setLoading] = useState(false);
  const google_key: any = process.env.GOOGLE_MAP_KEY;

  const shopCoordinate = {
    lat: 20.14505605784014,
    lng: 94.91828780720611,
  };
  const [deliFee, setDelifee] = useState(0);

  const { user } = AppState();

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition((data) => {
      setCoordinate({ lat: data.coords.latitude, lng: data.coords.longitude });
    });
  },[])

  useEffect(() => {
    const d = calcCrow(
      shopCoordinate.lat,
      shopCoordinate.lng,
      coordinate.lat,
      coordinate.lng
    );
    setDelifee(Math.floor(caculateDeliPricePerDistance(d)));

  }, [coordinate]);
  let subTotal = 0;

  const makeOrder = async () => {
    setLoading(true);
    const data: CREATE_ORDER = {
      user_id: user.id,
      grand_total: deliFee + subTotal,
      deli_fee: deliFee,
      address: `${coordinate.lat},${coordinate.lng}`,
      items: cartItems.map((item) => {
        return {
          menu_id: item.item.id,
          size_id: item.size.id,
          quantity: item.quantity,
        };
      }),
    };

    storeOrder(data)
      .then(() => {
        clearCart();
        setLoading(false);
        setShowAnimation(true);
      })
      .catch((res) => toast.error(res.data.message));
  };

  const getPrice = (size: SIZE, menu: any) => {
    let price = size?.price;
    if (isDiscountActive(menu)) {
      price = size?.price - size?.price * (menu?.discount.discount / 100);
    }
    return price;
  };

  function isDiscountActive(menu: MENU) {
    let today = new Date();
    let from = new Date(menu?.discount?.discount_from);
    let to = new Date(menu?.discount?.discount_to);
    if (from <= today && today <= to) {
      return true;
    }
    return false;
  }

  return (
    <AppLayout back={true}>
      <Head>
        <title>Fastfood | Order</title>
      </Head>

      {showAnimation && (
        <div className="fixed left-0 top-0 z-10 w-screen h-screen flex flex-col items-center justify-center bg-bgWhite">
          <img src={test.src} alt="" className="object-contain" />
          <h5 className="font-semibold text-xl text-textGreen">
            Your Order is in progress...
          </h5>
        </div>
      )}

      <Auth>
        {cartItems.length > 0 ? (
          <div className="w-full py-2 mx-auto md:w-2/3 lg:w-1/2 2xl:w-1/3 flex flex-col">
            <div className="mb-3 w-full h-40 md:h-60 rounded-md bg-textGray z-2">
              <GoogleMap
                bootstrapURLKeys={{
                  key: google_key,
                }}
                defaultCenter={coordinate}
                center={coordinate}
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={{ disableDefaultUI: true, zoomControl: true }}
                yesIWantToUseGoogleMapApiInternals
                onChange={(e) =>
                  setCoordinate({ lat: e.center.lat, lng: e.center.lng })
                }
              >
                <MapPointer lat={coordinate.lat} lng={coordinate.lng} />
                <MapPointer color="green" lat={shopCoordinate.lat} lng={shopCoordinate.lng} />
              </GoogleMap>
            </div>
            <div className="mb-3 w-full flex px-5 py-4 rounded-md bg-bgGray border-2 items-center justify-start py-3">
              <div className="w-1/6 flex items-center justify-start">
                <ProfileImage />
              </div>
              <div className="w-5/6 pl-2 flex flex-col">
                <h4 className="font-bold text-textBlack text-lg">
                  {user.name.split(" ")[0]}
                </h4>
                <h4 className="font-semibold">
                  {user.name
                    .split(" ")
                    .splice(1, user.name.length - 1)
                    .join(" ")}
                </h4>
              </div>
            </div>
            <h2 className="font-bold text-start text-lg mb-3">Order Detail</h2>
            <div className="p-2 border-2 bg-bgGray rounded-md">
              <div className="border-b py-3">

                {cartItems.map((item, i) => {
                  const total =
                    item.quantity *
                    getPrice(
                      item.item.sizes.filter((s) => s.id == item.size.id)[0],
                      item.item
                    );
                  subTotal += total;
                  return (
                    <OrderItem
                      key={i}
                      size={item.size.name}
                      quantity={item.quantity}
                      name={item.item.name}
                      total={total}
                    />
                  );
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
                  <p>{deliFee}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between py-3">
              <h4 className="font-bold text-lg">Grand Total</h4>
              <h4 className="font-semibold text-lg">{deliFee + subTotal} Ks</h4>
            </div>

            <button
              onClick={makeOrder}
              className="mt-3 w-full h-10 rounded-md bg-bgGreen text-textWhite"
            >
              {loading ? (
                <ClipLoader size={20} color="#ffffff" />
              ) : (
                "Comfirm Order"
              )}
            </button>

          </div>
        ) : (

          <EmptyCart />
        
        )}
      </Auth>
    </AppLayout>
  );
};

export default order;
