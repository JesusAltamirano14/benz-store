import { dbConnect } from "@/database/mongodb"
import { userData } from "@/models/userSchema";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs';
import { User } from "@/types/user";


const handler = NextAuth({
  providers:[
    CredentialsProvider({
        name:'Credentials',
        credentials:{
            name:{label:'name',type:'text'},
            email:{label:'email',type:'email'},
            password:{label:'password',type:'password'}
        },

        async authorize(credentials,request){
            dbConnect();
            const userFounded= await userData.findOne({email:credentials?.email}).select("+password");
            if(!userFounded) throw new Error('Invalid credentials');

            const passwordMatch = await bcrypt.compare(credentials!.password,userFounded.password);
            if(!passwordMatch) throw new Error('Invalid credentials');

              return userFounded
          }
    })
  ],
  callbacks:{
    jwt({token,user}){
      if(user){
        const {_id,name,email,address} = user as any;
        token.user = {_id,name,email,address};
      }
      return token;
    },

    session({session,token}){
      session.user = token.user as any;
      return session;
    }
  }
  ,
  pages:{
    signIn:'/signin'
  }

})

export { handler as GET, handler as POST }