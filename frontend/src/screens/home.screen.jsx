import React,{useContext} from "react";
import { UserContext } from "../context/user.login.state";
export const HomeScreen = ()=>{
    const data = useContext(UserContext);
    return (
        <>
        <h1 style={{color:"white"}}>Welcome to my app MR.{data.logInput.email}</h1>
        <h5 style={{color:"white"}}>Please login to see your name here</h5>
        </>
    );
}