import axios from "axios";
import { hasCookie , getCookie } from "cookies-next";
import { REGISTER } from "../pages/register";
import { LOGIN } from "../types";


export const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
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

export const allMenus = (category? : string)=> category ? API.get(`menus?category=${category}`) : API.get(`menus`) ;
export const showMenus = (slug : string)=>  API.get(`menus/${slug}`);
export const allCategory = ()=> API.get(`categories`);
export const featureCategory = ()=> API.get(`categories/feature`);

// auth
export const login = (data : LOGIN)=> {
        axios.get('http://localhost:8000/sanctum/csrf-cookie')
        return API.post(`login`,data)
};
export const register = (data : REGISTER)=> API.post(`register`,data);
export const logout = ()=> API.post(`logout`);

