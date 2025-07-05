import mongoose from 'mongoose';

export const connectDB = async()=>{
    try{
        const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/chat-app";
        const conn=await mongoose.connect(mongoURI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }catch(err){
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
}