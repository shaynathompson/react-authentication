import React, { Component } from 'react';
import axios from 'axios';

export default class LoginComponent extends Component {

    constructor(props) {
        super(props);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password: '',
            message: ''
        }
    }

      
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }
    onChangePassword(e) {
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
        <div style={{marginTop: 50}}>
                <h3>Login</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email:  </label>
                        <input type="email" value={this.state.email} className="form-control" onChange={this.onChangeEmail}/>
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password" value={this.state.password} className="form-control" onChange={this.onChangePassword}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="login" className="btn btn-primary"/>
                    </div>
                </form>
               <p>  {this.state.message} </p>
            </div>
        )
    }
}