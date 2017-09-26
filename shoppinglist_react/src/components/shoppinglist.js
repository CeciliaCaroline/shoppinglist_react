import React, {Component} from 'react';
import TableBody from './tablebody';
import PropTypes from 'prop-types';
import AddList from "./addlist";
import Header from "./header";


class ShoppingList extends Component {
    nextId = 4;

    constructor(props,) {
        super(props);
        this.state = {
            lists: this.props.initialLists
        };

    }

    onListAdd(title, description) {
        this.state.lists.push(
            {
                title: title,
                description: description,
                id: this.nextId
            });
        this.setState(this.state);
        this.nextId += 1;
    }


    render() {
        return (
            <div>
                <Header />
                <AddList onAdd={this.onListAdd.bind(this)}/>
                <table className="table items table-hover table-striped">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th colSpan="2" className="text-center">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.lists.map((list, index) => (
                        <TableBody title={list.title} description={list.description} key={list.id}/>))}
                    </tbody>
                </table>
            </div>

        );
    }
}

ShoppingList.propTypes = {

    // lists: PropTypes.array.isRequired,
    initialLists: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired
        }
    )).isRequired,


};

export default ShoppingList;
