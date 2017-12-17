import React from 'react';
import axios from 'axios';
import BaseComponent from './base';
import {Redirect} from 'react-router-dom';


let vex = require('vex-js');
vex.defaultOptions.className = 'vex-theme-os';


class Header extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            loggedOut: false,
            notificationSystem: null
        };
    }

    //event handler for logging out
    logout = () => {
        axios.post(`${this.baseURL}/auth/logout`, {}, this.authHeader()
        )
            .then((response) => {
                if (response.status === 200) {
                    localStorage.removeItem('token');
                    this.setState({loggedOut: true})
                }
            })

            .catch((error) => {
                if (error.response.data.message) {
                    this.state.notificationSystem.addNotification({
                        message: error.response.data.message,
                        level: 'error',
                        position: 'tc'
                    })
                }
            });
    };

    //modal to confirm log out
    logoutModal = () => {

        vex.dialog.defaultOptions.showCloseButton = true;
        vex.dialog.defaultOptions.escapeButtonCloses = true;
        vex.dialog.defaultOptions.overlayClosesOnClick = true;

        vex.dialog.buttons.YES.text = 'Yes';
        vex.dialog.buttons.NO.text = 'No Way!';

        vex.dialog.confirm({
            message: 'Are you sure you want to log out?',
            callback: (value) => {
                if (value === true) {
                    this.logout();
                }
            }
        });
    };

    render() {

        //if logged out, redirect to login page
        if (this.state.loggedOut) {
            return <Redirect to = "/auth/login"/>
        }
        return (

            <nav className="navbar navbar-inverse fixed-top bg-faded navbar-toggleable-sm ">
                <div className="container">
                    <a href="/v2/shoppinglist/" className="navbar-brand m-o align-content-end mr-auto"
                       onClick={this.props.onlink}>
                        SHOPPING LIST
                    </a>
                    <div className="navbar-nav ">
                        <a href="/v2/shoppinglist/" className="nav-item nav-link active" onClick={this.props.onlink}>My
                            Lists</a>
                        <a className="nav-item nav-link" onClick={this.logoutModal}>Log Out</a>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Header;