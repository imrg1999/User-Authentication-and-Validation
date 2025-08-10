import mongoose from "mongoose";
import dotenv from 'dotenv';

//Anchoring dotenv
dotenv.config();

export const connectDB = async(req,res) => {
    try{
    const dbCon = await mongoose.connect(process.env.mongoUri);
    console.log("DB Connected!");
    
   }catch(e) {
    console.log(e.message);
   }
}