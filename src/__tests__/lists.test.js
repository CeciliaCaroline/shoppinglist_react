import React from 'react';
import expect from 'expect';
import renderer from 'react-test-renderer';
import ShoppingList from "../components/shoppinglist/shoppinglist";
import AddList from "../components/shoppinglist/addlist";
import TableContents from "../components/shoppinglist/tablecontents";
import "../setup_test"


describe('Shopping list components', () => {

    it('list renders correctly', () => {
        localStorage.setItem('token', 'sthii');
        const list = renderer.create(<ShoppingList/>).toJSON();
        expect(list).toMatchSnapshot();
    });

    it('add list renders correctly', () => {
        const addList = renderer.create(<AddList/>).toJSON();
        expect(addList).toMatchSnapshot();

    });

    it('table contents renders correctly', () => {
        let list = {id: 1, name: "Cece", description: "Ceces boys"};
        const table = renderer.create(<TableContents list={list}/>).toJSON();
        expect(table).toMatchSnapshot();

    });

});

