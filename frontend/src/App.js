
import {Redirect, Route, Switch} from 'react-router';
import React, { useContext } from 'react';
import './App.css';
import ButtonAppBar from './components/appbar.component';
import { HomeScreen } from './screens/home.screen';
import SignIn from './screens/login.screen';
import SignUp from './screens/register.screen';
import { UserContext } from './context/user.login.state';
import { ForgotPasswordScreen } from './screens/forgot.password.screen';
import { ResetPasswordScreen } from './screens/resetpassword.screen';

function App() {
  const data = useContext(UserContext);
  const container = {
    alignItems:"center",
    justifyContent:"center",
  }
  return (
    <>
      <ButtonAppBar />
      <Switch>
     
        <Route exact  path='/'>{data.logInput.status?<HomeScreen/>:<Redirect push to={{
              pathname: "/login",
              
            }}/>}</Route>
      <Route path='/login'>{!data.logInput.status?<SignIn/>:<Redirect push to={{pathname:"/"}}/>}</Route>   
            <Route path="/forgot-password" component={ForgotPasswordScreen}/>
            <Route path="/reset-password" component={ResetPasswordScreen}/>
            <Route path="/register">{!data.logInput.status?<SignUp/>:<Redirect push to={{pathname:"/"}}/>}</Route>


      </Switch>
    </>
  );
}

export default App;
