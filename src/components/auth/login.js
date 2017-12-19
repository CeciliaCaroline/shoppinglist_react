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

        //prevent browser refresh on submit
        e.preventDefault();
        const {email, password} = this.state;

        //pass login credentials in the payload of the post request to database
        axios.post(`${this.baseURL}/auth/login`,
            {
                email,
                password
            }, this.contentHeader())

        //promise is returned
            .then((response) => {
                if (response.status === 200) {

                    //set the token from the response in local storage
                    localStorage.setItem('token', response.data.auth_token);
                    this.state.notificationSystem.addNotification({
                        message: response.data.message,
                        level: 'success',
                        position: 'tc'
                    });

                    //setstate to registered after 1000ms
                    setTimeout(() => {
                        this.setState({
                            email: '',
                            password: '',
                            loggedIn: true
                        });
                    }, 1000);

                }
            })

            //promise is returned
            .catch((error) => {

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
        const {email, password, loggedIn} = this.state;


        //if state is loggedIn, redirect to shoppinglists page
        if (loggedIn) {
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
                            value={email}
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
                            value={password}
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