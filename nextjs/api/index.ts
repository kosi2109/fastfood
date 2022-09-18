import axios from "axios";
import { hasCookie , getCookie } from "cookies-next";
import { LOGIN } from "../types";

const URL = process.env.BACKEND_URL;

export const API = axios.create({
    baseURL: `${URL}`,
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
export const allMenus = (category? : string)=> category ? API.get(`/api/menus?category=${category}`) : API.get(`/api/menus`);

// get menus that has discount
export const getDiscountMenus = ()=> API.get(`/api/menus/discount`);

// search menu
export const searchMenus = (keyword? : string)=>  API.get(`/api/menus?name=${keyword}`);

// single menu
export const showMenus = (slug : string)=>  API.get(`/api/menus/${slug}`);

// random menu
export const getRandomMenus = (id : number)=>  API.get(`/api/menus/random/${id}`);

// get all categories
export const allCategory = ()=> API.get(`/api/categories`);

//get deature categories only
export const featureCategory = ()=> API.get(`/api/categories/feature`);

// get all banner
export const allBanners = ()=> API.get(`/api/banners`);

// order
export const storeOrder = (data : any)=> API.post(`/api/orders`,data);

export const getOrders = (status : string)=> API.get(`/api/orders?status=${status}`);

// user 
export const updateUser = (data : any)=> API.put(`/api/user`, data);

// auth
export const login = (data : LOGIN)=> axios.post(`${URL}/api/login`,data);

export const register = (data : any)=> axios.post(`${URL}/api/register`,data);

export const logout = ()=> API.post(`/api/logout`);

export const forgotPassword = (data : any)=> axios.post(`${URL}/forgot-password`,data);

export const resetPassword = (data : any)=> axios.post(`${URL}/reset-password`,data);

export const emailVerificationNotification = ()=> API.post(`/email/verification-notification`);

export const emailVerify = (data : any)=> API.get(`/email/verify/${data.id}/${data.hash}?expires=${data.expires}&signature=${data.signature}`);

export const googleCallBack = ({code, scope, authuser, prompt} : any) => axios.get(`${URL}/api/google-auth/callback?code=${code}&scope=${scope}&authuser=${authuser}&prompt=${prompt}`)

export const googleAuth = () => axios.get(`${URL}/api/google-auth`)