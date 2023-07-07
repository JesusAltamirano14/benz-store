import { User } from "@/types/user";
import { Schema ,models ,model } from "mongoose";

const userSchema = new Schema<User>({
    name:{
        type:String,
        required:[true,'Name is required']
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true,
    },
    password:{
        type:String,
        required:[true,'Password is required'],
        select:false
    },
    address:{
        country:{type:String},
        address:{type:String},
        city   :{type:String},
        state  :{type:String},
        codezip:{type:String}
    },
    phone:{type:String}
},
{timestamps:true})

export const userData = models.User || model('User',userSchema)