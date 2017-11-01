import React, {Component} from 'react';
import AddList from "./addlist";
import Header from "./header";
import TableContents from "./tablecontents";
import axios from 'axios';
import {Pagination} from 'react-bootstrap';


let shoppingLists = [];

const head = {
    headers: {'Content-Type': 'application/json', Authorization: "Bearer " + localStorage.getItem('token')}
};


class ShoppingList extends Component {
    nextId = 1;

    constructor(props) {
        super(props);
        this.state = {
            lists: [],
            search: '',
            activePage: 1,
            // count: 1,
            isSearch: false,

        };

    }

    getLists(page, search_string = "") {
        let p = new URLSearchParams();
        p.append('page', page || 1);
        if (search_string && search_string.trim() !== "") {
            search_string = "&q=" + search_string
        } else {
            search_string = ""
        }
        console.log(`http://127.0.0.1:5000/shoppinglist/?` + p);

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
                console.log('data', shoppingLists);
                this.setState({
                    lists: shoppingLists,
                    activePage: shoppingLists.page,
                    totalItems: shoppingLists.count,
                    itemsPerPage: shoppingLists.limit,
                    search_count: shoppingLists.search_count,


                });
                console.log(this.state.totalItems)
            })
            .catch(err => console.log(err));
        // console.log(this.state.lists.length)
        console.log(this.state.lists)
    }

    componentDidMount() {
        this.getShoppingLists(1, "")
    }

    onListAdd(name, description) {

        console.log(this.state.lists.ShoppingLists);

        this.state.lists.ShoppingLists.push(
            {
                name: name,
                description: description,
                id: this.nextId
            });
        this.setState(this.state);
        this.nextId += 1;
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
                // console.log(index);
                this.state.lists.ShoppingLists.map((list, sidx) => {
                    if (index !== sidx) return list;
                    return {...list};
                });

                this.setState(this.state);
                return response.data
            });

        this.getShoppingLists(this.state.activePage)
    };

    onRemoveList(e) {
        e.persist();
        let event = e;
        axios.delete(`http://127.0.0.1:5000/v2/shoppinglist/` + event.target.getAttribute('data-id'), {
            headers: {Authorization: "Bearer " + localStorage.getItem('token')}


        })
            .then(response => {
                    alert("Are you sure you want to delete this list?");
                    let index = this.state.lists.ShoppingLists.findIndex(x => x.id === event.target.getAttribute('data-id'));
                    console.log(index);
                    this.state.lists.ShoppingLists.splice(index, 1);
                    this.setState(this.state);
                    console.log(this.state);
                    console.log('deleted');
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
        if (this.state.lists.length === 0) {
            return this.noLists();
        }


        let totalPages = Math.ceil(this.state.totalItems / this.state.itemsPerPage);

        let searchPages = Math.ceil(this.state.search_count / this.state.itemsPerPage);
        console.log('total pages',totalPages);
        console.log('search pages',searchPages);
        console.log('count', this.state.totalItems);
        console.log('search_count', this.state.search_count);
        console.log('items per page', this.state.itemsPerPage);


        return (

            <div className="container">
                <Header/>
                <AddList onAdd={this.onListAdd.bind(this)}/>
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
                    items={(this.state.search_count !== 0) ? searchPages : totalPages}
                    activePage={this.state.activePage}
                    onSelect={this.handleSelect.bind(this)}
                />


            </div>

        );
    }
}


export default ShoppingList;
