import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import commonReducer from "./slices/commonSlice";
import cartReducer from "./slices/cartSlice";
import formErrorReducer from "./slices/formErrorSlice";
import {menuApi} from "./rtk/menus"
import { categoryApi } from "./rtk/category";
import { sizeApi } from "./rtk/sizes";

const reducers = combineReducers({
  auth: authReducer,
  common: commonReducer,
  cart: cartReducer,
  formError: formErrorReducer,
  [menuApi.reducerPath] : menuApi.reducer,
  [categoryApi.reducerPath] : categoryApi.reducer,
  [sizeApi.reducerPath] : sizeApi.reducer,
});

export const store = configureStore({
  reducer: reducers,
});
