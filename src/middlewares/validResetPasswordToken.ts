import { NextFunction, Request, Response } from "express";
import { resetPasswordTokenModel } from "../database/models/reset.pasword.token";
import { userModel } from "../database/models/user.schema";
import bcrypt from "bcryptjs";
// import { IGetUserAuthInfoRequest, IGetUserAuthInfoResponse } from "../services/config/types";

export const verifyPasswordResetToken = async (request:Request,response:Response,next:NextFunction)=>{
    const {token,email} = await request.body;
    if(!token || !email){
        return response.status(401).json({status:"error",message:"credentials not found please provide a valid email or token"});
    }
    const user = await userModel.findOne({email:email});
    if(!user){
        return response.status(401).json({status:"error",message:"user not found with this email account !"});
    }
    const resetToken:any = await resetPasswordTokenModel.findOne({user:user._id});
    const verifyToken = await bcrypt.compare(token,resetToken?.token);
    request.user = user;
    if(verifyToken){
        next();
    }else{
        return response.status(401).json({status:"error",message:"token not matched try again with a correct token!"});
    }

}