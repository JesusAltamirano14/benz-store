import { userData } from "@/models/userSchema";
import { User } from "@/types/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import { dbConnect } from "@/database/mongodb";

export async function POST(request:Request) {

    dbConnect();
    try {
        const body : User =  await request.json();
        const {email,name,password} = body

        const validateName = (name:string) : boolean => {
            const regex = /^.{5,20}$/
            return regex.test(name);
        }

        const validateEmail = (email:string) : boolean => {
            const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
            return regex.test(email);
        }

        const validatePassword = (password:string) : boolean => {
            const regex = /^.{5,20}$/
            return regex.test(password);
        }

        if(!validateName(name)){
            return NextResponse.json({message:`name must be more than 5 characters and less then 20 characters`},{status:409});
        }
        if(!validateEmail(email)){
            return NextResponse.json({message:`insert an valid email`},{status:409});
        }
        if(!validatePassword(password)){
            return NextResponse.json({message:`password must be more than 5 characters and less then 20 characters`},{status:409});
        }

        const userSameEmail = await userData.findOne({email});

        if(userSameEmail){
            return NextResponse.json({message:`this email already exist`},{status:409});
        }

        const passwordHashed = await bcrypt.hash(password,12);
        const userCreated  = new userData<User>({
            name,
            email,
            password:passwordHashed
        })
        const userSaved = await userCreated.save();
        return NextResponse.json(userSaved);
    } catch (error) {
        if(error instanceof Error) return NextResponse.json({message:error.message});
    }
}