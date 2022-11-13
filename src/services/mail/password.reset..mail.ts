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

export const sendMailResetConfirm = async(email:any)=>{
    try {        
     const mail = await mailConfig().sendMail({
            from:"talkingNinjs@gmail.com",
            to:email,
            subject:"Password Reset Done !",
            html:`<h1>Congratulation Your Password has been reset!</h1>`
    
        }); 
        return mail;
    } catch (error:any) {
       return new Error(error);
        
    }   
}