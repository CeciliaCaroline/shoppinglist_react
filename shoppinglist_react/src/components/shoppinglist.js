import React, {Component} from 'react';
import AddList from "./addlist";
import Header from "./header";
import TableContents from "./tablecontents";
import axios from 'axios';

let shoppingLists = [];

class ShoppingList extends Component {
    nextId = 20;

    constructor(props,) {
        super(props);
        this.state = {
            lists: [],

        };

    }

    getLists = () => {
        return axios.get(`http://127.0.0.1:5000/shoppinglist/`, {
            headers: {Authorization: "Bearer " + localStorage.getItem('token')}
        })
            .then(response => {
                    return response.data
                }
            )
            .catch(err => console.log(err));
    };


    componentDidMount() {
        this.getLists()
            .then((allshoppingLists) => {
                shoppingLists = allshoppingLists;
                this.setState({lists: shoppingLists})
            })
            .catch(err => console.log(err))
    }

    onListAdd(name, description) {

        console.log(this.state.lists.Shoppinglists);

        this.state.lists.Shoppinglists.push(
            {
                name: name,
                description: description,
                id: this.nextId
            });
        this.setState(this.state);
        this.nextId += 1;

    }


    onListEdit = (idx) => (evt) => {
        this.state.lists.Shoppinglists.map((list, sidx) => {
            if (idx !== sidx) return list;
            return {...list, name: evt.target.value, description: evt.target.value};
        });

        this.setState(this.state);
    };


    noBuckets = () => {
        return (
            <div className="container-fluid">
                <Header/>
                <AddList onAdd={this.onListAdd.bind(this)}/>
                <h2 className="text-center ">No bucket Lists</h2>
            </div>
        );
    };

    onRemoveList(id) {
        axios.delete(`http://127.0.0.1:5000/shoppinglist/${id}`, {
            headers: {Authorization: "Bearer " + localStorage.getItem('token')}
        })
            .then(response => {
                    alert("Are you sure you want to delete this list?");
                    let index = this.state.lists.Shoppinglists.findIndex(x => x.id === id);
                    this.state.lists.Shoppinglists.splice(index, 1);
                    this.setState(this.state);
                    console.log(this.state);
                    console.log('deleted');
                    return response.data

                }
            )
            .catch(err => console.log(err));


    }


    render() {
        if (this.state.lists.length === 0) {
            return this.noBuckets();
        }
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
                    {this.state.lists.Shoppinglists.map((list) => (
                        <TableContents onRemove={this.onRemoveList.bind(this)}
                                       name={list.name}
                                       description={list.description}
                                       key={list.id} onEdit={this.onListEdit.bind(this)}/>))}

                    </tbody>
                </table>
            </div>

        );
    }
}


export default ShoppingList;
