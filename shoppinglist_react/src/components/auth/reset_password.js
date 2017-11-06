import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';


const head = {
    headers: {'Content-Type': 'application/json'}
};class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            new_password: '',
            confirm_password: '',
            token: '',
            reset: true,
        };
        this.handleReset = this.handleReset.bind(this)
    }

    handleReset(e) {
        e.preventDefault();
        // console.log(this.state);
        // let token = localStorage.getItem('token');
        axios.post(`http://127.0.0.1:5000/auth/reset_password/${this.props.match.params.token}`,
            {
                email: this.state.email,
                new_password: this.state.new_password,
                confirm_password: this.state.confirm_password
            }, head)
            .then((response) => {
                console.log(response);
                if (response.status === 200) {

                    this.setState({reset: false, email: '', new_password: '', confirm_password: ''});
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
            return <Redirect to="/v2/shoppinglist/"/>
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
                            name="new_password"
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
                            name="confirm_password"
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