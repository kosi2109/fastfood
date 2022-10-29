import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import commonReducer from "./slices/commonSlice";
import cartReducer from "./slices/cartSlice";
import formErrorReducer from "./slices/formErrorSlice";

const reducers = combineReducers({
  auth: authReducer,
  common: commonReducer,
  cart: cartReducer,
  formError: formErrorReducer
});

export const store = configureStore({
  reducer: reducers,
});
