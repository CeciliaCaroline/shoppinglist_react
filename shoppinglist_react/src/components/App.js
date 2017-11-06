import React, {Component} from 'react';
import Register from './auth/register';
import Login from "./auth/login";
import Home from "./home";
import ShoppingList from "./shoppinglist/shoppinglist";
import Items from "./items/items";
import SendEmail from "./auth/email_send";
import ResetPassword from "./auth/reset_password";
import Logout from "./auth/logout";
import {BrowserRouter, Route} from 'react-router-dom';


class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <div className="App">

                    <Route exact path="/" component={Register}/>
                    <Route exact path="/auth/register" component={Register}/>
                    <Route path="/auth/login" component={Login}/>
                    <Route exact path="/auth/reset_password/:token" component={ResetPassword}/>
                    <Route exact path="/auth/reset_password" component={SendEmail}/>
                    <Route path="/auth/logout" component={Logout}/>
                    <Route path="/home" render={() => <Home/>}/>
                    <Route exact path="/v2/shoppinglist/" component={ShoppingList}/>
                    <Route path='/v2/shoppinglist/:id/items/' component={Items}/>
                </div>
            </BrowserRouter>
        );
    }
}


export default App;
