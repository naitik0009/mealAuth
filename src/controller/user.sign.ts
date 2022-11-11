import { Request,Response } from "express";
import bcryptjs from "bcryptjs";
import { userModel } from "../database/models/user.schema";
import { sendMailReset } from "../services/mail/password.reset..mail";
import { tokenModel } from "../database/models/token.schema";
import {sign} from "jsonwebtoken";
export const logIn = async (request:Request,response:Response)=>{

    try {
        const {email,password} = await  request.body;
        const originalPass = await userModel.findOne({email:email}); 
        const compare = await bcryptjs.compare(password,originalPass?.password!);

        if(!email || !password){
            return response.status(400).json({status:"error",message:"sign up data not found"});  
        } 
        if(!compare || !originalPass){
            return response.status(400).json({status:"error",message:"sign up data not matched"}); 
        }else{
            //let's create jwt!!!
            const token =  sign({
                id:originalPass.id,
            },process.env.access||"",{expiresIn:"3000s"});
            return response.status(200).json({status:"ok",message:{token}});
        }
                   
    } catch (error) {
        return response.status(500).json({status:"error",message:"Please check your entry"});
    }
};


export const register = async (request:Request,response:Response)=>{
  try {
    const {name,email,password} = await request.body;
    
    if(!name||!email||!password){
        return response.status(400).json({status:"error",message:"sign up data not found"});
    } 
    const hash = await bcryptjs.hash(password,12);
    const reg = await userModel.create({name,email,password:hash});
    if(reg){return response.status(200).json({status:"ok",message:"user created"});}
    else{
        return response.status(400).json({status:"error",message:"cannot register"});
    }
  } catch (error) {
    return response.status(500).json({status:"error",message:"cannot register"});
  }
    
};

export const logOut = async (request:Request,response:Response)=>{
    const delTokFromDb = await tokenModel.deleteOne({token:request.cookies["refresh"]}); 
    response.cookie("refresh","",{maxAge:0});
    return response.status(200).json({status:"ok",message:"user logged out"})
};

export const forgotPassword = async (request:Request,response:Response)=>{
try {
    const {email } = await request.body;
    const token = await userModel.findOne({email});
    if(!token){
        return response.status(404).json({status:"error",message:"user not found"});
    }
    sendMailReset(token._id,email);
    if(!sendMailReset){
    return response.status(400).json({status:"error"});
} else{
    return response.send("mail sent successfully");
}
 
} catch (error) {
    return response.status(400).json({status:"error"});
}
};

export const resetPassword = async (request:Request,response:Response)=>{
    const {id} = request.params;
    return response.send(id);
    
}; 

// export const changePassword =s