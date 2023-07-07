import { dbConnect } from "@/database/mongodb";
import { userData } from "@/models/userSchema";
import { Address } from "@/types/user";
import { NextResponse } from "next/server";


export async function POST(request:Request, {params}:{params:{id:string}}){

    const body : {phone:string} = await request.json();
    const { phone } = body;
    const {id:_id} = params;
    dbConnect();
    
    try {
        const userFounded = await userData.findOne({_id});

        if(!userFounded) return NextResponse.json({message:'user not founded jesus'});
        if(!(phone.length<=15)) return NextResponse.json({message:`Phone's length must be less or iqual than 15`});

        const userUpdated = await userData.findOneAndUpdate({_id},{
            phone,
        },{new:true})

        return NextResponse.json(userUpdated);
    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json({message:error})
        }
    }
}