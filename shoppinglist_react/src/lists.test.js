import React from 'react';
import expect from 'expect';
import renderer from 'react-test-renderer';
import ShoppingList from "./components/shoppinglist/shoppinglist";
import AddList from "./components/shoppinglist/addlist";
import TableContents from "./components/shoppinglist/tablecontents";
import "./setup_test"


describe('Shopping list components', () => {

    it('renders correctly', () => {
        const list = renderer.create(<ShoppingList/>).toJSON();
        expect(list).toMatchSnapshot();
    });

    it('renders correctly', () => {
        const addList = renderer.create(<AddList/>).toJSON();
        expect(addList).toMatchSnapshot();

    });

    it('renders correctly', () => {
        let list = {id: 1, name: "Cece", description: "Ceces boys"};
        const table = renderer.create(<TableContents list={list}/>).toJSON();
        expect(table).toMatchSnapshot();

    });

});

