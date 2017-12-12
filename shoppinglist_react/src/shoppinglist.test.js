import moxios from 'moxios';
import {mount, shallow} from 'enzyme';
import React from 'react';
import "./utils";
import ShoppingList from './components/shoppinglist/shoppinglist';
import AddList from "./components/shoppinglist/addlist";


describe('mocking shoppinglist requests', function () {
    describe('viewing of shopping lists', function () {
        beforeEach(function () {
            // import and pass your custom axios instance to this method
            moxios.install()
        });

        afterEach(function () {
            // import and pass your custom axios instance to this method
            moxios.uninstall()
        });

        it('stub response for viewing shoppinglists', function (done) {
            const shoppinglist = mount(<ShoppingList/>);
            const getlist = {
                "ShoppingLists": [
                    {
                        "created_on": "2017-11-16",
                        "description": "milk",
                        "id": 104,
                        "name": "Cows"
                    },
                    {
                        "created_on": "2017-11-16",
                        "description": "puppies",
                        "id": 105,
                        "name": "Dogs"
                    },
                    {
                        "created_on": "2017-11-16",
                        "description": "fgg",
                        "id": 106,
                        "name": "Vbb"
                    }
                ],
                "count": 3,
                "limit": 5,
                "name": null,
                "page": 1,
                "status": "success"
            };

            moxios.stubRequest("http://127.0.0.1:5000/v2/shoppinglist/?page=1", {
                status: 200,
                response: getlist
            });

            moxios.wait(function () {
                expect(shoppinglist.state().lists).toEqual(getlist);

                done()
            })

        });

    });

    describe('adding shopping lists', function () {
        beforeEach(function () {
            // import and pass your custom axios instance to this method
            moxios.install()
        });

        afterEach(function () {
            // import and pass your custom axios instance to this method
            moxios.uninstall()
        });

        it('stub response for adding shoppinglists', function (done) {
            const addlist = mount(<AddList onAdd={() => {}

            }/>);
            const getlist = {
                "ShoppingLists": [],
                "count": 0,
                "limit": 5,
                "name": null,
                "page": 1,
                "status": "success"
            };

            moxios.stubRequest("http://127.0.0.1:5000/v2/shoppinglist/?page=1", {
                status: 200,
                response: getlist
            });

            addlist.state().name = 'travel';
            addlist.state().description = 'travelling equipment';

            addlist.instance().handleSubmit({
                preventDefault() {
                }
            });


            moxios.stubRequest("http://127.0.0.1:5000/v2/shoppinglist/", {
                status: 201,
                response: {'name': 'travel', 'description': 'travel equipment', id: 1, message: "Shopping list has been created"},
                headers: {}
            });

            moxios.wait(function () {
                expect(addlist.html()).toContain("Shopping list has been created");

                done()
            })

        });

        it('stub response for 400 while adding shoppinglists', function (done) {
            const addlist = mount(<AddList onAdd={() => {}

            }/>);
            const getlist = {
                "ShoppingLists": [],
                "count": 0,
                "limit": 5,
                "name": null,
                "page": 1,
                "status": "success"
            };

            moxios.stubRequest("http://127.0.0.1:5000/v2/shoppinglist/?page=1", {
                status: 200,
                response: getlist
            });

            addlist.state().name = 'travel!!!';
            addlist.state().description = 'travelling equipment';

            addlist.instance().handleSubmit({
                preventDefault() {
                }
            });


            moxios.stubRequest("http://127.0.0.1:5000/v2/shoppinglist/", {
                status: 201,
                response: { message: "Wrong name format. Name cannot contain special characters or start with a space", status: 'failed'},
                headers: {}
            });

            moxios.wait(function () {
                expect(addlist.html()).toContain("Wrong name format. Name cannot contain special characters or start with a space");

                done()
            })

        });

        it('stub response for 403 while adding shoppinglists', function (done) {
            const addlist = mount(<AddList onAdd={() => {}

            }/>);
            const getlist = {
                "ShoppingLists": [],
                "count": 0,
                "limit": 5,
                "name": null,
                "page": 1,
                "status": "success"
            };

            moxios.stubRequest("http://127.0.0.1:5000/v2/shoppinglist/?page=1", {
                status: 200,
                response: getlist
            });

            addlist.state().name = ' ';
            addlist.state().description = 'travelling equipment';

            addlist.instance().handleSubmit({
                preventDefault() {
                }
            });


            moxios.stubRequest("http://127.0.0.1:5000/v2/shoppinglist/", {
                status: 201,
                response: { message: "No name or description input. Try again", status: 'failed'},
                headers: {}
            });

            moxios.wait(function () {
                expect(addlist.html()).toContain("No name or description input. Try again");

                done()
            })

        });


    });

});



