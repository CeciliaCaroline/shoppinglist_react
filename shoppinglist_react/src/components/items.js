import React, {Component} from 'react';
import Header from "./header";
import AddItem from './additem';
import TableContents from "./tablecontents";
import axios from 'axios';


let shoppinglists_items = [];

const head = {
    headers: {'Content-Type': 'application/json', Authorization: "Bearer " + localStorage.getItem('token')}
};


class Items extends Component {
    nextId = 1

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            search: '',
            activePage: 1,
            list_id: "",
            // count: 1,
            isSearch: false,

        }
    }

    getItems(page) {
        let p = new URLSearchParams();
        p.append('page', page || 1);
        console.log('id', this.props.match.params.id);

        return axios.get(`http://127.0.0.1:5000/v2/shoppinglist/${this.props.match.params.id}/items/?` + p, head)
            .then(response => {

                    return response.data
                }
            )
            .catch(err => console.log(err));
    };

    getShoppingListItems(pageNum) {
        this.getItems(pageNum)
            .then((allitems) => {
                shoppinglists_items = allitems;
                console.log('data', shoppinglists_items);
                this.setState({
                    items: shoppinglists_items,
                    // activePage: shoppingLists.page,
                    totalItems: shoppinglists_items.count,
                    itemsPerPage: shoppinglists_items.limit,


                });
                console.log(this.state.totalItems);
            })
            .catch(err => console.log(err));

    }

    componentDidMount() {
        this.getShoppingListItems(1);
        this.setState({list_id: this.props.match.params.id});

    }

    onRemoveItem(e) {
        e.persist();
        let event = e;
        axios.delete(`http://127.0.0.1:5000/v2/shoppinglist/${this.props.match.params.id}/items/` + event.target.getAttribute('data-id'), {
            headers: {Authorization: "Bearer " + localStorage.getItem('token')}


        })
            .then(response => {
                    alert("Are you sure you want to delete this Item?");
                    let index = this.state.items.Shoppinglists_items.findIndex(x => x.id == event.target.getAttribute('data-id'));
                    console.log(index);
                    this.state.lists.Shoppinglists_items.splice(index, 1);
                    this.setState(this.state);
                    console.log(this.state);
                    console.log('deleted');
                    return response.data
                }
            )
            .catch(err => console.log(err));
    }

    onItemEdit() {
        console.log('edit')
    }

    noItems = () => {
        return (
            <div className="container-fluid">
                <Header/>
                <AddItem onAdd={this.onItemAdd.bind(this)} list_id={this.state.list_id}/>
                <h2 className="text-center ">No Shopping List Items</h2>
            </div>
        );
    };


    onItemAdd(name, price) {

        console.log(this.state.items.shoppinglists_items);

        this.state.items.shoppinglists_items.push(
            {
                name: name,
                price: price,
                id: this.nextId
            });
        this.setState(this.state);
        this.nextId+=1

    };


    render() {

        if (this.state.totalItems === 0) {
            return this.noItems();
        }

        return (

            <div className="container">

                <Header/>
                <AddItem onAdd={this.onItemAdd.bind(this)} list_id={this.state.list_id}/>
                <table className="table items table-hover table-striped">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th colSpan="2">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.items.shoppinglists_items.map((item) => (
                        <TableContents onRemove={this.onRemoveItem.bind(this)}
                                       list={item}

                                       key={item.id} onEdit={this.onItemEdit.bind(this)}/>))}

                    </tbody>
                </table>


            </div>

        );
    }
}


export default Items;
