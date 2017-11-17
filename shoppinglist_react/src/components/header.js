import React, {Component} from 'react';
import {NavLink, Link, Redirect} from 'react-router-dom';
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
                    <NavLink to="/v2/shoppinglist/" className="navbar-brand m-o align-content-end mr-auto">
                        SHOPPING LIST
                    </NavLink>
                    <div className="navbar-nav ">
                        <NavLink to="/v2/shoppinglist/" className="nav-item nav-link ">My Lists</NavLink>
                        <Link to='#' className="nav-item nav-link" onClick={this.openModal.bind(this)}>Log Out</Link>
                    </div>
                </div>
            </nav>
        )
    }
}


export default Header;