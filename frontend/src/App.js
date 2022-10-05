
import {Redirect, Route, Switch} from 'react-router';
import React, { useContext } from 'react';
import './App.css';
import ButtonAppBar from './components/appbar.component';
import { HomeScreen } from './screens/home.screen';
import SignIn from './screens/login.screen';
import SignUp from './screens/register.screen';
import { UserContext } from './context/user.login.state';

function App() {
  const data = useContext(UserContext);
  return (
    <>
      <ButtonAppBar />
      <Switch>
     
        <Route exact  path='/'>{data.logInput.status?<HomeScreen/>:<Redirect push to={{
              pathname: "/login",
              
            }}/>}</Route>
      <Route path='/login'>{!data.logInput.status?<SignIn/>:<Redirect push to={{pathname:"/"}}/>}</Route>   

            <Route path="/register">{!data.logInput.status?<SignUp/>:<Redirect push to={{pathname:"/"}}/>}</Route>


      </Switch>
    </>
  );
}

export default App;
