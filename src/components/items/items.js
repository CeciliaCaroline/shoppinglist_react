import React from 'react';
import Header from "../header";
import AddItem from './additem';
import axios from 'axios';
import ItemContents from "./itemcontents";
import {Pagination} from 'react-bootstrap';
import NotificationSystem from 'react-notification-system';
import BaseComponent from '../base';


let vex = require('vex-js');
vex.defaultOptions.className = 'vex-theme-os';

class Items extends BaseComponent {
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
            notificationSystem: null,

        }
    }

    //method to get shopping list items
    getItems = (page, search_string = "") => {
        let URLSearchParams = require('url-search-params');
        let p = new URLSearchParams();
        //append page parameter to url query string
        p.append('page', page || 1);

        //if search string exists, append to  url query string
        if (search_string && search_string.trim() !== "") {
            search_string = "&q=" + search_string
        } else {
            search_string = ""
        }

        //api call to get shopping list items from database
        return axios.get(`${this.baseURL}/v2/shoppinglist/${this.props.match.params.id}/items/?` + p + search_string,
            this.authHeader())
            .then(response => {
                    return response.data
                }
            )
            .catch((error) => {

                //if error message exists, display as a notification
                if (error.response.data.message) {
                    this.setState({notificationSystem: this.refs.notificationSystem,});
                    this.state.notificationSystem.addNotification({
                        message: error.response.data.message,
                        level: 'error',
                        position: 'tc'
                    });
                }
            });
    };

    //get all shopping list items
    getShoppingListItems = (pageNum, search_string = "") => {
        this.getItems(pageNum, search_string)

            //returns promise
            .then((allitems) => {

            //set state to items attributes from the response
                this.setState({
                    items: allitems,
                    name: allitems.name,
                    activePage: allitems.page,
                    totalItems: allitems.count,
                    itemsPerPage: allitems.limit,
                    search_count: allitems.search_count,
                    get_count: allitems.count,

                });
            })
            .catch((error) => {

            });
    };

    componentDidMount() {
        this.setState({notificationSystem: this.refs.notificationSystem});
        this.getShoppingListItems(1, "");
        //set id from  url as list id
        this.setState({list_id: this.props.match.params.id});

    }

    //modal to delete shopping list item
    openModal = (event) => {
        let e = event.target;

        vex.dialog.defaultOptions.showCloseButton = true;
        vex.dialog.defaultOptions.escapeButtonCloses = true;
        vex.dialog.defaultOptions.overlayClosesOnClick = true;

        vex.dialog.buttons.YES.text = 'Yes';
        vex.dialog.buttons.NO.text = 'No, thank you!';

        vex.dialog.confirm({
            message: 'Are you sure you want to delete this item?',
            callback: (value) => {
                if (value === true) {

                    this.onRemoveItem(e);
                }
            }
        });

    };

    //event handler for deleting shopping list item
    onRemoveItem = (event) => {
        axios.delete(`${this.baseURL}/v2/shoppinglist/${this.props.match.params.id}/items/` + event.getAttribute('data-id2'),
            this.authHeader())

            //returns a promise
            .then(response => {

                //after deleting an item, get and display the remaining items
                    this.getShoppingListItems(1, "");
                    this.setState({notificationSystem: this.refs.notificationSystem});
                    this.state.notificationSystem.addNotification({
                        message: response.data.message,
                        level: 'success',
                        position: 'tc'
                    });
                }
            )
            .catch((error) => {
                this.setState({notificationSystem: this.refs.notificationSystem});

                //display the error message as a notification
                if (error.response.data.message) {
                    this.state.notificationSystem.addNotification({
                        message: error.response.data.message,
                        level: 'error',
                        position: 'tc'
                    });
                }
            });

    };

    //event handler for editing shopping  list item
    onItemEdit = (id, name, price) => {
        axios.put(`${this.baseURL}/v2/shoppinglist/${this.props.match.params.id}/items/` + id, '{ "name": "' + name + '", "price": "' + price + '"}',
            this.authHeader())

            .then(response => {
                //after editing an item, get and display the items
                this.getShoppingListItems(1, "");
                this.setState({notificationSystem: this.refs.notificationSystem});
                this.state.notificationSystem.addNotification({
                    message: response.data.message,
                    level: 'success',
                    position: 'tc'
                });
            })

            .catch((error) => {
                this.setState({notificationSystem: this.refs.notificationSystem});

                //display the error message as a notification
                if (error.response.data.message) {
                    this.state.notificationSystem.addNotification({
                        message: error.response.data.message,
                        level: 'error',
                        position: 'tc'
                    });
                }
            });
    };

    //template for no items
    noItems = () => {
        return (
            <div className="container-fluid">
                <Header/>
                <AddItem onAdd={this.onItemAdd} list_id={this.state.list_id}/>
                <h2 className="text-center ">No Shopping List Items </h2>
            </div>
        );
    };

    //method to add a shopping list item
    onItemAdd = (name, price, id) => {

        this.getShoppingListItems(1, "");
        this.state.items.Shoppinglists_Items.push(
            {
                name: name,
                price: price,
                id: id
            });

        this.setState({items : this.state.items});


    };

    //event handler for search

    updateSearch = (event) => {
        this.setState({search: event.target.value.substr(0, 20)})
    };

    //event handler for submission of the search form
    handleSubmit = (event) => {
        event.preventDefault();
        this.getShoppingListItems(1, this.state.search);
    };

    //event handler for page selection in pagination
    handleSelect = (e) => {
        this.setState({activePage: e});
        this.getShoppingListItems(e)
    };

    render() {
        const {items, totalItems, search, search_count, itemsPerPage, activePage, list_id, name} = this.state;

        //if there are no items, render the no items template
        if (!this.state.items.Shoppinglists_Items.length) {
            return this.noItems();
        }

        let totalPages = Math.ceil(totalItems / itemsPerPage);
        let searchPages = Math.ceil(search_count / itemsPerPage);

        return (

            <div className="container">

                <Header/>
                <AddItem onAdd={this.onItemAdd} list_id={list_id}/>
                <NotificationSystem ref="notificationSystem"/>
                <form className="input-group col-4 offset-8" onSubmit={this.handleSubmit}>
                    <span className="input-group-addon form-control form-control-sm">Search Name</span>
                    <input
                        type="text"
                        className="form-control form-control-sm"
                        name="search"
                        ref='search'
                        aria-describedby="btnGroupAddon"
                        value={search}
                        onChange={this.updateSearch}
                    />
                </form>
                <h5>Shopping list - {name}</h5>
                <table className="table items table-hover table-striped">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th colSpan="2">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.Shoppinglists_Items ? items.Shoppinglists_Items.map((item) => (
                        <ItemContents onRemove={this.openModal}
                                      list={item}
                                      id={item.id}
                                      key={item.id} onEdit={this.onItemEdit}/>)) : 'No items found'}
                    </tbody>
                </table>
                <Pagination
                    bsSize="medium"
                    items={search_count ? searchPages : totalPages}
                    activePage={activePage}
                    onSelect={this.handleSelect}
                    className='justify-content-center'
                />
            </div>

        );
    }
}

export default Items;
