import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '', password: ''
        };
        this.login = this.login.bind(this);

    }

    login(e) {
        e.preventDefault();
        console.log(this.state);
        this.setState({
            email: '', password: ''
        })

    }

    onChange(event) {
        const obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);

    };

    render() {
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