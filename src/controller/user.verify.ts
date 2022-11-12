import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { tokenModel } from "../database/models/token.schema";
import { userModel } from "../database/models/user.schema";
import { isValidObjectId } from "mongoose";
import { emailVerified } from "../services/mail/otp.verification";
export const verifyUser = async (request:Request,response:Response)=>{

   try {

    const {otp,userId} = await  request.body;

    if(!otp || !userId){
        return response.status(400).json({status:"error",message:"please provide your otp"});
    }

    if(!isValidObjectId(userId)){
        return response.status(400).json({status:"error",message:"user not found"});
    }

    const user = await userModel.findById(userId);

    const getOtp:any = await tokenModel.findOne({user:user?._id});
    
    const verify = bcrypt.compareSync(otp,getOtp?.token);
    if(verify){
        const del = await tokenModel.findByIdAndDelete(getOtp._id);
        const verifyUser = await userModel.findByIdAndUpdate(userId,{verified:true});
        if(verifyUser){
            emailVerified(user?.email);
            return response.status(200).json({status:"ok",message:"your email has been verified"});
        }else{
            return response.status(400).json({status:"error",message:"your email has not been verified User not found!"});
        }
    }else{
        return response.status(401).json({status:"error",message:"your otp is incorrect"});
    }
   } catch (error) {
    return response.status(500).json({status:"error",message:error});
   }

}