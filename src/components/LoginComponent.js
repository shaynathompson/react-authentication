import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import axios from 'axios';

export default class LoginComponent extends Component {

    constructor(props) {
        super(props);
        this.emailChange = this.emailChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password: '',
            message: ''
        }
    }

      
    emailChange(e) {
        this.setState({
            email: e.target.value
        });
    }
    passwordChange(e) {
        this.setState({
            password: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post('http://localhost:4200/user/login', user)
        .then(response => {
        this.setState({
            email: '',
            password: '',
            message: response.data
        })
    })
    }



    render() {
        return(
        <div style={{margin: 50}}>
                <h3>Login</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email:  </label>
                        <input type="email" value={this.state.email} className="form-control col-md-4 col-sm-4" onChange={this.emailChange}/>
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password" value={this.state.password} className="form-control col-md-4 col-sm-4" onChange={this.passwordChange}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="LOGIN" className="btn btn-primary"/>
                    </div>
                </form>
               <p>  {this.state.message} </p>

               <p> Don't have an account? <Link to={'/register'}>Register Here</Link> </p>
            </div>
        )
    }
}
