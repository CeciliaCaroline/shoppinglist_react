import {Component} from 'react';




class BaseComponent extends Component {
    baseURL = "http://127.0.0.1:5000";

    pushNavigation = (event) => {
        event.preventDefault();
        this.props.history.push(event.target.getAttribute("href"));
    };

    contentHeader = () => {
        return {headers: {"Content-Type": "application/json"}}
    };

    authHeader = () => {
        let contentHeader = this.contentHeader();
        contentHeader["headers"]["authorization"] = "Bearer " + localStorage.getItem('token');
        return contentHeader
    };

    componentDidMount() {
        this.setState({notificationSystem: this.refs.notificationSystem});
    }



}

export default BaseComponent

