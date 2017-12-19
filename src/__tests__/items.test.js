import React from 'react';
import expect from 'expect';
import renderer from 'react-test-renderer';
import "../setup_test"
import Items from "../components/items/items";
import AddItem from "../components/items/additem";
import ItemContents from "../components/items/itemcontents";


describe('Shopping list components', () => {

    it('renders correctly', () => {
        let match = {params: {id: 1}};
        const items = renderer.create(<Items match={match}/>).toJSON();
        expect(items).toMatchSnapshot();
    });

    it('renders correctly', () => {
        const additem = renderer.create(<AddItem/>).toJSON();
        expect(additem).toMatchSnapshot();

    });

    it('renders correctly', () => {
        let list = {id: 1, name: "Cece", price: 10};
        const itemContents = renderer.create(<ItemContents list={list}/>).toJSON();
        expect(itemContents).toMatchSnapshot();

    });

});

