


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
}