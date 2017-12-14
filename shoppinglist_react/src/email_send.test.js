import moxios from 'moxios';
import {mount, shallow} from 'enzyme';
import React from 'react';
import "./setup_test";
import SendEmail from './components/auth/email_send'


describe('mocking email send requests', function () {
    {
        beforeEach(function () {
            // import and pass your custom axios instance to this method
            moxios.install()
        });

        afterEach(function () {
            // import and pass your custom axios instance to this method
            moxios.uninstall()
        });

        it('stub response for successful email sent', function (done) {
            const send_email = mount(<SendEmail/>);

            send_email.state().email = 'chris@gmail.com';
            send_email.instance().contentHeader = () => {
            };
            send_email.instance().handleReset({
                preventDefault() {
                }
            });

            moxios.stubRequest('http://127.0.0.1:5000/auth/reset_password', {
                status: 200,
                response: {message: "Email to reset password has been sent"}

            });

            moxios.wait(function () {
                expect(send_email.html()).toContain("Email to reset password has been sent");
                done()
            })

        });


        it('Changes email state when on change event is called', () => {
            const send_email = shallow(<SendEmail/>);
            const inputEmail = send_email.find("input[name='email']");
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
            expect(send_email.state().email).toBe(event.target.value);
        });
    }

});

