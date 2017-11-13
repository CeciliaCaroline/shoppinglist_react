import React, {Component} from 'react';
import AddList from "./addlist";
import Header from "../header";
import TableContents from "./tablecontents";
import axios from 'axios';
import {Pagination} from 'react-bootstrap';
import NotificationSystem from 'react-notification-system';


let shoppingLists = [];

const head = {
    headers: {'Content-Type': 'application/json', Authorization: "Bearer " + localStorage.getItem('token')}
};


class ShoppingList extends Component {

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
        this.setState({notificationSystem: this.refs.notificationSystem});
        this.getShoppingLists(1, "");
        console.log(this.refs.notificationSystem);
        console.log(this.state)
    }

    getLists(page, search_string = "") {
        let p = new URLSearchParams();
        p.append('page', page || 1);
        if (search_string && search_string.trim() !== "") {
            search_string = "&q=" + search_string
        } else {
            search_string = ""
        }

        return axios.get(`http://127.0.0.1:5000/v2/shoppinglist/?` + p + search_string, head)
            .then(response => {
                    return response.data
                }
            )
            .catch(err => console.log(err));
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


                });

            })
            .catch(err => console.log(err));
    }


    onListAdd(name, description, id) {

        console.log('lists', this.state.lists);
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

    onListEdit(id, name, description) {
        axios.put(`http://127.0.0.1:5000/v2/shoppinglist/` + id, '{ "name": "' + name + '", "description": "' + description + '"}',
            {
                headers: {Authorization: "Bearer " + localStorage.getItem('token'), "Content-Type": "application/json"},


            })

            .then(response => {
                let index = this.state.lists.ShoppingLists.findIndex(x => x.id == id);
                this.state.lists.ShoppingLists.map((list, sidx) => {
                    if (index !== sidx) return list;
                    return {...list};
                });
                this.setState({notificationSystem: this.refs.notificationSystem});
                this.state.notificationSystem.addNotification({
                    message: 'Shopping list has been updated',
                    level: 'success',
                });

                this.setState(this.state);
                this.getShoppingLists(1, "");
                return response.data
            })
            .catch((error) => {
                if (error.response.status === 400) {

                    this.state.notificationSystem.addNotification({
                        message: 'Wrong name format. Name cannot contain special characters or start with a space',
                        level: 'error',
                        position: 'tc'
                    });
                }
            });
    };

    onRemoveList(e) {
        e.persist();
        let event = e;
        axios.delete(`http://127.0.0.1:5000/v2/shoppinglist/` + event.target.getAttribute('data-id'), {
            headers: {Authorization: "Bearer " + localStorage.getItem('token')}


        })
            .then(response => {
                    alert("Are you sure you want to delete this list?");
                    let index = this.state.lists.ShoppingLists.findIndex(x => x.id == event.target.getAttribute('data-id'));

                    this.state.lists.ShoppingLists.splice(index, 1);
                    if (response.status === 200) {
                        this.setState({notificationSystem: this.refs.notificationSystem});

                        this.state.notificationSystem.addNotification({
                            message: 'Shopping list has been deleted',
                            level: 'success',
                            position: 'tc'
                        });
                    }

                    this.setState(this.state);
                    if (this.state.lists.ShoppingLists.length !== 0) {
                        this.getShoppingLists(this.state.activePage)
                    }

                    console.log(this.state);
                    return response.data
                }
            )
            .catch(err => console.log(err));
    }

    updateSearch(event) {
        this.setState({search: event.target.value.substr(0, 20)})

    }

    handleSubmit(event) {
        event.preventDefault();
        this.getShoppingLists(1, this.state.search)
    }

    handleSelect(e) {
        console.log('handle select', e);
        this.setState({activePage: e});
        this.getShoppingLists(e)
    }


    render() {
        if (!this.state.lists.ShoppingLists.length) {
            return this.noLists();
        }


        let totalPages = Math.ceil(this.state.totalItems / this.state.itemsPerPage);

        let searchPages = Math.ceil(this.state.search_count / this.state.itemsPerPage);
        console.log('total pages', totalPages);
        console.log('search pages', searchPages);
        console.log('count', this.state.totalItems);
        console.log('search_count', this.state.search_count);
        console.log('items per page', this.state.itemsPerPage);


        return (

            <div className="container">
                <Header/>
                <AddList onAdd={this.onListAdd.bind(this)}/>
                <NotificationSystem ref="notificationSystem"/>
                <form className="input-group col-4 offset-8" onSubmit={this.handleSubmit.bind(this)}>
                    <span className="input-group-addon input-group-sm" id="btnGroupAddon">Search</span>
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
                        <TableContents onRemove={this.onRemoveList.bind(this)}
                                       list={list}

                                       key={list.id} onEdit={this.onListEdit.bind(this)}/>)) : 'Not Found'}

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


export default ShoppingList;
