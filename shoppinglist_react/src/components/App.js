import React, {Component} from 'react';
import Register from './register';
import Login from "./login";
import Home from "./home";
import PropTypes from 'prop-types';
import {BrowserRouter, Route} from 'react-router-dom';


class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Route  exact path="/" component={Register}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/home/:name" component={Home}/>

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
