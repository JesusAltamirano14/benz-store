import { OrderData } from "@/types/order";
import { Schema ,models, model} from "mongoose";


const orderSchema = new Schema<OrderData> ({
    userId:{type:String,required:true},
    userEmail:{type:String,required:true},
    itemsOrder:[{
        _id:{type:String,required:true},
        images: [{type:String,required:true}],
        title:{type:String,required:true},
        price: {type:Number,required:true},
        size: {
            type:String,
            required:true,
            enum:{
                values:['XS','S','M','L','XL','XXL','XXXL'],
                message:'{VALUE} is invalid'
            }
        },
        quantity:{type:Number,required:true}

    }],
    address:{
        country:{type:String,required:true},
        city:{type:String,required:true},
        state:{type:String,required:true},
        address:{type:String,required:true},
        codezip:{type:String,required:true}
    },
    phone:{type:String,required:true},
    numberProducts:{type:Number,required:true},
    subTotal:{type:Number,required:true},
    taxes:{type:Number,required:true},
    total:{type:Number,required:true},
    isPaid:{type:Boolean,required:true}
})


export const orderData = models.Order || model('Order',orderSchema);
