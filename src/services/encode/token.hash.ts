import crypto from "crypto";

export const randomToken = ()=>{
    return new Promise((resolve,reject)=>{
        crypto.randomBytes(30,(error,buffer)=>{
            if(error){
                reject(error);
            }else{
                const token = buffer.toString("hex");
                resolve(token);
            }
        })
    });
}