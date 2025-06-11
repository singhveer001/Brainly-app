import mongoose  from "mongoose";

const connectDB = async function () {
   try {
     await mongoose.connect("mongodb+srv://task:task@cluster0.oftrk.mongodb.net/",{dbName : "brain"})
     console.log("Mongodb Connected")
   } catch (error : any) {
    console.log(`Error : ${error.message}`)
   }
}

export default connectDB;