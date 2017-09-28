import React, {Component} from 'react';
import Register from './register';
import Login from "./login";
import Home from "./home";
import ShoppingList from "./shoppinglist";
import PropTypes from 'prop-types';
import {BrowserRouter, Route} from 'react-router-dom';


let Lists = [{
    title: "Cecilia",
    description: "qwertyuiop",
    id: 1
}];

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: this.props.initialLists
        };

    }


    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Route exact path="/" component={Register}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/home" render={() => <Home initialLists={Lists}/>}/>
                    <Route path="/shoppinglist" render={() => <ShoppingList initialLists={Lists}/>}/>
                </div>
            </BrowserRouter>
        );
    }
}

App.propTypes = {
    initialLists: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired
        }
    )).isRequired,

};

export default App;
