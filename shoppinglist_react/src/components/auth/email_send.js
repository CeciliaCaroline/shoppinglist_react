import React, {Component} from 'react';
import axios from 'axios';
import NotificationSystem from 'react-notification-system';


class SendEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            reset: true,
            notificationSystem: null
        };
    }

    handleReset = (e) => {
        e.preventDefault();
        axios.post(`${this.baseURL}/auth/reset_password`,
            {
                email: this.state.email,
            }, this.contentHeader())

            .then((response) => {
                if (response.status === 200) {
                    this.state.notificationSystem.addNotification({
                        message: 'Email to reset password has been sent',
                        level: 'success',
                        position: 'tc'
                    });

                    this.setState({email: ''});
                }
            })
            .catch( (error) => {
                if (error.response.message) {
                    this.state.notificationSystem.addNotification({
                        message: error.response.data.message,
                        level: 'error',
                        position: 'tc'
                    });
                }
            });
    };

    onChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    };

    render() {

        return (

            <div className="container items">
                <NotificationSystem ref="notificationSystem"/>
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
                            onChange={this.onChange}
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