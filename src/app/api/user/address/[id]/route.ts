import { dbConnect } from "@/database/mongodb";
import { userData } from "@/models/userSchema";
import { Address } from "@/types/user";
import { NextResponse } from "next/server";


export async function POST(request:Request, {params}:{params:{id:string}}){

    const body : Address = await request.json();
    const { address,city,codezip,country } = body;
    const {id:_id} = params;
    dbConnect();
    
    try {
        const userFounded = await userData.findOne({_id});

        if(!userFounded) return NextResponse.json({message:'user not founded jesus'});
        if(!(address.length<=40)) return NextResponse.json({message:`Address' length must be less or iqual than 40`});
        if(!(city.length<=15)) return NextResponse.json({message:`City's length must be less or iqual than 40`});
        if(!(codezip.length<=6)) return NextResponse.json({message:`City's length must be less or iqual than 6`});

        const userUpdated = await userData.findOneAndUpdate({_id},{
            address:body
        },{new:true})

        return NextResponse.json(userUpdated);
    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json({message:error})
        }
    }

}