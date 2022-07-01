import { deleteCookie } from "cookies-next";
import { NextPage } from "next";
import React from "react";
import Auth from "../components/Auth";
import AppLayout from "../components/Layouts/AppLayout";
import Detail from "../components/Profile/Detail";
import ProfileImage from "../components/Profile/ProfileImage";
import { AppState, defaultUser } from "../context/AppProvider";


const profile: NextPage = () => {
  const {user , setUser} = AppState();
  
  const logout = ()=>{
    deleteCookie('token')
    setUser(defaultUser);
  }
  return (
    <AppLayout title="Profile">
      <Auth>
        <div className="py-1 flex items-center flex-col w-full">
          <div className="w-full flex items-center justify-center mb-3">
            <ProfileImage size={150} />
          </div>
          <Detail title="Full Name" value={user?.name} />
          <Detail title="Email" value={user?.email} />
          <Detail title="Phone" value={user?.phone} />
          <button className="h-10 bg-bgGreen text-textWhite w-full rounded-md" onClick={logout}>Logout</button>
        </div>
      </Auth>
      
    </AppLayout>
  );
};

export default profile;
