import React, { Component } from 'react';
import axios from 'axios';
import {Link } from 'react-router-dom';

export default class HomeComponent extends Component {

    constructor(props) {
        super(props);
        this.emailChange = this.emailChange.bind(this);
        this.tokenChange = this.tokenChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            token: '',
            message: ''
        }
    }
    emailChange(e) {
        this.setState({
            email: e.target.value
        });
    }
    tokenChange(e) {
        this.setState({
            token: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            token: this.state.token
        }
        axios.post('http://localhost:4200/user/verifyEmail', user)
        .then(response => {
            this.setState({
                email: '',
                token: '',
                message: response.data
            })
    })

    }


    render() {
        return(
        <div style={{margin: 50}}>
                <h3>Verify Email</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email:  </label>
                        <input type="text" value={this.state.email} className="form-control col-md-4 col-sm-4" onChange={this.emailChange}/>
                    </div>
                    <div className="form-group">
                        <label>Token: </label>
                        <input type="password" value={this.state.token} className="form-control col-md-4 col-sm-4" onChange={this.tokenChange}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="VERIFY" className="btn btn-primary"/>
                    </div>
                </form>
                <p>{this.state.message} </p>

                <p> Account Verified? <Link to={'/login'}>Login Here</Link> </p>
            </div>
        )
    }
}