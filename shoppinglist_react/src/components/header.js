import React, {Component} from 'react';
import { Redirect} from 'react-router-dom';
import axios from 'axios';


let vex = require('vex-js');
vex.defaultOptions.className = 'vex-theme-os';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedOut: false,
            notificationSystem: null
        };
    }

    logout() {
        axios.post(`http://127.0.0.1:5000/auth/logout`, {}, {
                headers: {Authorization: "Bearer " + localStorage.getItem('token')}
            }
        )
            .then((response) => {
                if (response.status === 200) {
                    localStorage.removeItem('token');
                    this.setState({loggedOut: true})
                }
            })

            .catch(function (error) {
                console.log(error);
            });
    }

    openModal() {
        let component = this;

        vex.dialog.defaultOptions.showCloseButton = true;
        vex.dialog.defaultOptions.escapeButtonCloses = true;
        vex.dialog.defaultOptions.overlayClosesOnClick = true;

        vex.dialog.buttons.YES.text = 'Yes';
        vex.dialog.buttons.NO.text = 'No Way!';

        vex.dialog.confirm({
            message: 'Are you sure you want to log out?',
            callback: function (value) {
                if (value === true) {
                    component.logout();
                }
            }
        });

    }

    render() {

         if (this.state.loggedOut) {
            return <Redirect to="/auth/login"/>

        }
        return (

            <nav className="navbar navbar-inverse fixed-top bg-faded navbar-toggleable-sm ">
                <div className="container">
                    <a href="/v2/shoppinglist/" className="navbar-brand m-o align-content-end mr-auto" onClick={this.pushNavigation}>
                        SHOPPING LIST
                    </a>
                    <div className="navbar-nav ">
                        <a href="/v2/shoppinglist/" className="nav-item nav-link active" onClick={this.pushNavigation}>My Lists</a >
                        <a href='#' className="nav-item nav-link" onClick={this.openModal.bind(this)}>Log Out</a>
                    </div>
                </div>
            </nav>
        )
    }
}


export default Header;