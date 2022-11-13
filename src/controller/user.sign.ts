import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import { userModel } from "../database/models/user.schema";
import { sendMailReset, sendMailResetConfirm } from "../services/mail/password.reset..mail";
import { tokenModel } from "../database/models/token.schema";
import { sign } from "jsonwebtoken";
import { generateOtp } from "../services/mail/otp";
import { randomToken } from "../services/encode/token.hash";
import { sendOtp } from "../services/mail/otp.verification";
import { resetPasswordTokenModel } from "../database/models/reset.pasword.token";


//let's login the user

export const logIn = async (request: Request, response: Response) => {

    try {
        const { email, password } = await request.body;
        const originalPass = await userModel.findOne({ email: email });
        const compare = await bcryptjs.compare(password, originalPass?.password!);

        if (!email || !password) {
            return response.status(400).json({ status: "error", message: "sign up data not found" });
        }
        if (!compare || !originalPass) {
            return response.status(400).json({ status: "error", message: "sign up data not matched" });
        } else {
            //let's create jwt!!!
            const token = sign({
                id: originalPass.id,
            }, process.env.access || "", { expiresIn: "3000s" });
            return response.status(200).json({ status: "ok", message: { token } });
        }

    } catch (error) {
        return response.status(500).json({ status: "error", message: "Please check your entry" });
    }
};

//let's register the user

export const register = async (request: Request, response: Response) => {
    try {
        const otp = generateOtp();
        const { name, email, password } = await request.body;
        if (!name || !email || !password) {
            return response.status(401).json({ status: "error", message: "sign up data not found" });
        }
        const hashedOtp =   bcryptjs.hashSync(otp,8);
        const hash = await bcryptjs.hash(password, 12);

        const user = new userModel({ name, email, password: hash });
        const finalOtp = new tokenModel({
                user: user._id,
                token: hashedOtp,
            });
            const saveOtp = await finalOtp.save();

            if(saveOtp){
                sendOtp(user.email,otp);
                const reg = await user.save();
                if (reg) { return response.status(200).json({ status: "ok", message: reg }); }
                else {
                    return response.status(401).json({ status: "error", message: "cannot register" });
                }
                
            }
            else{
                return response.status(401).json({ status: "error", message: "cannot save otp to the database" });
        }


    } catch (error) {
        return response.status(500).json({ status: "error", message: error });
    }

};

//let's sent the forgot password email to the client

export const forgotPassword = async (request: Request, response: Response) => {
    try {
        const { email } = await request.body;
        const user = await userModel.findOne({emial:email});
        const token = await resetPasswordTokenModel.findOne({user:user?._id});
        if (token) {
            return response.status(400).json({ status: "error", message: "token already exist wait for 1 hours to generate a new token" });
        }
        const createRandomToken = await randomToken();
        console.log(createRandomToken);
        const createToken = await resetPasswordTokenModel.create({token:createRandomToken,user:user?._id});
        const sendMail = await sendMailReset(createRandomToken, email);
        if (!sendMail) {
            return response.status(400).json({ status: "error",message:"cannot create token please try again" });
        } 
            if(createToken){
                return response.status(200).json({status:"ok",message:"mail sent successfully check your email"});
            }else{
                return response.status(400).json({ status: "error",message:"cannot send mail & can't create token please try again" });
        }

    } catch (error) {
        return response.status(500).json({ status: "error",message:error });
    }
};

//let's reset the password
export const resetPassword = async (request: Request, response: Response) => {
    try {
        const { password } = await request.body;

        if(!password){
            return response.status(400).json({status:"error",message:"please provide a new password !"});
        }
        if(password.length <8 || password.length>20){
            return response.status(400).json({status:"error",message:"please provide a password greater than 8 and less than 20 character!"});
        }
    const userId:any = await request.user._id;
    const user:any = await userModel.findById(userId);
    const comparePassword = await bcryptjs.compare(password,user?.password);
    if(comparePassword){
        return response.status(400).json({status:"error",message:"please use a password diffrent from the previous one !"});
    }else{
        
        const hashPassword = await bcryptjs.hash(password,8);
        const updatePasword = await userModel.findByIdAndUpdate(userId,{password:hashPassword});
        if(updatePasword){
          const deleteToken = await resetPasswordTokenModel.findOneAndDelete({user:userId});
         
          if(deleteToken){
            const sendMail= await sendMailResetConfirm(user.email);
            if(sendMail){
                return response.status(200).json({status:"ok",message:"congratulation your password has been reset!!"});
            }else{
                return response.status(400).json({status:"error",message:"sorry unable to reset your password token deletion error please try again !"});
            }
          }
        }else{
            return response.status(400).json({status:"error",message:"sorry unable to reset your password please try again !"});
        }
    }
    } catch (error) {
        return response.status(500).json({status:"error",message:"randi ko baan"});   
    }

};

export const logOut = async (request: Request, response: Response) => {
    const delTokFromDb = await tokenModel.deleteOne({ token: request.cookies["refresh"] });
    response.cookie("refresh", "", { maxAge: 0 });
    return response.status(200).json({ status: "ok", message: "user logged out" })
};
// export const changePassword =s