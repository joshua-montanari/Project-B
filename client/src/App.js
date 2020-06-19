import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom'

import Login from './Pages/auth/Login'
import Register from './Pages/auth/Register'
import Home from './Pages/Home'
import Scores from './Pages/Scores'
import Error from './Pages/Error'
import Navbar from './Components/Navbar/Navbar'
import Axios from 'axios'

import UserContext from './context/UserContext'
import './App.css';

function App() {

  //sets current jwt and active user data in state, and then passes it to the whole applicaiton
  const [userData, setUserdata] = useState({
    token: undefined,
    user: undefined
  })

  useEffect( () => {
    const checkLogin = async () => {
      let token = localStorage.getItem('auth-token') //sees if there is an active jwt in local storage, returns undf or null if no jwt
      if(token === null) { //on startup, local storage variables are not created, which causes a server error if we check for a jwt under that variable. This checks to see if the local storage variable exsists, and then fills it
        localStorage.setItem('auth-token', '')
        token = ''
      }
      const tokenRes = await Axios.post('http://localhost:5000/users/tokenIsValid', null, {headers: {'x-auth-token': token}}) //runns the tokenIsValid backend route, to check if the token from local storage is valid
      if (tokenRes.data){
        const userRes = await Axios.get('http://localhost:5000/users/', {headers: {'x-auth-token': token}, })
        setUserdata({ //sets the user state to the logged in user from local storage
          token,
          user: userRes.data
        })
      }
    }

    checkLogin()
  }, [])

  return (  
    <>
    {/* because of the context provider, register and login pages have access to the userData and setUserData funcitons  */}
      <UserContext.Provider value={ {userData, setUserdata} }> 
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/scores' component={Scores} />
          <Route component={Error} />
        </Switch>
      </UserContext.Provider> 
    </>
  );
}

export default App;