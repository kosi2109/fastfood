import { deleteCookie } from "cookies-next";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { logout } from "../api";
import Auth from "../components/Auth";
import AppLayout from "../components/Layouts/AppLayout";
import Detail from "../components/client/Profile/Detail";
import ProfileImage from "../components/client/Profile/ProfileImage";
import GoogleMap from "google-map-react";
import { useRouter } from "next/router";
import InformationMiss from "../components/client/InformationMiss";
import Head from "next/head";
import MapPointer from "../components/MapPointer";
import { useSelector, useDispatch } from 'react-redux'
import {logout as authLogout} from "../store/slices/authSlice"
import { USER } from "../types";


const profile: NextPage = () => {
  const router = useRouter();
  const [coordinate, setCoordinate] = useState({ lat: 0, lng: 0 });
  const google_key: any = process.env.GOOGLE_MAP_KEY;
  const [mapLoading, setmapLoading] = useState(false);
  const user = useSelector((state : any) => state.auth);
  
  const dispatch = useDispatch();

  const logoutController = async () => {
    await logout();
    dispatch(authLogout());
    deleteCookie("fastfood_auth");
    deleteCookie("jwt");
  };

  useEffect(() => {
    getUserLocation();
  }, [user]);
  
  const getUserLocation = async ()=>{
    if (user?.address?.split(",")[0]) {
      await setCoordinate({
        lat: Number(user?.address?.split(",")[0]),
        lng: Number(user?.address?.split(",")[1]),
      });
      setmapLoading(false);
    }

  }
  
  return (
    <AppLayout>
      <Head>
        <title>Fastfood | {user?.name ? user?.name : 'Profile'}</title>
      </Head>
      <Auth>
        {user?.phone && (user?.address !== "0,0" && user?.address) ? (
          <div className="py-1 flex items-center flex-col w-full">
            <div className="w-3/5 flex items-center justify-center mb-3">
              <ProfileImage image_url={user?.profile_img} />
            </div>
            <Detail title="Full Name" value={user?.name} />
            <Detail title="Email" value={user?.email} />
            <Detail title="Phone" value={user?.phone} />
            <div className="w-full md:w-1/2 h-40 md:h-80 mb-3 bg-bgGray border-2 rounded-md px-3 py-2">
              {!mapLoading && 
                <GoogleMap
                  bootstrapURLKeys={{
                    key: google_key,
                  }}
                  center={coordinate}
                  defaultZoom={14}
                  options={{
                    disableDefaultUI: true,
                    zoomControl: true,
                  }}
                  yesIWantToUseGoogleMapApiInternals
                >
                  <MapPointer lat={coordinate.lat} lng={coordinate.lng} />
                </GoogleMap>
              }
            </div>
            <button
              onClick={() => router.push("/orderhistory")}
              className="h-10 bg-bgGray font-semibold border-2 text-bgGreen w-full md:w-1/2 rounded-md mb-3"
            >
              History
            </button>
            <button
              className="h-10 bg-bgGreen text-textWhite w-full md:w-1/2 rounded-md"
              onClick={logoutController}
            >
              Logout
            </button>
          </div>
        ) : (
          <InformationMiss />
        )}
      </Auth>
    </AppLayout>
  );
};

export default profile;
