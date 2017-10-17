import React, {Component} from 'react';
import Register from './register';
import Login from "./login";
import Home from "./home";
import ShoppingList from "./shoppinglist";
import ResetPassword from "./reset_password";
import Logout from "./logout";
import {BrowserRouter, Route} from 'react-router-dom';




class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Route exact path="/" component={Register}/>
                    <Route exact path="/auth/register" component={Register}/>
                    <Route path="/auth/login" component={Login}/>
                    <Route path="/auth/reset-password" component={ResetPassword}/>
                    <Route path="/auth/logout" component={Logout}/>
                    <Route path="/home" render={() => <Home />}/>
                    <Route path="/shoppinglist/" component={ShoppingList}/>
                </div>
            </BrowserRouter>
        );
    }
}



export default App;
