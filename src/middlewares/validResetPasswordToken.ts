import { NextFunction, Request, Response } from "express";
import { resetPasswordTokenModel } from "../database/models/reset.pasword.token";
import { userModel } from "../database/models/user.schema";
import bcrypt from "bcryptjs";

export const verifyPasswordResetToken = async (request:Request,response:Response,next:NextFunction)=>{
  try {
    const token:any = request.query.token;
    const email:any = request.query.email;
    console.log(token,email);
    
    if(!token || !email){
        return response.status(401).json({status:"error",message:"credentials not found please provide a valid email or token"});
    }
    const user = await userModel.findOne({email:email});
    console.log(user);
    if(!user){
        return response.status(401).json({status:"error",message:"user not found with this email account !"});
    }
    const resetToken:any = await resetPasswordTokenModel.findOne({user:user._id});
    console.log(resetToken);
 if(resetToken){
    console.log("inside portal")
    // const verifyToken = await bcrypt.compare(token.toStrin().trim(),resetToken.token.toString().trim());
    // console.log(verifyToken.toString(),"<<<-----");
    request.user = user;
    if(token === resetToken.token){
        next();
    }else{
        return response.status(401).json({status:"error",message:"token not matched try again with a correct token!"});
    }
 }else{
    return response.status(401).json({status:"error",message:"token not found in the database!"});
 }
  } catch (error) {
 return response.status(500).json({status:"error",message:error});   
  }

}