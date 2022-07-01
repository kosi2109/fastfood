export const setLocalStorage = (key : string ,data : any)=>{
    if (typeof window !== "undefined"){
        localStorage.setItem(key,JSON.stringify(data));
    }
}

export const getLocalStorage = (key : string)=>{
    if (typeof window !== "undefined"){
        const data = window.localStorage.getItem(key);
        if (!data) return null;
        return JSON.parse(data || "");
    }
}




export const auth = ()=>{
    return getLocalStorage('fastfood_auth');
}

export const authLogin = (data : any)=>{
    setLocalStorage("fastfood_auth",data)
}

