import React from 'react';
import { Route, Switch } from 'react-router-dom'

import Landing from './Pages/Landing'
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
        <Route exact path='/login' component={Landing} />
        <Route exact path='/' component={Home} />
        <Route exact path='/scores' component={Scores} />
        <Route component={Error} />
      </Switch>
    </>
  );
}

export default App;