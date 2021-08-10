export interface Goods{
    sku:number;
    name:string;
    stock:number;
    price:number;
    type:number;
    imageUrl:string;
    imageDetailUrl:string;
}
export interface Inventories{
    status:200|500,
    info:"success"|"error",
    inventories:Goods[]
}
export interface GetLogin{
    status : 200,
    info : "success",
    openid : string,
    userId : string,
    payMini : {
        timeStamp : string,
        nonceStr : string,
        prepayId : string,
        signType : 'MD5',
        paySign : string
    }
}
export type api = Inventories | GetLogin