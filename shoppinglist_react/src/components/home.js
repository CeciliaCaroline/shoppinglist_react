import React, {Component} from 'react';
import Header from './header';



class Home extends Component {

    render() {
        return (
            <div>
                <Header/>
                <div className="container">
                    <div className="row">
                        <div className="  col  ">
                            <div className="card  items d-flex align-content-end text-center">
                                <div>
                                    <h2 className="text-welcome">Hi Caroline</h2>
                                </div>
                                <section className="mt-5">
                                    <h5>You have 0 Lists</h5>
                                    <p>Click on <em>My Lists</em> to create new lists</p>

                                </section>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );

    }
}


export default Home;