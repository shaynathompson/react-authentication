import React, { Component } from 'react';
import axios from 'axios';

export default class HomeComponent extends Component {

    constructor(props) {
        super(props);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeToken = this.onChangeToken.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            token: '',
            message: ''
        }
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }
    onChangeToken(e) {
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
        <div style={{marginTop: 50}}>
                <h3>Verify Email</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email:  </label>
                        <input type="text" value={this.state.email} className="form-control" onChange={this.onChangeEmail}/>
                    </div>
                    <div className="form-group">
                        <label>Token: </label>
                        <input type="password" value={this.state.token} className="form-control" onChange={this.onChangeToken}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="verify" className="btn btn-primary"/>
                    </div>
                </form>
                <p>{this.state.message} </p>
            </div>
        )
    }
}