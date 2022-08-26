import axios from "axios";
import { hasCookie , getCookie } from "cookies-next";
import { REGISTER } from "../pages/register";
import { LOGIN } from "../types";

const URL = process.env.BACKEND_URL || 'http://localhost:8000' ;

export const API = axios.create({
    baseURL: `${URL}/api/`,
    withCredentials : true,
    headers: {
        'Content-Type': 'application/json',
    },
})


API.interceptors.request.use((req : any) => {
    if (hasCookie('jwt')) {
      req.headers.Authorization = `Bearer ${getCookie('jwt')}`;
    }
    return req;
  });

// get menus by catagory or all
export const allMenus = (category? : string)=> category ? API.get(`menus?category=${category}`) : API.get(`menus`);
// search menu
export const searchMenus = (keyword? : string)=>  API.get(`menus?name=${keyword}`);
// single menu
export const showMenus = (slug : string)=>  API.get(`menus/${slug}`);
// get all categories
export const allCategory = ()=> API.get(`categories`);
//get deature categories only
export const featureCategory = ()=> API.get(`categories/feature`);
// get all banner
export const allBanners = ()=> API.get(`banners`);

// order
export const storeOrder = (data:any)=> API.post(`orders`,data);
export const getOrders = (status:string)=> API.get(`orders?status=${status}`);

// auth
export const login = (data : LOGIN)=> {
        axios.get(`${URL}/sanctum/csrf-cookie`)
        return API.post(`login`,data)
};
export const register = (data : REGISTER)=> API.post(`register`,data);
export const logout = ()=> API.post(`logout`);

