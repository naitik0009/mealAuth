import mongoose,{Number} from "mongoose";

const token = new mongoose.Schema({
    userId:{type:Number,require:true},
    token:{type:String,require:true},
    createdAt:Date,
    expiredAt:Date,
});

export const  tokenModel = mongoose.model("token",token);