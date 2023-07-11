import { dbConnect } from "@/database/mongodb";
import { orderData } from "@/models/orderSchema";
import { NextResponse } from "next/server";



export async function GET(request:Request,{params}:{params:{id:string}}) {

    const {id:_id} = params;

    dbConnect();
    try {
        const oneOrderFounded = await orderData.findById(_id);
        if(!oneOrderFounded) return NextResponse.json({message:`order doesn't exist`});
        return NextResponse.json(oneOrderFounded);
    
    } catch (error) {
        if(error instanceof Error) return NextResponse.json({message:error.message});
    }
    
}