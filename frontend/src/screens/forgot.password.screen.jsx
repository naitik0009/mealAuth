import { Button, TextField } from "@mui/material";
import React from "react";

export const ForgotPasswordScreen = ()=>{
    return (
        <div>
            <TextField name="email" label="email"/>
            <Button>send link</Button>
        </div>
    );
}