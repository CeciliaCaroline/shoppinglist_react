import React from 'react';
import PropTypes from 'prop-types';

const Header = (props) => (
    <nav className="navbar navbar-inverse fixed-top bg-faded navbar-toggleable-sm ">
        <div className="container">
            <a href="/" className="navbar-brand m-o align-content-end mr-auto">
                SHOPPING LIST
            </a>
            <div className="navbar-nav ">
                <a className="nav-item nav-link active" href="/">{props.name}</a>
                <a className="nav-item nav-link " href="/">My Lists</a>
                <a className="nav-item nav-link" href="/">Log Out</a>
            </div>
        </div>
    </nav>
);

Header.propTypes = {
    name: PropTypes.string.isRequired
};
export default Header;