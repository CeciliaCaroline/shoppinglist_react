import React, {Component} from 'react';

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
        this.refs.email.value = null;
        this.refs.password.value = null;

    }

    render() {
        return (

            <div className="container auth mt-5">
                <form onSubmit= {this.login} className="container form-background card mt-5 col-6 ">
                    <h2 className="text-center">Log In</h2>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            required
                            ref='email'
                            onChange={event => (this.setState({email: event.target.value}))}


                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            required
                            ref='password'
                            onChange={event => (this.setState({password: event.target.value}))}

                        />
                    </div>

                    <div>
                        <button type="submit" className="btn btn-primary btn-block">Log In</button>

                        <p className="text-center">Back to Sign up</p>
                    </div>
                </form>


            </div>

        );
    }
}


export default Login;