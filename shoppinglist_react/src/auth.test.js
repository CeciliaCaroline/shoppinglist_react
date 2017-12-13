import React from 'react';
import expect from 'expect';
import renderer from 'react-test-renderer';
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import SendEmail from "./components/auth/email_send";
import ResetPassword from "./components/auth/reset_password";
import Header from "./components/header";
import "./setup_test";


describe('Authentication components', () => {

    it('renders correctly', () => {
        const tree = renderer.create(<Register/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly', () => {
        const tree = renderer.create(<Login/>).toJSON();
        expect(tree).toMatchSnapshot();

    });
    it('renders correctly', () => {
        const tree = renderer.create(<SendEmail/>).toJSON();
        expect(tree).toMatchSnapshot();

    });
    it('renders correctly', () => {
        const tree = renderer.create(<ResetPassword/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('renders correctly', () => {
        const tree = renderer.create(<Header/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});

