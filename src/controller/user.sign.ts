import { Request,Response } from "express";
import bcryptjs from "bcryptjs";
import { userModel } from "../database/models/user.schema";
import { createToken } from "../services/jwt/sign.token";
import { accessToken,refreshToken } from "../services/jwt/sign.token";
export const logIn = async (request:Request,response:Response)=>{
  
        

    try {
        const {email,password} = await  request.body;
        const originalPass = await userModel.findOne({email:email}); 
        const compare = await bcryptjs.compare(password,originalPass?.password!);
        if(!email || !password){
            return response.status(400).json({message:"sign up data not found"});  
        } 
        
        if(!compare||!originalPass){
            return response.status(500).json({message:"sign up data not found"}); 
        }
           await createToken(originalPass._id,response).finally(()=>{return response.status(200).json({status:"ok",message:{accessToken,refreshToken}});});
                  
    } catch (error) {
        return response.status(500).json({status:"error",message:"Please check your entry"});
    }


  
    
}


export const register = async (request:Request,response:Response)=>{
    const {name,email,password} = await request.body;
    if(!name||!email||!password){
        return response.status(400).json({message:"sign up data not found"});
    } 
    const hash = await bcryptjs.hash(password,12);
    const reg = await userModel.create({name,email,password:hash});
    if(reg){return response.status(200).json({status:"ok",message:"user created"});}
    else{
        return response.status(400).json({status:"error",message:"cannot register"});
    }
    
}



