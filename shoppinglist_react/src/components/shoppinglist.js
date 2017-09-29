import React, {Component} from 'react';
import AddList from "./addlist";
import Header from "./header";
import TableContents from "./tablecontents";
import axios from 'axios';

let shoppingLists = [];

class ShoppingList extends Component {

    constructor(props,) {
        super(props);
        this.state = {
            lists: [],

        };

    }

    getLists = () => {
        return axios.get(`http://127.0.0.1:5000/shoppinglist`, {
            headers: {Authorization: "Bearer " + localStorage.getItem('token')}
        })
            .then(response => {
                    return response.data
                }
            )
            .catch(err => console.log(err));
    };

    componentWillMount() {
        this.getLists()
            .then((allshoppingLists) => {
                shoppingLists = allshoppingLists;
                this.setState({lists: shoppingLists})
            })
            .catch(err => console.log(err))
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
                    {/*<TableContents  />*/}
                    {this.state.lists.map((list) => (
                        <TableContents
                            title={list.title}
                            description={list.description}
                            key={list.id}/>))}
                    </tbody>
                </table>
            </div>

        );
    }
}


export default ShoppingList;
