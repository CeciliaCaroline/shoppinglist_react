import moxios from 'moxios';
import {mount, configure, shallow} from 'enzyme';
import React from 'react';
import "./utils";
import Register from './components/auth/register'





describe('mocking register requests', function () {
    describe('notification sent after registration', function () {
        beforeEach(function () {
            // import and pass your custom axios instance to this method
            moxios.install()
        });

        afterEach(function () {
            // import and pass your custom axios instance to this method
            moxios.uninstall()
        });

        it('stub response for successful register', function (done) {
            const register = mount(<Register/>);

            register.state().email = 'chris@gmail.com';
            register.state().password = 'chris';
            register.state().username = 'chrismaina';

            register.instance().register({
                preventDefault() {
                }
            });
            moxios.stubRequest('http://127.0.0.1:5000/auth/register', {
                status: 201,
                response: {auth_token: "sth", message: "Successfully registered", status: "success"}
            });

            moxios.wait(function () {
                expect(register.text()).toContain("Successfully registered");

                done()
            })

        });

        it('stub response for 400 response', function (done) {
            const register = mount(<Register/>);

            register.state().email = 'chrisgmail.com';
            register.state().password = 'chris';
            register.state().username = 'chrismaina';

            register.instance().register({
                preventDefault() {
                }
            });
            moxios.stubRequest('http://127.0.0.1:5000/auth/register', {
                status: 400,
                response: {
                    auth_token: "sth",
                    message: "Missing or wrong email format or password is less than five characters",
                    status: "failed"
                }
            });

            moxios.wait(function () {
                expect(register.text()).toContain("Missing or wrong email format or password is less than five characters");

                done()
            })

        });

        it('stub response for 403 response', function (done) {
            const register = mount(<Register/>);

            register.state().email = 'chris@gmail.com';
            register.state().password = 'chris';
            register.state().username = 'chrismaina';
            register.instance().register({
                preventDefault() {
                }
            });


            moxios.stubRequest('http://127.0.0.1:5000/auth/register', {
                status: 403,
                response: {auth_token: "sth", message: "User already exists, Please sign In", status: "failed"}
            });

            moxios.wait(function () {
                expect(register.text()).toContain("User already exists, Please sign In");

                done()
            })

        });

        it('Changes email state when on change event is called', () => {
            const register = shallow(<Register/>);
            const inputEmail = register.find("input[name='email']");
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
            expect(register.state().email).toBe(event.target.value);

        })

    })

});

