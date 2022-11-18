import { Button, TextField,Box } from "@mui/material";
import React from "react";

export const ResetPasswordScreen = ()=>{
    const url = "http://192.168.1.70/api/v1/user/forgot-password";
    const container = {
      
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    
    };
    const forgotPassword= async (event)=>{
      event.preventDefault();
      // const login = await axios.post(url,{
      //   email
      // });
      const data = new FormData(event.currentTarget);
      console.log(data.get("password"));
    };

    return (
        
            <Box sx={container} component="form" onSubmit={forgotPassword} noValidate>
            <TextField name="password" required autoFocus label="new password"/>
            <Button type="submit">send link</Button>
            </Box>
        
    );
}