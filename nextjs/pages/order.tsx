import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import OrderItem from "../components/Order/OrderItem";
import AppLayout from "../components/Layouts/AppLayout";
import ProfileImage from "../components/Profile/ProfileImage";
import Auth from "../components/Auth";
import { AppState } from "../context/AppProvider";
import GoogleMap from "google-map-react"
import { HiLocationMarker } from "react-icons/hi";

const MapPointer = ({}:any) => <div><HiLocationMarker size={30}/></div>;
const Shop = ({}:any) => <div><HiLocationMarker color="green" size={30}/></div>;


//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
function calcCrow(lat1:number, lon1 : number, lat2 : number , lon2 : number) 
{
  var R = 6371; // km
  var dLat = toRad(lat2-lat1);
  var dLon = toRad(lon2-lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c;
  return d;
}

// Converts numeric degrees to radians
function toRad(Value : number) 
{
    return Value * Math.PI / 180;
}

function caculateDeliPricePerDistance(distance : number) {
  return distance * 1000
}

function findCenter(markers:any) {
  let lat = 0;
  let lng = 0;
  
  for(let i = 0; i < markers.length; ++i) {
      lat += markers[i].lat;
      lng += markers[i].lng;
  }

  lat /= markers.length;
  lng /= markers.length;

  return {lat: lat, lng: lng}
}

const order: NextPage = () => {
  const {cartItems} = AppState();
  const [coordinate, setCoordinate] = useState({lat : 0 , lng : 0});
  const [shopCoordinate, setShopCoordinate] = useState({lat : 20.14505605784014, lng : 94.91828780720611 })
  const [deliFree, setDeliFree] = useState(0)
  const [mapCenter, setMapCenter] = useState({lat : 20.14505605784014, lng : 94.91828780720611})

  const {user} = AppState();

  useEffect(()=>{
    if(user?.address?.split(',')[0]){
      const userAddress = {lat:Number(user?.address?.split(',')[0]),lng: Number(user?.address?.split(',')[1])}
      setCoordinate(userAddress);
      setMapCenter(findCenter([shopCoordinate,userAddress]));
      const d = calcCrow(shopCoordinate.lat,shopCoordinate.lng,userAddress.lat,userAddress.lng);
      setDeliFree(Math.floor(caculateDeliPricePerDistance(d)));
    }
  },[user])

  let subTotal = 0;
  return (
    <AppLayout back={true} title="Order Status">
      <Auth>
      <div className="w-full py-2 mx-auto md:w-2/3 lg:w-1/2 2xl:w-1/3 flex flex-col">
        <div className="mb-3 w-full h-40 rounded-md bg-textGray">
        <GoogleMap
            bootstrapURLKeys={{key:"AIzaSyAWiuvmnGdI7dIdMX-I7JHWVhQV-8O9OyY"}}
            defaultCenter={coordinate}
            center={coordinate}
            resetBoundsOnResize={true}
            defaultZoom={15}
            margin = {[50,50,50,50]}
            options={{ disableDefaultUI: true, zoomControl: true }}
            yesIWantToUseGoogleMapApiInternals
          >
            <MapPointer
              lat={coordinate.lat}
              lng={coordinate.lng}
            />
            <Shop
              lat={shopCoordinate.lat}
              lng={shopCoordinate.lng}
            />
          </GoogleMap>
        </div>
        <div className="mb-3 w-full flex px-5 py-4 rounded-md bg-bgGray border-2 items-center justify-start py-3">
          <div className="w-1/6 flex items-center justify-start">
            <ProfileImage />
          </div>
          <div className="w-5/6 pl-2 flex flex-col">
            <h4 className="font-bold text-textBlack text-lg">{user.name.split(" ")[0]}</h4>
            <h4 className="font-semibold">{user.name.split(" ").splice(1,user.name.length-1).join(" ")}</h4>
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
