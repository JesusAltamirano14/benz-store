import { dbConnect } from "@/database/mongodb";
import { productData } from "@/models/productSchema";
import { NextResponse } from "next/server";


export async function GET(request:Request,{params}:{params:{keyword:string}}){

    let {keyword} = params;

    if(keyword.length===0) return NextResponse.json({message:'Length must be more than 0'});

    keyword = keyword.toString().toLocaleLowerCase();

    try {
        dbConnect();
        const productsFounded = await productData.find({$text:{$search:keyword}});
        return NextResponse.json(productsFounded);

    } catch (error) {
        if(error instanceof Error) return NextResponse.json({message:error.message});
    }

}