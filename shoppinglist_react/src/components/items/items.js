import React, {Component} from 'react';
import Header from "../header";
import AddItem from './additem';
import axios from 'axios';
import ItemContents from "./itemcontents";
import {Pagination} from 'react-bootstrap';
import NotificationSystem from 'react-notification-system';


let vex = require('vex-js');
vex.defaultOptions.className = 'vex-theme-os';
let shoppinglists_items = [];


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
            notificationSystem: null
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

        return axios.get(`http://127.0.0.1:5000/v2/shoppinglist/${this.props.match.params.id}/items/?` + p + search_string, {
            headers: {'Content-Type': 'application/json', Authorization: "Bearer " + localStorage.getItem('token')}
        })
            .then(response => {
                    return response.data
                }
            )
            .catch((error) => {
                if (error.response.status === 404) {
                    this.setState({notificationSystem: this.refs.notificationSystem, });
                    this.state.notificationSystem.addNotification({
                        message: 'No shopping lists have been found',
                        level: 'error',
                        position: 'tc'
                    });
                }
            });
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
        this.setState({notificationSystem: this.refs.notificationSystem});
        this.getShoppingListItems(1, "");
        this.setState({list_id: this.props.match.params.id});

    }

    openModal(event) {
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

                    component.onRemoveItem(e);
                }
            }
        });

    }

    onRemoveItem(e) {
        let event = e;
        axios.delete(`http://127.0.0.1:5000/v2/shoppinglist/${this.props.match.params.id}/items/` + event.getAttribute('data-id2'), {
            headers: {Authorization: "Bearer " + localStorage.getItem('token')}

        })
            .then(response => {
                    let index = this.state.items.Shoppinglists_Items.findIndex(item => item.id == event.getAttribute('data-id2'));
                    this.state.items.Shoppinglists_Items.splice(index, 1);
                    this.setState({notificationSystem: this.refs.notificationSystem});

                    this.state.notificationSystem.addNotification({
                        message: 'Shopping list item has been deleted',
                        level: 'success',
                        position: 'tc'
                    });
                    this.setState(this.state);

                    if (this.state.items.Shoppinglists_Items.length !== 0) {
                        this.getShoppingListItems(this.state.activePage)
                    }

                    return response.data
                }
            )
            .catch(err => console.log(err));

    }


    onItemEdit(id, name, price) {
        axios.put(`http://127.0.0.1:5000/v2/shoppinglist/${this.props.match.params.id}/items/` + id, '{ "name": "' + name + '", "price": "' + price + '"}',
            {
                headers: {Authorization: "Bearer " + localStorage.getItem('token'), "Content-Type": "application/json"},
            })

            .then(response => {
                let index = this.state.items.Shoppinglists_Items.findIndex(x => x.id == id);
                this.state.items.Shoppinglists_Items.map((item, sidx) => {
                    if (index !== sidx) return item;
                    return {...item};
                });
                this.setState({notificationSystem: this.refs.notificationSystem});
                this.state.notificationSystem.addNotification({
                    message: 'Shopping list item has been edited',
                    level: 'success',
                    position: 'tc'
                });

                this.setState(this.state);
                this.getShoppingListItems(1, "");
                return response.data
            })

            .catch((error) => {
                console.log(error.response.data);
                this.setState({notificationSystem: this.refs.notificationSystem});

                if (error.response.status === 400) {
                    if (error.response.data.message === 'Item price should be an integer') {
                        this.state.notificationSystem.addNotification({
                            message: 'Item price should be an integer',
                            level: 'error',
                            position: 'tc'
                        });
                    } else {
                        this.state.notificationSystem.addNotification({
                            message: 'Wrong name format. Name cannot contain special characters or start with a space',
                            level: 'error',
                            position: 'tc'
                        });
                    }

                }

            });

        // this.getShoppingListItems(this.state.activePage)
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

    }


    handleSelect(e) {
        this.setState({activePage: e});
        this.getShoppingListItems(e)
    }


    render() {

        if (!this.state.items.Shoppinglists_Items.length) {
            return this.noItems();
        }

        let totalPages = Math.ceil(this.state.totalItems / this.state.itemsPerPage);
        let searchPages = Math.ceil(this.state.search_count / this.state.itemsPerPage);

        return (

            <div className="container">

                <Header/>
                <AddItem onAdd={this.onItemAdd.bind(this)} list_id={this.state.list_id}/>
                <NotificationSystem ref="notificationSystem"/>
                <form className="input-group col-4 offset-8" onSubmit={this.handleSubmit.bind(this)}>
                    <span className="input-group-addon">Search Name</span>
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
                        <ItemContents onRemove={this.openModal.bind(this)}
                                      list={item}
                                      id={item.id}

                                      key={item.id} onEdit={this.onItemEdit.bind(this)}/>)) : 'No items found'}

                    </tbody>
                </table>
                <Pagination
                    bsSize="medium"
                    items={this.state.search_count ? searchPages : totalPages}
                    activePage={this.state.activePage}
                    onSelect={this.handleSelect.bind(this)}
                    className='justify-content-center'
                />
            </div>

        );
    }
}

export default Items;
