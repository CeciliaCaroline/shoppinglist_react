import React from 'react';
import expect from 'expect';
import renderer from 'react-test-renderer';
import ShoppingList from "./components/shoppinglist/shoppinglist";
import AddList from "./components/shoppinglist/addlist";
import TableContents from "./components/shoppinglist/tablecontents";
import "./utils"



describe('Shopping list components', () => {

    it('renders correctly', () => {
        const tree = renderer.create(<ShoppingList/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly', () => {
        const tree = renderer.create(<AddList/>).toJSON();
        expect(tree).toMatchSnapshot();

    });

    it('renders correctly', () => {
        let list = {id: 1, name: "Cece", description: "Ceces boys"};
        const tree = renderer.create(<TableContents list={list} />).toJSON();
        expect(tree).toMatchSnapshot();

    });

});

