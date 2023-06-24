import { productData } from "@/models/productSchema";
import { NextResponse } from "next/server";

interface ParamsType {
    params:{
        id:string
    }
}

export async function GET(request:Request,{params}:ParamsType){

    try {
        const {id} = params;
        const foundedData = await productData.findById(id);
        if(!foundedData){
            return NextResponse.json({message:`product doesn't exist in database`});
        }
        return NextResponse.json(foundedData);
    } catch (error) {
        if(error instanceof Error){
            console.log(error.message);
            return NextResponse.json({message:error.message});
        }
    }

}