import React, {Component} from 'react';
import Register from './register';
import Login from "./login";
import Home from "./home";
import {BrowserRouter, Route} from 'react-router-dom';


class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Route  exact path="/" component={Register}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/home" component={Home}/>
                    {/*<Register/>*/}
                    {/*<Login/>*/}
                    {/*<Home/>*/}
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
