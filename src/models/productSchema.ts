

import { SeedProduct } from "@/types/product";
import { Schema, models, model} from "mongoose";

const productSchema = new Schema<SeedProduct>({
    description: {type:String ,required:true},
    images: [{type:String,required:true},],
    inStock:{type:Number,required:true},
    price: {type:Number,required:true},
    sizes: [{
        type:String,
        required:true,
        enum:{
            values:['XS','S','M','L','XL','XXL','XXXL'],
            message:'{VALUE} is invalid'
        }
    }],
    slug:{type:String,required:true,unique:true},
    tags: [{type:String,required:true}],
    title: {type:String,required:true},
    type: {
        type:String,
        required:true,
        enum:{
            values:['shirts','pants','hoodies','hats'],
            message:'{VALUE} is invalid'
        }
    },
    gender: {
        type:String,
        required:true,
        enum:{
            values:['men','women','kid','unisex'],
            message:'{VALUE} is invalid'
        }
    }
})

export const productData = models.Product || model('Product',productSchema)