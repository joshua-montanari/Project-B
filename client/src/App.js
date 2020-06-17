import React from 'react';
import { Route, Switch } from 'react-router-dom'

import Login from './Pages/auth/Login'
import Register from './Pages/auth/Register'
import Home from './Pages/Home'
import Scores from './Pages/Scores'
import Error from './Pages/Error'
import Navbar from './Components/Navbar/Navbar'
import './App.css';

function App() {
  return (  
    <>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/scores' component={Scores} />
        <Route component={Error} />
      </Switch>
    </>
  );
}

export default App;