import React from 'react';
import expect from 'expect';
import renderer from 'react-test-renderer';
import "./setup_test"
import Items from "./components/items/items";
import AddItem from "./components/items/additem";
import ItemContents from "./components/items/itemcontents";


describe('Shopping list components', () => {

    it('renders correctly', () => {
        let match = {params: {id: 1}};
        const tree = renderer.create(<Items match={match}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly', () => {
        const tree = renderer.create(<AddItem/>).toJSON();
        expect(tree).toMatchSnapshot();

    });

    it('renders correctly', () => {
        let list = {id: 1, name: "Cece", price: 10};
        const tree = renderer.create(<ItemContents list={list}/>).toJSON();
        expect(tree).toMatchSnapshot();

    });

});

