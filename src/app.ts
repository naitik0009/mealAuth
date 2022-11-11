require("dotenv").config();
import express,{Request,Response} from "express";
import cors from "cors";
import { route } from "./routes/user.route";
import { connect } from "./database/db";
import { authenticatedUser } from "./middlewares/auth.user.middleware";
import cookieParser from "cookie-parser";


const port = process.env.PORT;
const app = express();
const url = process.env.MONGOURI;
app.use(express.json());
app.use(cookieParser());
//here we are allowing all the frontends to request from our backend and also sending and receiving cookies are allowed

app.use(cors());

app.use("/api/v1",route);


app.listen(port,()=>{
    connect(url).then(()=>{console.log("Listening on port",port,"connected to db successfully")})

    });
