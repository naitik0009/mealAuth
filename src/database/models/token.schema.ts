import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { isModifier } from "typescript";
import { NextFunction } from "express";

const Token = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        require: true,
        ref: "User",
    },
    token: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        expires: 3600,
        default: Date.now(),

    },
});

//let's hash this token before this is saved inside our database::::::::
// Token.pre('save', async (next) => {
    
//         const hash = await bcrypt.hash(this.token, 8);
//         this.token = hash;
    
//     next();
// });

// Token.methods.compareToken = async (token: any) => {
//     let docuemnt: any = this;
//     const finalResult = await bcrypt.compare(token, docuemnt.token);
//     if (finalResult) {
//         return finalResult
//     } else {
//         throw new Error("Token not matched try again with another token");

//     }
// };

export const tokenModel = mongoose.model("token", Token);