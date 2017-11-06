import React, {Component} from 'react';
import Header from "../header";
import AddItem from './additem';
import axios from 'axios';
import ItemContents from "./itemcontents";
import {Pagination} from 'react-bootstrap';


let shoppinglists_items = [];

const head = {
    headers: {'Content-Type': 'application/json', Authorization: "Bearer " + localStorage.getItem('token')}
};


class Items extends Component {


    constructor(props) {
        super(props);
        this.state = {
            items: {
                Shoppinglists_Items: [],
                count: 0,
                page: 1
            },
            search: '',
            activePage: 1,
            list_id: "",
            isSearch: false,

        }
    }

    getItems(page, search_string = "") {
        let p = new URLSearchParams();
        p.append('page', page || 1);
        if (search_string && search_string.trim() !== "") {
            search_string = "&q=" + search_string
        } else {
            search_string = ""
        }

        return axios.get(`http://127.0.0.1:5000/v2/shoppinglist/${this.props.match.params.id}/items/?` + p + search_string, head)
            .then(response => {
                    console.log('response', response.data);
                    return response.data
                }
            )
            .catch(err => console.log(err));
    };

    getShoppingListItems(pageNum, search_string = "") {
        this.getItems(pageNum, search_string)
            .then((allitems) => {
                shoppinglists_items = allitems;
                    this.setState({
                        items: shoppinglists_items,
                        activePage: shoppinglists_items.page,
                        totalItems: shoppinglists_items.count,
                        itemsPerPage: shoppinglists_items.limit,
                        search_count: shoppinglists_items.search_count,
                        get_count: allitems.count,


                    });


            })
            .catch(err => console.log(err));


    }

    componentDidMount() {
        this.getShoppingListItems(1, "");
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
                    let index = this.state.items.Shoppinglists_Items.findIndex(item => item.id == event.target.getAttribute('data-id'));
                    this.state.items.Shoppinglists_Items.splice(index, 1);
                    this.setState(this.state);

                    if (this.state.items.Shoppinglists_Items.length !== 0) {
                        this.getShoppingListItems(this.state.activePage)
                    }

                    console.log('delete state', this.state);
                    return response.data
                }
            )
            .catch(err => console.log(err));
        //
    }


    onItemEdit(id, name, price) {
        axios.put(`http://127.0.0.1:5000/v2/shoppinglist/${this.props.match.params.id}/items/` + id, '{ "name": "' + name + '", "price": "' + price + '"}',
            {
                headers: {Authorization: "Bearer " + localStorage.getItem('token'), "Content-Type": "application/json"},


            })

            .then(response => {
                let index = this.state.items.Shoppinglists_Items.findIndex(x => x.id == id);
                // console.log(index);
                this.state.items.Shoppinglists_Items.map((item, sidx) => {
                    if (index !== sidx) return item;
                    return {...item};
                });

                this.setState(this.state);
                this.getShoppingListItems(1, "");
                return response.data
            });

        this.getShoppingListItems(this.state.activePage)
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


    onItemAdd(name, price, id) {

        console.log('items', this.state.items);
        this.getShoppingListItems(1, "");
        this.state.items.Shoppinglists_Items.push(
            {
                name: name,
                price: price,
                id: id
            });
        this.setState(this.state);
        // this.getShoppingListItems(this.state.activePage);


    };

    updateSearch(event) {
        this.setState({search: event.target.value.substr(0, 20)})

    }

    handleSubmit(event) {
        event.preventDefault();
        this.getShoppingListItems(1, this.state.search);
        if (!this.state.search_count) {
            return this.noItems()
        }
    }


    handleSelect(e) {
        console.log('handle select', e);
        this.setState({activePage: e});
        this.getShoppingListItems(e)
    }


    render() {

        if (!this.state.items.Shoppinglists_Items.length) {
            return this.noItems();
        }


        let totalPages = Math.ceil(this.state.totalItems / this.state.itemsPerPage);
        let searchPages = Math.ceil(this.state.search_count / this.state.itemsPerPage);
        console.log('total pages', totalPages);
        console.log('search pages', searchPages);
        console.log('items', this.state.items.Shoppinglists_Items);
        console.log('count', this.state.totalItems);
        console.log('items per page', this.state.itemsPerPage);


        return (

            <div className="container">

                <Header/>
                <AddItem onAdd={this.onItemAdd.bind(this)} list_id={this.state.list_id}/>
                <form className="input-group col-4 offset-8" onSubmit={this.handleSubmit.bind(this)}>
                    <span className="input-group-addon" id="btnGroupAddon">Search</span>
                    <input
                        type="text"
                        className="form-control"
                        name="search"
                        ref='search'
                        aria-describedby="btnGroupAddon"
                        value={this.state.search}
                        onChange={this.updateSearch.bind(this)}
                    />
                </form>
                <table className="table items table-hover table-striped">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th colSpan="2">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.items.Shoppinglists_Items ? this.state.items.Shoppinglists_Items.map((item) => (
                        <ItemContents onRemove={this.onRemoveItem.bind(this)}
                                      list={item}

                                      key={item.id} onEdit={this.onItemEdit.bind(this)}/>)) : 'No items found'}

                    </tbody>
                </table>
                <Pagination
                    bsSize="medium"
                    items={this.state.search_count ? searchPages : totalPages}
                    activePage={this.state.activePage}
                    onSelect={this.handleSelect.bind(this)}
                />


            </div>

        );
    }
}

export default Items;
