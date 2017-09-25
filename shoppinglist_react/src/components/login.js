import React, {Component} from 'react';

class Login extends Component {
    render() {
        return (

            <div className="container auth mt-5">
                <form  className="container form-background card mt-5 col-6 ">
                    <h2 className="text-center">Log In</h2>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            required
                            ref='email'

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