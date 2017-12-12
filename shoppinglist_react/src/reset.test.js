import moxios from 'moxios';
import {mount, shallow} from 'enzyme';
import React from 'react';
import "./utils";
import ResetPassword from './components/auth/reset_password'


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

        it('stub response for reseting password', function (done) {
            let url = JSON.parse('{"params":{"token":"sthii"}}');
            const reset = mount(<ResetPassword match={url}/>);

            reset.state().email = 'chris@gmail.com';
            reset.state().new_password = '12345';
            reset.state().confirm_password = '12345';

            reset.instance().handleReset({
                preventDefault() {
                }
            });
            moxios.stubRequest('http://127.0.0.1:5000/auth/reset_password/sthii', {
                status: 200,
                response: {message: "Password has been reset"}
            });

            moxios.wait(function () {
                expect(reset.html()).toContain("Password has been reset");
                done()
            })

        });


        it('Changes email state when on change event is called', () => {
            const reset = shallow(<ResetPassword/>);
            const inputEmail = reset.find("input[name='email']");
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
            expect(reset.state().email).toBe(event.target.value);
        });
    }

});

