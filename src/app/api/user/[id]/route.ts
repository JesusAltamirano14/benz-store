import { userData } from "@/models/userSchema";
import { NextResponse } from "next/server";


export async function GET(request:Request,{params}:{params:{id:string}}){

    try {
        const {id} = params;
        const foundedData = await userData.findById(id);
        if(!foundedData){
            return NextResponse.json({message:`user doesn't exist in database`});
        }
        return NextResponse.json(foundedData);
    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json({message:error.message});
        }
    }

}