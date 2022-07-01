import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { getLocalStorage } from '../utils/localstorage';

type USER = {
    id : number,
    name : string,
    phone : string,
    email : string,
    address : string
}

export const defaultUser = {
  id : 0,
  name : "",
  phone : "",
  email : "",
  address : ""
}

const defaultState = {
  user: defaultUser,
  setUser: (state: USER) => {}
};



const AppContext = createContext(defaultState);

function AppProvider({children} : any) {
  const [user, setUser] = useState<USER>(defaultState.user);
  const router = useRouter();
  
  useEffect(() => {
    const auth = getLocalStorage("fastfood_auth");
    if (auth) {
      setUser(auth.user);
    }
  }, [router.asPath]);

  return (
    <AppContext.Provider value={{user,setUser}} >
        {children}
    </AppContext.Provider>
  )
}

export const AppState = () => {
  return useContext(AppContext);
};

export default AppProvider