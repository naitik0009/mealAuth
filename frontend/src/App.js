
import { Navigate, Route, Routes } from 'react-router';
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
      <Routes>

        {data.logInput.status ? <Route path='/' element={<HomeScreen />} /> : <Route path='login' element={<SignIn />} />}

        {data.logInput.status ? <Route path='/' element={<Navigate to={"/"} />} /> : <Route path='/login' element={<Navigate to={"/login"} />} />}

        {data.logInput.status ? <Route path='/' element={<HomeScreen />} /> : <Route path='register' element={<SignUp />} />}

      </Routes>
    </>
  );
}

export default App;
