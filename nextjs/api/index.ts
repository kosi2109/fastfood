import axios, { AxiosRequestConfig } from "axios";

const API = axios.create({
    baseURL: 'https://some-domain.com/api/'
})

API.interceptors.request.use((req : AxiosRequestConfig) => {
    if (localStorage.getItem("snapchat_profile")) {
      req.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem("snapchat_profile")).token
      }`;
    }
  
    return req;
});