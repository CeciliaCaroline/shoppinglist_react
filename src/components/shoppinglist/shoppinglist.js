import React from 'react';
import AddList from "./addlist";
import Header from "../header";
import TableContents from "./tablecontents";
import axios from 'axios';
import {Pagination} from 'react-bootstrap';
import NotificationSystem from 'react-notification-system';
import BaseComponent from '../base';


let vex = require('vex-js');
vex.defaultOptions.className = 'vex-theme-os';

class ShoppingList extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            lists: {
                ShoppingLists: [],
                count: 0,
                page: 1
            },
            search: '',
            activePage: 1,
            isSearch: false,
            notificationSystem: null
        };
    }

    componentDidMount() {
        // if there is no token in local storage, redirect to login page
        if (!localStorage.getItem("token")) {
            console.log(this.props.history);
            this.props.history.push("/auth/login");
        }

        this.getShoppingLists(1, "");
    }

    //event handler to get shopping lists from the database
    getLists = (page, search_string = "") => {
        let URLSearchParams = require('url-search-params');
        let p = new URLSearchParams();

        //append page parameter to query string
        p.append('page', page || 1);

        //if search string exists, append it to the query string
        if (search_string && search_string.trim() !== "") {
            search_string = "&q=" + search_string
        } else {
            search_string = ""
        }

        //api call to get shopping lists from database
        return axios.get(`${this.baseURL}/v2/shoppinglist/?` + p + search_string,
            this.authHeader())
            .then(response => {
                    return response.data
                }
            )
            .catch((error) => {
                if (error.response.data.message) {
                    this.setState({notificationSystem: this.refs.notificationSystem});
                    this.state.notificationSystem.addNotification({
                        message: error.response.data.message,
                        level: 'error',
                        position: 'tc',
                        dismissible: 'true',
                        autoDismiss: 0
                    });
                }
            });
    };

    getShoppingLists = (pageNum, search_string = "") => {
        this.getLists(pageNum, search_string)
        //returns a promise
            .then((allshoppingLists) => {

                //set state to shopping lists attributes
                this.setState({
                    lists: allshoppingLists,
                    activePage: allshoppingLists.page,
                    totalItems: allshoppingLists.count,
                    itemsPerPage: allshoppingLists.limit,
                    search_count: allshoppingLists.search_count,
                    notificationSystem: this.refs.notificationSystem
                });

            })
            //returns a promise
            .catch((error) => {
                console.log(error)
            })
    };


    //method to add new shopping lists
    onListAdd = (name, description, id) => {
        this.getShoppingLists(1, "");
        this.state.lists.ShoppingLists.push(
            {
                name: name,
                description: description,
                id: id
            });
        this.setState({lists : this.state.lists});
    };

    //template when there are no lists
    noLists = () => {
        return (
            <div className="container-fluid">
                <Header/>
                <AddList onAdd={this.onListAdd}/>
                <h2 className="text-center ">No Shopping Lists</h2>
            </div>
        );
    };

    //event handler for editing a shopping list
    onListEdit = (id, name, description) => {

        //api call to edit shopping list
        //pass shopping list attributes with the put request
        axios.put(`${this.baseURL}/v2/shoppinglist/` + id, '{ "name": "' + name + '", "description": "' + description + '"}',
            this.authHeader())

            .then(response => {
                this.getShoppingLists(1, "");
                this.setState({notificationSystem: this.refs.notificationSystem});
                this.state.notificationSystem.addNotification({
                    message: response.data.message,
                    level: 'success',
                    position: 'tc'
                });
            })
            .catch((error) => {
                if (error.response.data.message) {
                    this.state.notificationSystem.addNotification({
                        message: error.response.data.message,
                        level: 'error',
                        position: 'tc'
                    });
                }

            });
    };

    //modal to delete shopping list
    openModal = (event) => {
        let e = event.target;

        vex.dialog.defaultOptions.showCloseButton = true;
        vex.dialog.defaultOptions.escapeButtonCloses = true;
        vex.dialog.defaultOptions.overlayClosesOnClick = true;

        vex.dialog.buttons.YES.text = 'Yes';
        vex.dialog.buttons.NO.text = 'No, thank you!';

        vex.dialog.confirm({
            message: 'Are you sure you want to delete this list?',
            callback: (value) => {
                if (value === true) {
                    this.onRemoveList(e);
                }
            }
        });

    };

    //event handler to delete shopping list
    onRemoveList = (e) => {
        //api call to delete shopping list
        axios.delete(`${this.baseURL}/v2/shoppinglist/` + e.getAttribute('data-id'), this.authHeader())
            .then(response => {
                    this.getShoppingLists(1, "");
                    this.setState({notificationSystem: this.refs.notificationSystem});
                    this.state.notificationSystem.addNotification({
                        message: response.data.message,
                        level: 'success',
                        position: 'tc'
                    });

                }
            )
            .catch((error) => {
                if (error.response.data.message) {
                    this.state.notificationSystem.addNotification({
                        message: error.response.data.message,
                        level: 'error',
                        position: 'tc'
                    });
                }
            })
    };


    //event handler for searching shopping list names
    updateSearch = (event) => {
        this.setState({search: event.target.value.substr(0, 20)})

    };

    //event handler for submission of the search form
    handleSubmit = (event) => {
        event.preventDefault();
        this.getShoppingLists(1, this.state.search)

    };

    //event handler for selecting active page in pagination
    handlePageSelect = (e) => {
        this.setState({activePage: e});
        this.getShoppingLists(e)
    };


    render() {
        const {lists, totalItems, search, search_count, itemsPerPage, activePage} = this.state;

        //if there are no shopping lists, display no lists template
        if (!lists.ShoppingLists.length) {
            return this.noLists();
        }


        let totalPages = Math.ceil(totalItems / itemsPerPage);
        let searchPages = Math.ceil(search_count / itemsPerPage);

        return (

            <div className="container">
                <Header onlink={this.pushNavigation}/>
                <AddList onAdd={this.onListAdd}/>

                <NotificationSystem ref="notificationSystem"/>
                <form className="input-group col-4 offset-8" onSubmit={this.handleSubmit}>
                    <span className="input-group-addon  form-control form-control-sm">Search Name</span>
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
                <table className="table items table-hover table-striped ">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th colSpan="2">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {lists.ShoppingLists ? lists.ShoppingLists.map((list) => (
                        <TableContents onRemove={this.openModal}
                                       list={list}
                                       key={list.id} id={list.id} onlink={this.pushNavigation}
                                       onEdit={this.onListEdit}
                        />)) : 'Not Found'}

                    </tbody>
                </table>
                <Pagination
                    bsSize="medium"
                    items={search_count ? searchPages : totalPages}
                    activePage={activePage}
                    onSelect={this.handlePageSelect}
                    className='justify-content-center'
                />
            </div>

        );
    }
}


export default ShoppingList;
