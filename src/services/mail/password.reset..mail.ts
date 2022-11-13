import { mailConfig } from "./config";
export const sendMailReset = async (token:any,email:any)=>{
    
try {

    const url = `http://localhost:3000/reset-password/token=${token}&email=${email}`;
    
 const mail = await mailConfig().sendMail({
        from:"talkingNinjs@gmail.com",
        to:email,
        subject:"Reset Your Password",
        html:`Click here to reset your password! <br> <a href=${url}><button>Reset Password</button></a>`

    }); 
    return mail;
} catch (error:any) {
   return new Error(error);
    
}
    
}