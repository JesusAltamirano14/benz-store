import { dbConnect } from "@/database/mongodb";
import { userData } from "@/models/userSchema";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { ChangePassword } from "@/types/user";


export async function POST(request:Request,{params}:{params:{id:string}}){

    dbConnect();
    const {id:_id} = params;
    try {
        const validatePassword = (password:string) : boolean => {
            const regex = /^.{5,20}$/
            return regex.test(password);
        }

        const body :ChangePassword = await request.json();
        const { previousPassword,newPassword1,newPassword2 } = body;

        const userFounded  = await userData.findOne({_id}).select("+password");
        
        if(!userFounded) return NextResponse.json({message:`user doesn't exist`});

        const matchPassword = await bcrypt.compare(previousPassword,userFounded.password);

        if(!matchPassword) return NextResponse.json({message:`Password incorrect`});

        if(!(newPassword1===newPassword2)) return NextResponse.json({message:`New passwords don't match`});

        if(!validatePassword(newPassword1)) return NextResponse.json({message:`Password's length must be more than 5 and less than 20 characters`})

        const newPasswordHashed = await bcrypt.hash(newPassword1,12);

        const userChanged = await userData.findOneAndUpdate({_id},{password:newPasswordHashed},{new:true});
        if(!userChanged) return NextResponse.json({message:`user doesn't exist`});

        return NextResponse.json(userChanged);
    } catch (error) {
        if(error instanceof Error) {
            return NextResponse.json({message:error.message});
        }
    }

}