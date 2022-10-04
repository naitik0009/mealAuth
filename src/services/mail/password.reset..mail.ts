import {createTransport} from "nodemailer";


export const sendMailReset = async (token:any,email:any)=>{
    const transporter = createTransport({
        host:"0.0.0.0",
        port:1025,
    },);
    const url = `http://localhost:5500/api/v1/user/reset/${token}`;
    await transporter.sendMail({
        from:"@naitikMailApi",
        to:email,
        subject:"Reset Your Password",
        html:`Click <a href=${url}>here</a> to reset your password!`

    }); 
    return true;
}