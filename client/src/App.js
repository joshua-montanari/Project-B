import React from 'react';
import { Route, Switch } from 'react-router-dom'

import Landing from './Pages/Landing'
import Home from './Pages/Home'
import Scores from './Pages/Scores'
import Error from './Pages/Error'
import './App.css';

function App() {
  return (  
    <>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/scores' component={Scores} />
        <Route component={Error} />
      </Switch>
    </>
  );
}

export default App;