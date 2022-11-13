import mongoose from "mongoose";

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

export const resetPasswordTokenModel = mongoose.model("reset",Token);