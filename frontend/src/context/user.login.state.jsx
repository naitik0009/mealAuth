import React,{createContext,useState,useEffect} from "react";

export const UserContext = createContext();

export const UserProvider = ({children})=>{
    const [regInput,setRegInput] = useState({name:"",email:"",password:""});
    const [logInput,setLogInput] = useState({email:"",password:"",status:true}); 

    useEffect(()=>{
        console.log("triggering logInput",logInput.email);
    },[logInput])
    return (<UserContext.Provider value={{setRegInput:setRegInput,regInput:regInput,logInput:logInput,setLogInput:setLogInput}}>{children}</UserContext.Provider>)
};