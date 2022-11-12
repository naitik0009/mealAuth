import { mailConfig } from "./config";
const format = {
    from :"talkingNinjs@gmail.com",
    to:"any@gmail.com",
    subject:"verify your email account",
    html:`<h1>OTP</h1>`
};

export const sendOtp =(email:any,otp:any)=>{
    const send = mailConfig().sendMail({...format,to:email,html:`<h1 style="text-align:center">Hey welcome to talking ninja</h1>
    <div style="text-align:center">Use this otp to verify your account</div>
    <div style="text-align:center">
        <p>your otp is ${otp} </p>
    </div>`});
}

export const emailVerified = (email:any)=>{
    const send = mailConfig().sendMail({...format,to:email,subject:"Welcome to Talking Nija",html:`<h1 style="text-align:center">Hey welcome to talking ninja</h1>
    <div style="text-align:center">Your account is verified</div>
    <div style="text-align:center">
        <p>Have a wonderfull time with talking ninja</p>
    </div>`})
}