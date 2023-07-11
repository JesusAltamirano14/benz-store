import { dbConnect } from "@/database/mongodb";
import { orderData } from "@/models/orderSchema";
import { NextResponse } from "next/server";

export async function GET(request:Request,{params}:{params:{id:string}}) {

    const {id:userId} = params

    try {
        dbConnect();
        const orderFounded = await orderData.find({userId})
        if(!orderFounded) return NextResponse.json({message:`there aren't orders with this id`});
        return NextResponse.json(orderFounded);
    } catch (error) {
        if(error instanceof Error) return NextResponse.json({message:error.message});
    }

}