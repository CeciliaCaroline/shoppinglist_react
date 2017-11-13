import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import NotificationSystem from 'react-notification-system';

let head = {
    headers: {"Content-Type": "application/json"}
};

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            username: '',
            registered: false,
            notificationSystem: null,
            isLoading: false
        };
        this.register = this.register.bind(this);

    }


    componentDidMount() {
        this.setState({notificationSystem: this.refs.notificationSystem});
    }


    register(e) {
        e.preventDefault();
        axios.post(`http://127.0.0.1:5000/auth/register`,
            {
                email: this.state.email,
                password: this.state.password,
                username: this.state.username
            }, head)
            .then((response) => {
                console.log('response', response);
                console.log('response status', response.status);
                if (response.status === 201) {
                    localStorage.setItem('token', response.data.auth_token);
                    this.state.notificationSystem.addNotification({
                        message: 'You have successfully registered',
                        level: 'success',
                        position: 'tc'
                    });

                    this.setState({
                        email: '',
                        password: '',
                        username: '',
                    });

                    setTimeout(() => {
                        this.setState({registered: true});
                    }, 500);

                }

            })
            .catch((error) => {
                if (error.response.status === 403) {
                    this.state.notificationSystem.addNotification({
                        message: 'User already exists, Please sign In',
                        level: 'error',
                        position: 'tc'
                    });
                    // return ;
                }

                if (error.response.status === 400) {
                    this.state.notificationSystem.addNotification({
                        message: 'Missing or wrong email format or password is less than four characters',
                        level: 'error',
                        position: 'tc'
                    });
                }
                console.log(error);
            });

    };


    onChange(event) {
        const obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);

    };


    render() {
        if (this.state.registered) {
            return <Redirect to="/auth/login"/>
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
                                onChange={this.onChange.bind(this)}

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
                                onChange={this.onChange.bind(this)}
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
                                onChange={this.onChange.bind(this)}

                            />
                        </div>

                        <div>
                            <button type="submit" className="btn btn-primary btn-block"
                                    onClick={this.register}>
                                Sign up
                            </button>

                            <p className="text-center">Already have an account??<Link to="/auth/login">Login</Link></p>
                        </div>
                    </form>
                </div>
            </div>


        );
    }
}


export default Register;