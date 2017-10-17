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

    constructor(props,) {
        super(props);
        this.state = {
            lists: [],
            search: '',
            // itemsPerPage: 1,
            activePage: 1,
            count: 1,
            isSearch: false,

        };

    }

    getLists(page) {
        let p = new URLSearchParams();
        p.append('page', page || 1);
        console.log(`http://127.0.0.1:5000/shoppinglist/?` + p);

        return axios.get(`http://127.0.0.1:5000/shoppinglist/?` + p, head)
            .then(response => {

                    return response.data
                }
            )
            .catch(err => console.log(err));
    };

    getShoppingLists(pageNum) {
        this.getLists(pageNum)
            .then((allshoppingLists) => {
                shoppingLists = allshoppingLists;
                console.log('data', shoppingLists);
                this.setState({
                    lists: shoppingLists,
                    // activePage: shoppingLists.page,
                    totalItems: shoppingLists.total_count,
                    itemsPerPage: shoppingLists.limit,


                })
                console.log(this.state.totalItems)
            })
            .catch(err => console.log(err))
        // console.log(this.state.lists.length)
        console.log(this.state.lists)
    }

    componentDidMount() {
        this.getShoppingLists(1)
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

    onListEdit(id, name, description) {

        axios.put(`http://127.0.0.1:5000/shoppinglist/` + id,
            {
                headers: {Authorization: "Bearer " + localStorage.getItem('token'), "Content-Type": "application/json"},
                body: {name: name, description: description}
            })

            .then(response => {
                let index = this.state.lists.Shoppinglists.findIndex(x => x.id == id);
                console.log(index);
                this.state.lists.Shoppinglists.map((list, sidx) => {
                    if (index !== sidx) return list;
                    return {...list};
                });

                this.setState(this.state);
                return response.data
            });
    };

    onRemoveList(e) {
        e.persist();
        let event = e;
        axios.delete(`http://127.0.0.1:5000/shoppinglist/` + event.target.getAttribute('data-id'), {
            headers: {Authorization: "Bearer " + localStorage.getItem('token'), "Content-Type": "application/json"}

        })
            .then(response => {
                    alert("Are you sure you want to delete this list?");
                    let index = this.state.lists.Shoppinglists.findIndex(x => x.id == event.target.getAttribute('data-id'));
                    console.log(index);
                    this.state.lists.Shoppinglists.splice(index, 1);
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

    handleSelect(e) {
        console.log('handle select', e);
        this.setState({activePage: e});
        this.getShoppingLists(e)
    }


    render() {
        if (this.state.lists.length === 0) {
            return this.noBuckets();
        }
        let filteredlists = this.state.lists.Shoppinglists.filter(
            (list) => {

                return list.name.indexOf(this.state.search) !== -1;

            }
        );

        let search = this.state.search
        if (search) {
            console.log('filtered', filteredlists)
        }

        let totalPages = Math.ceil(this.state.totalItems / this.state.itemsPerPage);
        console.log(totalPages);
        console.log('count', this.state.totalItems);
        console.log('items per page', this.state.itemsPerPage);

        return (

            <div className="container">
                <Header/>
                <AddList onAdd={this.onListAdd.bind(this)}/>
                <div className="input-group col-4 offset-8">
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
                </div>

                <table className="table items table-hover table-striped">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th colSpan="2">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredlists.map((list) => (
                        <TableContents onRemove={this.onRemoveList.bind(this)}
                                       list={list}

                                       key={list.id} onEdit={this.onListEdit.bind(this)}/>))}

                    </tbody>
                </table>
                <Pagination
                    bsSize="medium"
                    items={totalPages}
                    activePage={this.state.activePage}
                    onSelect={this.handleSelect.bind(this)}
                />


            </div>

        );
    }
}


export default ShoppingList;
