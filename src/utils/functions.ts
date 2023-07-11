import { ItemsOrderClient, ItemsOrderReady } from "@/types/order";
import { SeedProductDataBase } from "@/types/product";



export const getProductsReadyToPost = (productsDataBase:SeedProductDataBase[],itemsOrderClient:ItemsOrderClient[]) : ItemsOrderReady[]=> {
    const productsReady = itemsOrderClient.map(p=>{
        
        const matchOrder = productsDataBase.find(producto=>String(producto._id)===String(p._id));
        if(matchOrder){ 
            return{
                _id:String(matchOrder._id),
                images:matchOrder.images,
                price:matchOrder.price,
                title:matchOrder.title,
                quantity:p.quantity,
                size:p.size
            }
        }else{
            return{
                _id:p._id,
                images:matchOrder!.images,
                price:matchOrder!.price,
                title:matchOrder!.title,
                quantity:0,
                size:'XL' as 'XL'
            }
        }
    })

    return productsReady;
}