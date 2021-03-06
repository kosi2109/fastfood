import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { CART_ITEM, MENU, USER } from '../types';
import { getLocalStorage, setLocalStorage } from '../utils/localstorage';
import { getCookie, hasCookie } from 'cookies-next';


export const defaultUser = {
  id : 0,
  name : "",
  phone : "",
  email : "",
  address : ""
}

export enum CART_ACTION{
  INCREASE = "increase",
  DECREASE = "decrease"
}


export const defaultCart : CART_ITEM[] = [];

const defaultState = {
  user: defaultUser,
  setUser: (state: USER) => {},
  loading : true,
  setLoading: (state: boolean) => {},
  cartItems : defaultCart,
  increaseItem: (menu:MENU,size:string,type:CART_ACTION) => {},
  cartItemTotal : 0,
  setCartItemTotal : (state: number) => {},
  selectedCategory : 'all',
  setSelectedCategory : (state: string) => {},
};


const AppContext = createContext(defaultState);

function AppProvider({children} : any) {
  const [user, setUser] = useState<USER>(defaultState.user);
  const [loading, setLoading] = useState<boolean>(defaultState.loading)
  const [cartItems, setCartItems] = useState<CART_ITEM[]>([])
  const [cartItemTotal, setCartItemTotal] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState(defaultState.selectedCategory);

  const router = useRouter();
  
  // initial app
  useEffect(() => {
    const auth = hasCookie("fastfood_auth");
    if (auth) {
      setUser(JSON.parse(getCookie('fastfood_auth') as string));
      setLoading(false);
    }else{
      setUser(defaultUser);
      setLoading(false);
    }
  }, [router.asPath]);
  
  useEffect(()=>{
    const items = getLocalStorage("fastfood_cart");
    if (items) {
      setCartItems(JSON.parse(items));
      countCartItem(JSON.parse(items));
    }    
  },[])

  // counter for whole cart
  const countCartItem = (items:CART_ITEM[])=>{
    setCartItemTotal(items.reduce((pre,state)=>pre += state.quantity,0));
  }

  // increase item in cart
  const increaseItem = (menu:MENU,size:string,type:CART_ACTION)=>{ 
    let items = cartItems;
    const ind = items.findIndex((item)=> item.item.id === menu.id && item.size === size);
    if (type === CART_ACTION.INCREASE){
      if (ind !== -1){
        items[ind].quantity += 1
      }else{
        items = [...items,{item:menu,size:size,quantity:1}]
      }   
    }else if(type === CART_ACTION.DECREASE){
      if (ind !== -1){
        items[ind].quantity -= 1
      }
      if(items[ind].quantity < 1){
        items = items.filter((item)=> item.item !== items[ind].item)
      }
    }
    setCartItems(items);
    countCartItem(items);
    setLocalStorage('fastfood_cart',JSON.stringify(items));
  }

  
  return (
    <AppContext.Provider value={{user,setUser,loading,setLoading,cartItems,increaseItem,cartItemTotal,setCartItemTotal,selectedCategory,setSelectedCategory}} >
        {children}
    </AppContext.Provider>
  )
}

export const AppState = () => {
  return useContext(AppContext);
};

export default AppProvider