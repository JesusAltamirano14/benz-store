import { dbConnect } from "@/database/mongodb";
import { initialData } from "@/database/products";
import { productData } from "@/models/productSchema";
import { NextResponse } from "next/server";


export async function GET() {

    dbConnect();
    try {
        await productData.deleteMany();
        const responseData = await productData.insertMany(initialData.products);
        if(responseData){
            return NextResponse.json({'message':'data inserted on database'})
        }
        return NextResponse.json({message:'No data inserted'})
    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json(error.message)
        }
    }
}