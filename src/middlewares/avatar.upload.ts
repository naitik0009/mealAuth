import { Request } from "express";
import multer from "multer";

const storage = multer.diskStorage({});

const fileFilter = (request:Request,file:any,callback:any)=>{
    if(file.mimetype.startsWith("image")){
        callback(null,true);
    }else{
        callback("error invalid image file",false);
    }
}
export const uploads = multer({storage,fileFilter});