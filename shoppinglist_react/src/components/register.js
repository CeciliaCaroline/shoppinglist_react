import React, {Component} from 'react';


class Register extends Component {

    render() {
        return (

            <div className="container ">
                <div className="row">
                    <div className=" container form-background card mx-5 mt-5 col media card">
                        <h2 className="mt-5 text-capitalize"> Shopping list</h2>
                        <h6 className="text-capitalize">The Best Way To Record and Share your shopping lists</h6>

                        <p className="lead">This is an application that enables users to record, track and share things
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


                    <form
                        className="container media-body form-background card mx-5 mt-5 col">
                        <h2 className="text-center mt-5">Welcome. Register</h2>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                required
                                ref='username'

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