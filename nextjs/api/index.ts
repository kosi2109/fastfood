import axios, { AxiosRequestConfig } from "axios";
import { getCookie, hasCookie } from "cookies-next";
import { REGISTER } from "../pages/register";
import { LOGIN } from "../types";

export const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    withCredentials : true
})

API.interceptors.request.use((req : any) => {
    if(hasCookie('token')) {
      req.headers.Authorization = `Bearer ${getCookie('token')}`;
    }   
    return req;
});

export const allMenus = (category? : string)=> API.get(`menus?catrgory=${category}`);
export const showMenus = (slug? : string)=> API.get(`menus/${slug}`);

// auth
export const login = (data : LOGIN)=> {
        axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie')
        return API.post(`login`,data)
};
export const register = (data : REGISTER)=> API.post(`register`,data);

