import mongoose  from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const connectDB = async function () {
   try {
     await mongoose.connect(process.env.MONGODB_URI!);
     console.log("Mongodb Connected")
   } catch (error : any) {
    console.log(`Error : ${error.message}`)
   }
}

export default connectDB;