import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';


import HomeComponent from './components/HomeComponent';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';


class App extends Component {
  render() {
    return (
      <Router>
          <div>
            <h2>Welcome to Node-React Authentication</h2>
            <ul>
            <li><Link to={'/'}>Home</Link></li>
              <li><Link to={'/login'}>Login</Link></li>
              <li><Link to={'/register'}>Register</Link></li>
      <li><Link to={'/verifyEmail'}>Verify Email</Link></li>
            </ul>
            <hr />
            <Switch>
                <Route exact path='/index' component={HomeComponent} />
                <Route path='/login' component={LoginComponent} />
                <Route path='/register' component={RegisterComponent} />
      <Route path='/register' component={RegisterComponent} />
            </Switch>
          </div>
        </Router>
      );
  }
}

export default App;
