import { dbConnect} from "@/database/mongodb";
import { productData } from "@/models/productSchema";
import { NextResponse } from "next/server";


export async function GET(){

    try {
        dbConnect();
        const responseData = await productData.find();
        if(!responseData) return NextResponse.json(`There are not products on database`)
        return NextResponse.json(responseData);
    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json({message:error.message})
        }
    }
}