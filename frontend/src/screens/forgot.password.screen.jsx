import { Button, TextField,Box } from "@mui/material";
import React from "react";
import axios from "axios";
import {ThemeProvider,createTheme} from "@mui/material/styles";
export const ForgotPasswordScreen = ()=>{
    const url = "http://192.168.1.70:5500/api/v1/user/forgot-password";
    const container ={
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    
    };
    const theme = createTheme();
    const forgotPassword= async (event)=>{
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const send = await axios.post(url,{
        email:data.get("email"),
      }).then((response)=>{alert(response.status)}).catch((error)=>{alert(error)})
      console.log(data.get("email"));
    };

    return (
        
      
      <ThemeProvider theme={theme}>
           <Box sx={container} component="form" noValidate onSubmit={forgotPassword}>
         <TextField type="email" required autoFocus name="email" label="email"/>
            <Button type="submit" style={{color:"white",backgroundColor:"blue"}}>send link</Button>
         </Box>
      </ThemeProvider>
        
    );
}

