import mongoose from "mongoose";

export async function dbConnect () {
    
   try {
    const MONGO_URI = process.env.MONGO_URI;
    if(!MONGO_URI){
        throw Error('please insert a MONGO_URI in .env');
    }else{
        if(mongoose.connection.readyState === 1){
            console.log('database already connected');
            return Promise.resolve(true);
        }else{
            await mongoose.connect(MONGO_URI);
            console.log('database created and running')
            return Promise.resolve(true);
        }
    }
   } catch (error) {

    if(error instanceof Error){
        throw Error(error.message)
    }
   }
}