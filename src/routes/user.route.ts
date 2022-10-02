import express,{Router} from "express";
import { logIn,register } from "../controller/user.sign";
import { authenticatedUser } from "../middlewares/auth.user.middleware";

export const route:Router = express.Router();

route.post("/user/register",register);
route.post("/user/logIn",logIn);
route.get("/user",authenticatedUser);