import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AddList from "./addlist";
import Header from "./header";
import TableContents from "./tablecontents";


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

    onListEdit(title, description) {
        this.setState({
            title: title,
            description: description
        });
        // console.log(this.state);


    }


    onRemoveList(index) {
        alert("Are you sure you want to delete this list?");
        this.state.lists.splice(index, 1);
        this.setState(this.state);

    }



    render() {
        return (
            <div className="container">
                <Header/>
                <AddList onAdd={this.onListAdd.bind(this)}/>
                <table className="table items table-hover table-striped">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th colSpan="2">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.lists.map((list, index) => (
                        <TableContents onEdit={(title, description) => {
                            this.onListEdit(title, description)
                        }}
                                       onRemove={() => {
                                           this.onRemoveList(index)
                                       }}

                                       title={list.title}
                                       description={list.description}
                                       key={list.id}/>))}
                    </tbody>
                </table>
            </div>

        );
    }
}

ShoppingList.propTypes = {

    initialLists: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired
        }
    )).isRequired,


};

export default ShoppingList;
