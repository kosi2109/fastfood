export interface LOGIN{
    email : string,
    password : string
}

export type USER = {
    id : number,
    name : string,
    phone : string,
    email : string,
    address : string
}


export type CART_ITEM = {
    item : MENU,
    size : string;
    quantity : number
}

export interface BANNER{
    id: number,
    title: string,
    description: string,
    image_url: string,
    menu: MENU,
}


export type MENU = {
  id: number;
  name: string;
  slug: string;
  description: string;
  cover_img?: any;
  categories: CATEGORY[];
  sizes: SIZE[];
}

export type SIZE = {
  id: number;
  name: string;
  price: number;
}

export type CATEGORY = {
  id: number;
  name: string;
  slug: string;
  feature: number;
}