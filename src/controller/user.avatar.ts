import { Request,Response } from "express";
import { userModel } from "../database/models/user.schema";
import { verify,decode } from "jsonwebtoken";
import sharp from "sharp";
import { uploadImage } from "../services/servers/cloudinary.config";



export const avatarUpload = async(request:Request,response:Response)=>{
    try {
        const token:any = await request.headers.authorization;
        const verif:any = await verify(token ,process.env.access||"");
        if(verif){
            const id:any = await decode(token);
            console.log(id);
            // const profileBuffer = await request.file?.buffer;
            const file = request.file?.path;
            console.log(file);
            const avatar = await uploadImage(id.id,file);
            // console.log(avatar);
            // const imageInfo:any = await sharp(profileBuffer).metadata();
                if(avatar){
                    const findUser = await userModel.findById(id.id);
                    if(!findUser){
                        return response.status(401).json({status:"error",message:"no user found please login again"});    
                    }
                const userData = await userModel.findByIdAndUpdate(id.id,{avatar})
                if(userData){
                    return response.status(201).json({status:"ok",message:"avatar updated"});
                }else{
                    return response.status(409).json({status:"error",message:"can't upload your avatar please choose a image file "});
                }
                }
            }
    } catch (error:any) {
        return response.status(500).json({status:"error",message:error.message})
    }
}

