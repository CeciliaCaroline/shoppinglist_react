import moxios from 'moxios';
import {mount, configure,shallow} from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import "./setup_test";
import Login from '../components/auth/login'


configure({adapter: new Adapter()});

describe('mocking login requests', function () {
    describe('notification sent after login', function () {
        beforeEach(function () {
            // import and pass your custom axios instance to this method
            moxios.install()
        });

        afterEach(function () {
            // import and pass your custom axios instance to this method
            moxios.uninstall()
        });

        it('stub response for successful login', function (done) {
            const login = mount(<Login/>);

            login.state().email = 'chris@gmail.com';
            login.state().password = 'chris';

            login.instance().login({
                preventDefault() {
                }
            });
            moxios.stubRequest('http://127.0.0.1:5000/auth/login', {
                status: 200,
                response: {auth_token: "sthii", message: "Successfully logged in", status: "success"}
            });

            moxios.wait(function () {
                expect(login.html()).toContain("Successfully logged in");

                done()
            })

        });

        it('stub response for 400 response', function (done) {
            const login = mount(<Login/>);

            login.state().email = 'chrisgmail.com';
            login.state().password = 'chri';


            login.instance().login({
                preventDefault() {
                }
            });
            moxios.stubRequest('http://127.0.0.1:5000/auth/login', {
                status: 400,
                response: {auth_token: "sth", message: "Missing or wrong email format or password is less than five characters", status: "failed"}
            });

            moxios.wait(function () {
                expect(login.html()).toContain("Missing or wrong email format or password is less than five characters");

                done()
            })

        });

        it('stub response for 403 response', function (done) {
            const login = mount(<Login/>);

            login.state().email = 'chris1@gmail.com';
            login.state().password = 'chris';
            login.instance().login({
                preventDefault() {
                }
            });


            moxios.stubRequest('http://127.0.0.1:5000/auth/login', {
                status: 403,
                response: {auth_token: "sth", message: "User does not exist or password is incorrect", status: "failed"}
            });

            moxios.wait(function () {
                expect(login.text()).toContain("User does not exist or password is incorrect");

                done()
            })

        });

         it('Changes email state when on change event is called', () => {
            const login = shallow(<Login/>);
            const inputEmail = login.find("input[name='email']");
            const event = {
                target: {
                    name: 'email',
                    value: 'chris@gmail.com'
                },
                preventDefault: () => {
                    return true
                }
            };
            inputEmail.simulate('change', event);
            expect(login.state().email).toBe(event.target.value);

        })

    })

});

