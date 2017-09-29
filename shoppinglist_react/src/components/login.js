import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '', password: '', loggedIn: false
        };
        this.login = this.login.bind(this);

    }

    login(e) {
        e.preventDefault();
        console.log(this.state);
        axios.post(`http://127.0.0.1:5000/auth/login`,
            {
                email: this.state.email,
                password: this.state.password
            })
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    localStorage.setItem('token', response.data.auth_token);
                    this.setState({loggedIn: response.data.auth_token, email: '', password: ''});
                    console.log(response.data.auth_token);
                    console.log(this.state)
                }
            })
            .catch(function (error) {
                console.log(error);
            });


    }

    onChange(event) {
        const obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);

    };

    render() {
        if (this.state.loggedIn) {
            return <Redirect to="/shoppinglist"/>
        }
        return (

            <div className="container items">
                <form onSubmit={this.login} className="container items form-background card mt-5 col-6 ">
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
                        <button type="submit" className="btn btn-primary btn-block">Log In</button>

                        <p className="text-center"><Link to="/">Back to Sign Up</Link></p>
                    </div>
                </form>


            </div>

        );
    }
}


export default Login;