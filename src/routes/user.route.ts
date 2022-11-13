import express,{Router} from "express";
import { logIn,register } from "../controller/user.sign";
import { uploads } from "../middlewares/avatar.upload";
import { refreshToken } from "../middlewares/auth.user.middleware";
import { logOut } from "../controller/user.sign";
import { forgotPassword } from "../controller/user.sign";
import { resetPassword } from "../controller/user.sign";
import {userProfile} from "../controller/user.profile";
import { authenticatedUser } from "../middlewares/auth.user.middleware";
import { avatarUpload } from "../controller/user.avatar";
import { verifyUser } from "../controller/user.verify";
import { verifyPasswordResetToken } from "../middlewares/validResetPasswordToken";
export const route:Router = express.Router();


route.post("/user/register",register);
route.post("/user/logIn",logIn);
route.get("/user/profile",authenticatedUser,userProfile);
route.post("/user/upload-avatar",authenticatedUser,uploads.single("profile"),avatarUpload);
route.post("/user/verify-email",verifyUser);
route.get("/user",authenticatedUser);
route.post("/user/refresh",refreshToken);
route.post("/user/logout",logOut);
route.post("/user/forgot-password",forgotPassword);
// route.get("/user/reset/:id",resetPassword)
route.post("/user/reset-password/",verifyPasswordResetToken,resetPassword);