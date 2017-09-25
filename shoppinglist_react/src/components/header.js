import React from 'react';

const Header = () => (
    <nav className="navbar navbar-inverse fixed-top bg-faded navbar-toggleable-sm ">
        <div className="container">
            <a href="/" className="navbar-brand m-o align-content-end mr-auto">
                SHOPPING LIST
            </a>
            <div className="navbar-nav ">
                <a className="nav-item nav-link active" href="/">Cecilia</a>
                <a className="nav-item nav-link " href="/">My Lists</a>
                <a className="nav-item nav-link" href="/">Log Out</a>
            </div>
        </div>
    </nav>
);

export default Header;