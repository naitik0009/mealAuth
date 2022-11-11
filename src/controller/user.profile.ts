import { Request,Response } from "express";
import { userModel } from "../database/models/user.schema";
import { verify,decode } from "jsonwebtoken";

export const userProfile = async(request:Request,response:Response)=>{
    try {
        const token:any =  request.headers.authorization;
        // console.log(token);
        const verif:any = verify(token ,process.env.access||"");
        
        if(verif){
            const id:any =  decode(token);
            const userData = await userModel.findById(id.id);
            if(userData){
                return response.status(200).json({status:"ok",message:userData});
            }
        }else{
            return response.status(400).json({status:"error",message:"can't very json web token try again"})    
        }
        
        
    } catch (error:any) {
        return response.status(500).json({status:"error",message:error.message})
    }
}

