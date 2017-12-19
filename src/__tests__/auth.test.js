import React from 'react';
import expect from 'expect';
import renderer from 'react-test-renderer';
import Register from "../components/auth/register";
import Login from "../components/auth/login";
import SendEmail from "../components/auth/email_send";
import ResetPassword from "../components/auth/reset_password";
import Header from "../components/header";
import "../setup_test";


describe('Authentication components', () => {

    it('renders correctly', () => {
        const register = renderer.create(<Register/>).toJSON();
        expect(register).toMatchSnapshot();
    });

    it('renders correctly', () => {
        const login = renderer.create(<Login/>).toJSON();
        expect(login).toMatchSnapshot();

    });
    it('renders correctly', () => {
        const sendEmail = renderer.create(<SendEmail/>).toJSON();
        expect(sendEmail).toMatchSnapshot();

    });
    it('renders correctly', () => {
        const reset = renderer.create(<ResetPassword/>).toJSON();
        expect(reset).toMatchSnapshot();
    });
    it('renders correctly', () => {
        const header = renderer.create(<Header/>).toJSON();
        expect(header).toMatchSnapshot();
    });
});

