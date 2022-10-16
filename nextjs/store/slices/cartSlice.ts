import { createSlice } from "@reduxjs/toolkit";
import { CART_ITEM } from "../../types";
import { getLocalStorage, setLocalStorage } from "../../utils/localstorage";


const initialState : any = {
    items : [],
    cartQuantity: 0,
    cartTotal: 0,
}

const storage = getLocalStorage("fastfood_cart");

const defaultState = storage ? storage : initialState;    

export const cartSlice = createSlice({
  name: "cart",
  initialState: defaultState,
  reducers: {
    clearCart : ()=> {
        return initialState;
    },
    getCart : (state)=> {
        const items = getLocalStorage("fastfood_cart");
        if (items) {
            return JSON.parse(items);
        } else {
            return initialState;
        }

    },
    addToCart: (state, action) => {        
      const item : any = state.items.find(
        (item: any) =>
          item.item.id === action.payload.menu.id &&
          item.size.id === action.payload.size.id
      );

      if (item) {
          item.quantity += 1;
      } else {
        state.items.push({ item: action.payload.menu, size: action.payload.size, quantity: 1 });
      }

      const {total , quantity} = state.items.reduce((pre : any , current : any) => {
        let total = pre.total + (current.size.price * current.quantity);
        let quantity = pre.quantity + current.quantity;
        
        return {total,quantity}
      }, {quantity : 0 , total : 0})

      state.cartQuantity = quantity;
      state.cartTotal = total;
      setLocalStorage("fastfood_cart", state);
      
    },

    removeFromCart: (state, action) => {
        const item : any = state.items.find(
            (item: any) =>
            item.item.id === action.payload.menu.id &&
              item.size.id === action.payload.size.id
          );
          
          if (item) {
                if (item.quantity == 1) {
                    state.items = state.items.filter((i : any) => i.id !== item.id)
                }else {
                    item.quantity -= 1;
                }
                const {total , quantity} = state.items.reduce((pre : any , current : any) => {
                    let total = pre.total + (current.size.price * current.quantity);
                    let quantity = pre.quantity + current.quantity;
                    
                    return {total,quantity}
                }, {quantity : 0 , total : 0})
                
                state.cartQuantity = quantity;
                state.cartTotal = total;
                setLocalStorage("fastfood_cart", state);
            } else {
                setLocalStorage("fastfood_cart", state);
                return state;
            }
            
        },
    },
});

export const {addToCart,removeFromCart,getCart,clearCart} = cartSlice.actions;

export default cartSlice.reducer;
