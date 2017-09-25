import React, {Component} from 'react';
import Register from './register';
import Login from "./login";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Register/>
                <Login/>
            </div>
        );
    }
}

export default App;
