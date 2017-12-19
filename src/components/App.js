import React from 'react';
import Register from './auth/register';
import Login from "./auth/login";
import ShoppingList from "./shoppinglist/shoppinglist";
import Items from "./items/items";
import SendEmail from "./auth/email_send";
import ResetPassword from "./auth/reset_password";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import NotFound from './notfound';


export default props => {


    return (
        <BrowserRouter>
            <div className="App">
                <Switch>
                    <Route exact path="/" component={Register}/>
                    <Route exact path="/auth/register" component={Register}/>
                    <Route exact path="/auth/login" component={Login}/>
                    <Route exact path="/auth/reset_password/:token" component={ResetPassword}/>
                    <Route exact path="/auth/reset_password" component={SendEmail}/>
                    <Route exact path="/v2/shoppinglist/" component={ShoppingList}/>
                    <Route exact path='/v2/shoppinglist/:id/items/' component={Items}/>
                    <Route path="*" component={NotFound}/>
                </Switch>
            </div>

        </BrowserRouter>
    )

}


