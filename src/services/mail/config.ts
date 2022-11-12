import { createTransport } from "nodemailer";

export const mailConfig = ()=>{
    
    let config = createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.MAILUSERNAME,
          pass: process.env.MAILPASSWORD,
        }
      });
      
      return config;
}