import React from 'react';
import Header from './header'
import BaseComponent from "./base";


class NotFound extends BaseComponent {
    render() {
        //not found template
        return (

            <div>
                <Header/>
                <div className="container">
                    <div className="row">
                        <div className="  col  ">
                            <div className="card  items d-flex align-content-end text-center">
                                <section className='mt-5 container'>
                                    <h3 className='text-center'>404 page not found</h3>
                                    <p className='text-center'>We are sorry but the page you are looking for does not
                                        exist. <a href='/' onClick={this.pushNavigation}>Click here to return to the
                                            home page </a></p>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
export default NotFound


