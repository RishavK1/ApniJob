import mongoose from "mongoose";
import dotenv from "dotenv";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");
    }
    catch (error) { 
        console.error(error);
    }
   
}

export default connectDb;
