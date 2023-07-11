export type ValidSizes = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';

export interface OrderClient{
    userId:string,
    itemsOrder:Array<ItemsOrderClient>,
}

export interface ItemsOrderClient {
    _id:string,
    size:ValidSizes,
    quantity:number,
}


export interface OrderData{
    _id?:string,
    userId:string,
    userEmail:string,
    itemsOrder:ItemsOrderReady[],
    address:Address,
    phone:String,
    numberProducts:number,
    subTotal:number,
    taxes:number,
    total:number,
    isPaid:boolean
}

export interface ItemsOrderReady{
    _id:string,
    images: string[],
    title:string,
    price: number,
    size: ValidSizes,
    quantity:number,
}

export interface Address{
    country:string,
    address:string,
    city:string,
    state:string,
    codezip:string
}


