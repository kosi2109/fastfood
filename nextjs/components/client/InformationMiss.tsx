import { useEffect } from "react";
import { deleteCookie, setCookie } from "cookies-next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { logout, updateUser } from "../../api";
import { AppState, defaultUser } from "../../context/AppProvider";
import GoogleMap from "google-map-react";
import { HiLocationMarker } from "react-icons/hi";

const MapPointer = ({}: any) => (
  <div>
    <HiLocationMarker size={30} />
  </div>
);

const InformationMiss = () => {
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const router = useRouter();
  const { user, setUser } = AppState();
  const [coordinate, setCoordinate] = useState({ lat: 0, lng: 0 });
  const google_key: any = process.env.GOOGLE_MAP_KEY;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((data) => {
      setCoordinate({ lat: data.coords.latitude, lng: data.coords.longitude });
    });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!user?.phone) {
      var data: any = { phone };
    } else {
      var data: any = { address: `${coordinate.lat},${coordinate.lng}` };
    }

    updateUser(data)
      .then((response) => {
        setUser(response.data);
        setCookie("fastfood_auth", response.data, {
          maxAge: 60 * 60 * 24 * 30, //1month
        });
        setLoading(false);
      })
      .catch((response) => {
        toast.error(response.response.data.message);
        setLoading(false);
      });
  };

  const logoutController = async () => {
    await logout();
    setUser(defaultUser);
    deleteCookie("fastfood_auth");
    deleteCookie("jwt");
  };

  return (
    <div className="w-full py-2 mx-auto md:w-2/3 lg:w-1/2 2xl:w-1/3 flex flex-col">
      <form
        onSubmit={handleSubmit}
        className="border-2 w-full flex flex-col rounded-sm shadow mb-4"
      >
        {!user?.phone ? (
          <>
            <div className="p-5 border-b-2">
              <h5 className="text-lg font-semibold">Enter Your Phone Number</h5>
            </div>
            <div className="p-5">
              <p className="mb-3">
                Your phone number is missing. Before You make an order you must
                fill your phone number.
              </p>
              <input
                onChange={(e) => setPhone(e.target.value)}
                type="test"
                placeholder="Phone Number"
                className="h-10 w-80 border-2 p-2 focus:outline-bgGreen"
              />
            </div>
          </>
        ) : (
          <>
            <div className="p-5 border-b-2">
              <h5 className="text-lg font-semibold">Enter Your Address</h5>
            </div>
            <div className="p-5">
              <p className="mb-3">
                Your address is missing. We need you default address to deliver
                our products.
              </p>
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
                </GoogleMap>
              </div>
            </div>
          </>
        )}
        <div className="flex justify-end items-center px-5 py-2">
          <button
            onClick={() => router.back()}
            type="button"
            className="bg-bgGray px-6 py-2 rounded-md text-textGreen border-2 font-semibold"
          >
            Cancel
          </button>
          <button
            disabled={loading && true}
            className="bg-bgGreen px-6 py-2 rounded-md text-white font-semibold ml-3"
          >
            {loading ? <ClipLoader size={20} color="#ffffff" /> : "Save"}
          </button>
        </div>
      </form>
      <button
        className="h-10 bg-bgGreen text-textWhite w-full rounded-md"
        onClick={logoutController}
      >
        Logout
      </button>
    </div>
  );
};

export default InformationMiss;
