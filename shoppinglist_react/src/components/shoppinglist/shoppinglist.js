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
let shoppingLists = [];

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
        this.getShoppingLists(1, "");
    }

    getLists(page, search_string = "") {
        let URLSearchParams = require('url-search-params');
        let p = new URLSearchParams();
        p.append('page', page || 1);
        if (search_string && search_string.trim() !== "") {
            search_string = "&q=" + search_string
        } else {
            search_string = ""
        }

        return axios.get(`${this.baseURL}/v2/shoppinglist/?` + p + search_string,
            this.authHeader())
            .then(response => {
                    return response.data
                }
            )
            .catch((error) => {
                if (error.response.status === 404) {
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

    getShoppingLists(pageNum, search_string = "") {
        this.getLists(pageNum, search_string)
            .then((allshoppingLists) => {
                shoppingLists = allshoppingLists;
                this.setState({
                    lists: shoppingLists,
                    activePage: shoppingLists.page,
                    totalItems: shoppingLists.count,
                    itemsPerPage: shoppingLists.limit,
                    search_count: shoppingLists.search_count,
                    notificationSystem: this.refs.notificationSystem
                });

            })
            .catch(err => console.log(err));
    }


    onListAdd = (name, description, id) => {
        this.getShoppingLists(1, "");
        this.state.lists.ShoppingLists.push(
            {
                name: name,
                description: description,
                id: id
            });
        this.setState(this.state);

    };

    noLists = () => {
        return (
            <div className="container-fluid">
                <Header/>
                <AddList onAdd={this.onListAdd.bind(this)}/>
                <h2 className="text-center ">No Shopping Lists</h2>
            </div>
        );
    };

    onListEdit = (id, name, description) => {
        axios.put(`${this.baseURL}/v2/shoppinglist/` + id, '{ "name": "' + name + '", "description": "' + description + '"}',
            this.authHeader())

            .then(response => {
                let index = this.state.lists.ShoppingLists.findIndex(x => x.id == id);
                this.state.lists.ShoppingLists.map((list, listid) => {
                    if (index !== listid) return list;
                    return {...list};
                });
                this.setState({notificationSystem: this.refs.notificationSystem});
                this.state.notificationSystem.addNotification({
                    message: response.data.message,
                    level: 'success',
                    position: 'tc'
                });

                this.setState(this.state);
                this.getShoppingLists(1, "");
                return response.data
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    this.state.notificationSystem.addNotification({
                        message: error.response.data.message,
                        level: 'error',
                        position: 'tc'
                    });
                }

                if (error.response.status === 404) {
                    this.state.notificationSystem.addNotification({
                        message: error.response.data.message,
                        level: 'error',
                        position: 'tc'
                    });
                }
            });
    };

    openModal = (event) => {
        let component = this;
        let e = event.target;

        vex.dialog.defaultOptions.showCloseButton = true;
        vex.dialog.defaultOptions.escapeButtonCloses = true;
        vex.dialog.defaultOptions.overlayClosesOnClick = true;

        vex.dialog.buttons.YES.text = 'Yes';
        vex.dialog.buttons.NO.text = 'No, thank you!';

        vex.dialog.confirm({
            message: 'Are you sure you want to delete this list?',
            callback: function (value) {
                if (value === true) {
                    component.onRemoveList(e);
                }
            }
        });

    };

    onRemoveList = (e) => {
        axios.delete(`http://127.0.0.1:5000/v2/shoppinglist/` + e.getAttribute('data-id'), this.authHeader())
            .then(response => {

                    let index = this.state.lists.ShoppingLists.findIndex(x => x.id == event.getAttribute('data-id'));
                    this.state.lists.ShoppingLists.splice(index, 1);
                    if (response.status === 200) {
                        this.setState({notificationSystem: this.refs.notificationSystem});
                        this.state.notificationSystem.addNotification({
                            message: response.data.message,
                            level: 'success',
                            position: 'tc'
                        });
                    }

                    this.setState(this.state);
                    if (this.state.lists.ShoppingLists.length !== 0) {
                        this.getShoppingLists(this.state.activePage)
                    }
                    return response.data
                }
            )
            .catch((error) => {

                if (error.response.status === 404) {
                    this.state.notificationSystem.addNotification({
                        message: error.response.data.message,
                        level: 'error',
                        position: 'tc'
                    });
                }
            })
    }



    updateSearch = (event) => {
        this.setState({search: event.target.value.substr(0, 20)})

    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.getShoppingLists(1, this.state.search)

    };

    handleSelect = (e) => {
        this.setState({activePage: e});
        this.getShoppingLists(e)
    };


    render() {
        if (!this.state.lists.ShoppingLists.length) {
            return this.noLists();
        }


        let totalPages = Math.ceil(this.state.totalItems / this.state.itemsPerPage);
        let searchPages = Math.ceil(this.state.search_count / this.state.itemsPerPage);

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
                        value={this.state.search}
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
                    {this.state.lists.ShoppingLists ? this.state.lists.ShoppingLists.map((list) => (
                        <TableContents onRemove={this.openModal}
                                       list={list}
                                       key={list.id} id={list.id} onlink={this.pushNavigation}
                                       onEdit={this.onListEdit}
                        />)) : 'Not Found'}

                    </tbody>
                </table>
                <Pagination
                    bsSize="medium"
                    items={this.state.search_count ? searchPages : totalPages}
                    activePage={this.state.activePage}
                    onSelect={this.handleSelect}
                    className='justify-content-center'

                />
            </div>

        );
    }
}


export default ShoppingList;
