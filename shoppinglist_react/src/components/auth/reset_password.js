import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import NotificationSystem from 'react-notification-system';


class ResetPassword extends Component {
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
        e.preventDefault();
        axios.post(`${this.baseURL}/auth/reset_password/${this.props.match.params.token}`,
            {
                email: this.state.email,
                new_password: this.state.new_password,
                confirm_password: this.state.confirm_password
            }, this.contentHeader())
            .then((response) => {
                if (response.status === 200) {
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
            .catch( (error) => {
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