import { dbConnect } from "@/database/mongodb";
import { userData } from "@/models/userSchema";
import { NextResponse } from "next/server";


export async function DELETE(request:Request,{params}:{params:{id:string}}){

    const {id:_id} = params;

    dbConnect();
    try {
        const userFounded = await userData.findById({_id});
        if(!userFounded) return NextResponse.json({message:`user doesn't exist`});

        const userDeleted = await userData.findOneAndDelete({_id});
        return NextResponse.json({ok:`user with id: ${userDeleted._id} was eliminated`});
    } catch (error) {
        if(error instanceof Error) return NextResponse.json({message:error.message});
    }


}