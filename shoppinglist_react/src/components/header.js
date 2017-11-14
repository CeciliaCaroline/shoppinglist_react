import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = (props) => (
    <nav className="navbar navbar-inverse fixed-top bg-faded navbar-toggleable-sm ">
        <div className="container">
            <NavLink  to="/home" className="navbar-brand m-o align-content-end mr-auto">
                SHOPPING LIST
            </NavLink >
            <div className="navbar-nav ">
                {/*<NavLink to="/home"  className="nav-item nav-link" >Home</NavLink >*/}
                <NavLink to="/v2/shoppinglist/" className="nav-item nav-link " >My Lists</NavLink >
                <NavLink to="/auth/logout" className="nav-item nav-link" >Log Out</NavLink >
            </div>
        </div>
    </nav>
);


export default Header;