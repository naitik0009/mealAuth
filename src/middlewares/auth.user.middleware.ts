import { Request,Response,NextFunction } from "express";
import { verify,sign } from "jsonwebtoken";
import { tokenModel } from "../database/models/token.schema";

export const authenticatedUser = async (request:Request,response:Response,next:NextFunction)=>{
try {
    // const token =  request.header("Authorization")?.split(" ")[1]||"";
    const token:any = request.headers["authorization"];
    // console.log(token);
    const payload:any = verify(token,process.env.access||"");
    if(!payload){
        return response.status(401).json({status:"error",message:"unAuthenticated"});
    }
    next();
} catch (error) {
    return response.status(401).json({status:"error",message:"unAuthenticated"});
}
}


export const refreshToken = async (request:Request,response:Response)=>{
   try {
    const cookie = request.cookies["refresh"];
    const payload:any = verify(cookie,process.env.refresh || "");
    
    if(!payload){
        return response.status(401).json({status:"error",message:"unAuthenticated"});
    }
    //let's verify our refresh token from DB too
    const refreshTok = await tokenModel.findOne({
        userId:payload.id,
        expiredAt:{$gt:new Date()}
    });
    if(!refreshTok){
        return response.status(401).json({status:"error",message:"unAuthenticated"});
    }
    
    const accessToken = sign({id:payload.id},process.env.access||"",{expiresIn:"60s"});
     response.cookie("access",accessToken,{httpOnly:true,maxAge:24*60*60*1000})
    return response.status(200).json({status:"ok",message:"Authenticated"});
   } catch (error) {
    return response.status(401).json({status:"error",message:"unAuthenticated"});
   }

}