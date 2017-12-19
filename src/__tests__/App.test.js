import React from 'react';
import ReactDOM from 'react-dom';
import {render, shallow} from 'enzyme';
import expect from 'expect';
import App from "../components/App";
import renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import "../setup_test";


describe('App component', () => {
    it('it renders app component', () => {

        const wrapper = render(<BrowserRouter><App/>
        </BrowserRouter>);
        expect(wrapper.find('div').length).toEqual(9);

    });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App/>, div);
    });

    it('shallow renders without crashing', () => {
        shallow(<App/>);
    });

    it('renders correctly', () => {
        const app = renderer.create(<App/>).toJSON();
        expect(app).toMatchSnapshot();
    });
});

