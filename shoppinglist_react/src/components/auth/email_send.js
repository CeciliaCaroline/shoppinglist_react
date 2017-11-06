import React, {Component} from 'react';
import axios from 'axios';

let head = {
    headers: {"Content-Type": "application/json"}
};

class SendEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            reset: true,
        };
        this.handleReset = this.handleReset.bind(this)
    }

    handleReset(e) {
        e.preventDefault();
        // console.log(this.state);
        axios.post(`http://127.0.0.1:5000/auth/reset_password`,
            {
                email: this.state.email,

            }, head)
            .then((response) => {
                console.log(response);
                if (response.status === 200) {

                    this.setState({email: ''});

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
                    <div>
                        <button type="submit" className="btn btn-primary btn-block">Reset Password</button>

                    </div>
                </form>
            </div>

        );
    }
}

export default SendEmail;