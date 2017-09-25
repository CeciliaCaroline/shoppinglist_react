import React, {Component} from 'react';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '', username: '', password: ''
        };
        this.register = this.register.bind(this);

    }


    register(e) {
        e.preventDefault();
        console.log(this.state);
        this.refs.username.value = null;
        this.refs.email.value = null;
        this.refs.password.value = null;

    }

    render() {
        return (

            <div className="container mt-5">
                <div className="row">
                    <div className="container form-background card mx-5 mt-5 col media card-inverse ">
                        <h2 className="mt-5 text-capitalize"> Shopping list</h2>
                        <h6 className="text-capitalize">The Best Way To Record and Share your shopping lists</h6>

                        <p className="lead">This is an application that enables users to record, track and share things they
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
                                    id="username"
                                    required
                                    ref='username'
                                    onChange={event => (this.setState({username: event.target.value}))}

                                />
                            </div>
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
                                <button type="submit" className="btn btn-primary btn-block">Sign up</button>

                                <p className="text-center">Already have an account?</p>
                            </div>
                        </form>
                    </div>
                </div>


                );
                }
                }


                export default Register;