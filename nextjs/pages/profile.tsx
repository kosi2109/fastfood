import { deleteCookie } from "cookies-next";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { logout } from "../api";
import Auth from "../components/Auth";
import AppLayout from "../components/Layouts/AppLayout";
import Detail from "../components/Profile/Detail";
import ProfileImage from "../components/Profile/ProfileImage";
import { AppState, defaultUser } from "../context/AppProvider";
import GoogleMap from "google-map-react"
import {HiLocationMarker} from "react-icons/hi"


const MapPointer = ({}:any) => <div><HiLocationMarker size={30}/></div>;


const profile: NextPage = () => {
  const {user , setUser} = AppState();
  const [coordinate, setCoordinate] = useState({lat : 0 , lng : 0});
  const logoutController = async ()=>{
    await logout()
    setUser(defaultUser);
    deleteCookie('fastfood_auth')
  }
  useEffect(()=>{
    if(user?.address?.split(',')[0]){
      setCoordinate({lat: Number(user?.address?.split(',')[0]),lng: Number(user?.address?.split(',')[1])})
    }
  },[user])
  
  return (
    <AppLayout title="Profile">
      <Auth>
        <div className="py-1 flex items-center flex-col w-full">
          <div className="w-3/5 flex items-center justify-center mb-3">
            <ProfileImage/>
          </div>
          <Detail title="Full Name" value={user?.name} />
          <Detail title="Email" value={user?.email} />
          <Detail title="Phone" value={user?.phone} />
          <div className="w-full md:w-1/2 h-40 md:h-80 mb-3 bg-bgGray border-2 rounded-md px-3 py-2">
          <GoogleMap
            bootstrapURLKeys={{key:"AIzaSyAWiuvmnGdI7dIdMX-I7JHWVhQV-8O9OyY"}}
            defaultCenter={coordinate}
            center={coordinate}
            defaultZoom={14}
            margin = {[50,50,50,50]}
            options={{ disableDefaultUI: true, zoomControl: true }}
            yesIWantToUseGoogleMapApiInternals
          >
            <MapPointer
              lat={coordinate.lat}
              lng={coordinate.lng}
            />
          </GoogleMap>
        </div>
          <button className="h-10 bg-bgGreen text-textWhite w-full md:w-1/2 rounded-md" onClick={logoutController}>Logout</button>
        </div>
      </Auth>
      
    </AppLayout>
  );
};

export default profile;
