import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
    },
    //while using local storage for avatar use BUffer
    // avatar:{
    //     type:Buffer,
    // }
    avatar:{
        type:String,
    },
    admin:{
        type:Boolean,
        default:false,
    },
    verified:{
        type:Boolean,
        default:false,
    },
});


export const userModel = mongoose.model("User",userSchema); 