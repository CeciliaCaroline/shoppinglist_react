import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';


const head = {
    headers: {Authorization: "Bearer " + localStorage.getItem('token')}
};

class Logout extends Component {

    logout() {
        console.log('logging out');
        alert("Are you sure you want to logout?");
        axios.post(`http://127.0.0.1:5000/auth/logout`, {}, head)

            .then((response) => {


                if (response.status === 200) {
                    localStorage.removeItem('token');
                }

            })

            .catch(function (error) {
                console.log(error);
            });

    }

    render() {
        this.logout();
        return (

            <Redirect to="/auth/login"/>
        )
    }
}

export default Logout;
