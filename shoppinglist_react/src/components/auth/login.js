import React from 'react';
import axios from 'axios';
import NotificationSystem from 'react-notification-system';
import BaseComponent from '../base';


class Login extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loggedIn: false,
            notificationSystem: null
        };
    }


    login = (e) => {
        e.preventDefault();
        axios.post(`${this.baseURL}/auth/login`,
            {
                email: this.state.email,
                password: this.state.password
            }, this.contentHeader())
            .then((response) => {
                if (response.status === 200) {
                    localStorage.setItem('token', response.data.auth_token);
                    this.state.notificationSystem.addNotification({
                        message: response.data.message,
                        level: 'success',
                        position: 'tc'
                    });
                    setTimeout(() => {
                        this.setState({
                            email: '',
                            password: '',
                            loggedIn: true
                        });
                    }, 1000);

                }
            })
            .catch((error) => {
                if (error.response.status === 403) {
                    this.state.notificationSystem.addNotification({
                        message: error.response.data.message,
                        level: 'error',
                        position: 'tc'
                    });
                }

                if (error.response.status === 400) {
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
        if (this.state.loggedIn) {
            this.props.history.push("/v2/shoppinglist/");
        }

        return (

            <div className="container items">
                <form onSubmit={this.login} className="container items form-background card mt-5 col-6 ">
                    <NotificationSystem ref="notificationSystem"/>
                    <h2 className="text-center">Log In</h2>

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

                    <div className='text-center'>
                        <button type="submit" className="btn btn-primary btn-block">Log In</button>
                        <small className="text-center">Forgot Password? You can reset it <a href="/auth/reset_password"
                                                                                            onClick={this.pushNavigation}>
                            here</a>
                        </small>
                        <div className='text-center'>
                            <small className="text-center justify content-end"><a href="/auth/register"
                                                                                  onClick={this.pushNavigation}> Sign
                                Up</a></small>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;