import express,{Router} from "express";
import { logIn,register } from "../controller/user.sign";
import { authenticatedUser } from "../middlewares/auth.user.middleware";
import { refreshToken } from "../middlewares/auth.user.middleware";
import { logOut } from "../controller/user.sign";
import { forgotPassword } from "../controller/user.sign";
import { resetPassword } from "../controller/user.sign";
export const route:Router = express.Router();

route.post("/user/register",register);
route.post("/user/logIn",logIn);
route.get("/user",authenticatedUser);
route.post("/user/refresh",refreshToken);
route.post("/user/logout",logOut);
route.post("/user/forgot",forgotPassword);
route.get("/user/reset/:id",resetPassword)
route.get("/user/reset",resetPassword);