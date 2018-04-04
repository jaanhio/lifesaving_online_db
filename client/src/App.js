import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './helpers/history';


/*---Component imports---*/
import PrivateRoute from './components/PrivateRoute';
/*---Component imports---*/


/*---Page imports---*/
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

/*---Page imports---*/

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={LoginPage} /> 
          <Route path='/login' component={LoginPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
