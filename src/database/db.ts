import mongoose, { mongo } from "mongoose";

export const connect = async (url:any)=>{
    await mongoose.connect(url);
}