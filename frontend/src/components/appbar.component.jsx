import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { UserContext } from '../context/user.login.state';
// import MenuIcon from '@mui/icons-material/Menu';
import {Link} from "react-router-dom";

export default function ButtonAppBar() {
  const data = React.useContext(UserContext) 
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
       <Link to={"/"}>     Let's CheckOut our New Auth Api </Link>
          </Typography>

          { data.logInput.status?<Button color="inherit" onClick={()=>{data.setLogInput({email:"fsd",password:"fdsf",status:true})}}><Link to={"/"}>Logout</Link></Button>:<Button color="inherit"><Link to={`/login`}>Login</Link></Button>}
          
          { data.logInput.status?"":<Button color="inherit"><Link to={`/register`}>register</Link></Button>}
          
          
         

          
        </Toolbar>
      </AppBar>
    </Box>
  );
}