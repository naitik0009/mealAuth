import {sign} from "jsonwebtoken";
import { Response } from "express";

export let accessToken:any = [];
export let refreshToken:any = []; 

export const createToken = async (id:any,response:Response)=>{
    const token = sign({
        id:id,
    },process.env.access||"",{expiresIn:"30s"});
    const refresh = sign({id:id},process.env.refresh||"",{expiresIn:"1w"});
    accessToken.push(token);
    refreshToken.push(refresh)
     response.cookie("access",token,{httpOnly:true,maxAge:24*60*60*1000}) 
     response.cookie("refresh",refresh,{httpOnly:true,maxAge:7 * 24*60*60*1000}) 

}