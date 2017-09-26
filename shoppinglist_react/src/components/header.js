import React from 'react';
// import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

const Header = (props) => (
    <nav className="navbar navbar-inverse fixed-top bg-faded navbar-toggleable-sm ">
        <div className="container">
            <NavLink  to="/" className="navbar-brand m-o align-content-end mr-auto">
                SHOPPING LIST
            </NavLink >
            <div className="navbar-nav ">
                <NavLink to="/home/:name"  className="nav-item nav-link" >Caroline</NavLink >
                <NavLink to="/shoppinglist" className="nav-item nav-link " >My Lists</NavLink >
                <NavLink to="/login" className="nav-item nav-link" >Log Out</NavLink >
            </div>
        </div>
    </nav>
);

// Header.propTypes = {
//     name: PropTypes.string.isRequired
// };
export default Header;