import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            newpassword: '',
            confirmpassword: '',
            reset: true,
        }
        this.handleReset = this.handleReset.bind(this)
    }

    handleReset(e) {
        e.preventDefault();
        // console.log(this.state);
        axios.post(`http://127.0.0.1:5000/auth/reset-password`,
            {
                email: this.state.email,
                newpassword: this.state.newpassword,
                confirmpassword: this.state.confirmpassword
            })
            .then((response) => {
                console.log(response);
                if (response.status === 200) {

                    this.setState({reset: false, email: '', newpassword: '', confirmpassword: ''});

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
        if (!this.state.reset) {
            return <Redirect to="/auth/login" />
        }
        return (

            <div className="container items">
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
                            onChange={this.onChange.bind(this)}


                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">New Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="newpassword"
                            required
                            ref='newpassword'
                            value={this.state.password}
                            onChange={this.onChange.bind(this)}

                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="confirmpassword"
                            required
                            ref='confirmpassword'
                            value={this.state.password}
                            onChange={this.onChange.bind(this)}

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