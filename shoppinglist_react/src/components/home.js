import React, {Component} from 'react';
import Header from './header';
import PropTypes from 'prop-types';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: this.props.initialLists
        };

    }

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
                                    <h5>You have {this.state.lists.length} Lists</h5>
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

Home.propTypes = {
    initialLists: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired
        }
    )).isRequired,


};


export default Home;