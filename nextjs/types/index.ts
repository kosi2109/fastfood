import { USER } from "../context/AppProvider"



export interface LOGIN{
    email : string,
    password : string
}
export interface CATEGORY{
    id : number,
    name : string,
    slug : string
}

export interface MENU{
    id : number,
    name : string,
    slug : string,
    description : string,
    cover_img : string,
    categories : CATEGORY[],
    user : USER,
    sizes : SIZE[]
}

export interface PRICE {
    menu_id: number,
    size_id: number,
    price: number
}

export interface SIZE{
    id: number,
    name: string,
    price: PRICE
}

