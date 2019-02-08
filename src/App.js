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
            <Switch>
                <Route exact path='/index' component={LoginComponent} />
                <Route exact path='/' component={LoginComponent} />
                <Route exact path='/verifyEmail' component={HomeComponent} />
                <Route path='/login' component={LoginComponent} />
                <Route path='/register' component={RegisterComponent} />
                <Route exact path='/verifyEmail' component={HomeComponent} />
            </Switch>
          </div>
        </Router>
      );
  }
}

export default App;
