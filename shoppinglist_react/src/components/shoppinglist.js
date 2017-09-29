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
            lists: [{
                name: "name",
                description: "description",
                id: 5
            }],

        };

    }

    getLists = () => {
        return axios.get(`https://infinite-hollows-73486.herokuapp.com/shoppinglist`, {
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

    onListAdd(name, description) {
        this.state.lists.push(
            {
                name: name,
                description: description,
                id: this.nextId
            });
        this.setState(this.state);
        this.nextId += 1;

    }

     onListEdit(id, name, description) {
        shoppingLists[id].name = name;
        shoppingLists[id].description = description;
        this.setState({lists: shoppingLists});

    }
     noBuckets = () => {
        return (
            <div className="container-fluid">
                <Header/>
                <AddList onAdd={this.onListAdd.bind(this)}/>
                <h2 className="text-center ">No bucket Lists</h2>
            </div>
        );
    };

    onRemoveList(index) {
        alert("Are you sure you want to delete this list?");
        this.state.lists.splice(index, 1);
        this.setState(this.state);

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
                    {/*<TableContents  />*/}
                    {this.state.lists.map((list) => (
                        <TableContents
                            name={list.name}
                            description={list.description}
                            key={list.id} onEdit={this.onListEdit}/>))}

                    </tbody>
                </table>
            </div>

        );
    }
}


export default ShoppingList;
