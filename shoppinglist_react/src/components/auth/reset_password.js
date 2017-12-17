import React from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import NotificationSystem from 'react-notification-system';
import BaseComponent from "../base";


class ResetPassword extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            new_password: '',
            confirm_password: '',
            token: '',
            reset: true,
            notificationSystem: null
        };
    }


    handleReset = (e) => {

        //prevent browser refresh on submit
        e.preventDefault();

        //pass reset password credentials payload with the post request
        axios.post(`${this.baseURL}/auth/reset_password/${this.props.match.params.token}`,
            {
                email: this.state.email,
                new_password: this.state.new_password,
                confirm_password: this.state.confirm_password
            }, this.contentHeader())

            //returns a promise
            .then((response) => {
                if (response.status === 200) {

                    //set the token from the url in local storage
                    localStorage.setItem('token', this.props.match.params.token);
                    this.state.notificationSystem.addNotification({
                        message: response.data.message,
                        level: 'success',
                        position: 'tc'
                    });
                    setTimeout(() => {
                        this.setState({
                            email: '',
                            new_password: '',
                            confirm_password: '',
                            reset: false
                        });
                    }, 500);

                }
            })

            //returns a promise
            .catch( (error) => {

                //if an error message is returned in the response, display as a notification
                if (error.response.data.message) {
                    this.state.notificationSystem.addNotification({
                        message: error.response.data.message,
                        level: 'error',
                        position: 'tc'
                    });
                }
            });
    };

    onChange = (event) => {
        this.setState({[event.target.name]: event.target.value})

    };

    render() {

        //if reset is true, redirect to shopping lists
        if (!this.state.reset) {
            return <Redirect to="/v2/shoppinglist/"/>
        }
        return (

            <div className="container items">
                <NotificationSystem ref="notificationSystem"/>
                <form onSubmit={this.handleReset} className="container items form-background card mt-5 col-6 ">
                    <h2 className="text-center">Reset Password</h2>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            required
                            ref='email'
                            value={this.state.email}
                            onChange={this.onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">New Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="new_password"
                            required
                            ref='newpassword'
                            value={this.state.password}
                            onChange={this.onChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="confirm_password"
                            required
                            ref='confirmpassword'
                            value={this.state.password}
                            onChange={this.onChange}
                        />
                    </div>

                    <div>
                        <button type="submit" className="btn btn-primary btn-block">Reset Password</button>

                    </div>
                </form>
            </div>

        );
    }
}

export default ResetPassword;