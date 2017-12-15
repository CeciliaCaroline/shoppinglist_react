import React from 'react';
import axios from 'axios';
import NotificationSystem from 'react-notification-system';
import BaseComponent from '../base';


class Register extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            username: '',
            confirm_password: '',
            registered: false,
            notificationSystem: null,
        };
    }

    register = (e) => {
        e.preventDefault();
        axios.post(`${this.baseURL}/auth/register`,
            {
                email: this.state.email,
                password: this.state.password,
                confirm_password: this.state.confirm_password,
                username: this.state.username
            }, this.contentHeader())
            .then((response) => {
                if (response.status === 201) {
                    localStorage.setItem('token', response.data.auth_token);
                    this.state.notificationSystem.addNotification({
                        message: response.data.message,
                        level: 'success',
                        position: 'tc'
                    });

                    this.setState({
                        email: '',
                        password: '',
                        confirm_password: '',
                        username: '',
                    });

                    setTimeout(() => {
                        this.setState({registered: true});
                    }, 500);

                }
            })
            .catch((error) => {
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
        this.setState({[event.target.name] : event.target.value})

    };

    render() {
        if (this.state.registered) {
            this.props.history.push("/auth/login");
        }
        return (

            <div className="container mt-5">
                <div className="row">
                    <NotificationSystem ref="notificationSystem"/>
                    <div className="container form-background card mx-5 mt-5 col media card ">
                        <h2 className="mt-5 text-capitalize"> Shopping list</h2>
                        <h6 className="text-capitalize">The Best Way To Record and Share your shopping lists</h6>

                        <p className="lead">This is an application that enables users to record, track and share
                            things
                            they
                            want to
                            spend
                            money on in order to meet their desires.</p>
                        <h4>Create</h4>
                        <p>Create a shopping list with all the items that you want to purchase</p>
                        <h4>Update</h4>
                        <p>Change your mind? Update your list with new items</p>
                        <h4>Share</h4>
                        <p>Share your list with friends and family</p>
                    </div>


                    <form onSubmit={this.register}
                          className="container media-body form-background card mx-5 mt-5 col">
                        <h2 className="text-capitalize card-title mt-5">New to Shoppinglist. Register</h2>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                required
                                ref='username'
                                value={this.state.username}
                                onChange={this.onChange}
                            />
                        </div>
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
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                required
                                ref='password'
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
                                ref='confirm_password'
                                value={this.state.confirm_password}
                                onChange={this.onChange}
                            />
                        </div>

                        <div>
                            <button type="submit" className="btn btn-primary btn-block"
                                    onClick={this.register}>
                                Sign up
                            </button>

                            <p className="text-center">Already have an account??<a href="/auth/login"
                                                                                   onClick={this.pushNavigation}>Login</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>

        );
    }
}

export default Register;