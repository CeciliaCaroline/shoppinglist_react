import React from 'react';
import Header from './header';


const Home = ({match}) => {
    let name = match.params.name
    return (
        <div>
            <Header name={name}/>
            <div className="container">
                <div className="row">
                    <div className="  col  ">
                        <div className="card  items d-flex align-content-end text-center">
                            <div>
                                <h2 className="text-welcome">Hi {name}</h2>
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


export default Home;