import {sign} from "jsonwebtoken";
import { Response } from "express";
import { tokenModel } from "../../database/models/token.schema";
export let accessToken:any = [];
export let refreshToken:any = []; 

export const createToken = async (id:any,response:Response)=>{
    const token = sign({
        id:id,
    },process.env.access||"",{expiresIn:"60s"});
    const refresh = sign({id:id},process.env.refresh||"",{expiresIn:"1w"});
    accessToken.push(token);
    refreshToken.push(refresh)
     
     response.cookie("refresh",refresh,{httpOnly:true,maxAge:7 * 24*60*60*1000}) ;
     const expiredAt = new Date();
     expiredAt.setDate(expiredAt.getDate()+7);
     const dbToken = await tokenModel.create({userId:id,token:refresh,expiredAt:expiredAt});
     if(!dbToken){
        return false;
     } return true;

}