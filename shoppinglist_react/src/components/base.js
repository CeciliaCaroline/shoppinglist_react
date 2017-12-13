import {Component} from 'react';

class BaseComponent extends Component {


    pushNavigation = (event) => {
        event.preventDefault();
        this.props.history.push(event.target.getAttribute("href"));
    }

}

export default BaseComponent

