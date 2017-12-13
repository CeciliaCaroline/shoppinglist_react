import React from 'react';
import ReactDOM from 'react-dom';
import { render, shallow} from 'enzyme';
import expect from 'expect';
import App from "./components/App";
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import "./setup_test";


// configure({adapter: new Adapter()});


describe('App component', () => {
    it('it renders app component', () => {

        const wrapper = render(<BrowserRouter
        ><App/>
        </BrowserRouter>);
        expect(wrapper.find('div').length).toEqual(8);

    });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App/>, div);
    });

    it('shallow renders without crashing', () => {
        shallow(<App/>);
    });

    it('renders correctly', () => {
        const tree = renderer.create(<App/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

