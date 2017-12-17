import React from 'react';
import axios from 'axios'
import NotificationSystem from 'react-notification-system';
import BaseComponent from '../base';


let vex = require('vex-js');
vex.registerPlugin(require('vex-dialog'));
vex.defaultOptions.className = 'vex-theme-os';

class AddList extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
        };
    }
     // event handler for new shopping list form submission
    handleSubmit = (name, description) => {
        axios.post(`${this.baseURL}/v2/shoppinglist/`,
            {
                name: name,
                description: description,
            }, this.authHeader()
        )
            //returns a promise
            .then((response) => {
                let data = response.data;
                if (response.status === 201) {
                    this.props.onAdd(data.name, data.description, data.id);

                    //display response message as notification
                    this.state.notificationSystem.addNotification({
                        message: response.data.message,
                        level: 'success',
                        position: 'tc'
                    });
                    this.setState({
                        name: "",
                        description: "",
                    });
                }
            })

            //returns promise
            .catch((error) => {
                if (error.response.data.message) {
                    //display error response message as notification
                    this.state.notificationSystem.addNotification({
                        message: error.response.data.message,
                        level: 'error',
                        position: 'tc'
                    });
                }
            });
    };

    //modal for adding new shopping list
    openModal = () => {
        vex.dialog.buttons.YES.text = 'Save';
        vex.dialog.buttons.NO.text = 'Cancel';
        vex.dialog.open({
            message: 'New Shopping List',
            input: [

                '<input name="name" type="text" placeholder="Enter name" required    />',
                '<input name="description" type="text" placeholder="Description here" required  />'

            ].join(''),

            callback: (data) => {
                if (data) {
                    this.handleSubmit(data.name, data.description)
                }
            }
        })
    };


    render() {
        return (

            <div className="container">
                <button className=" items btn btn-primary btn-sm " onClick={this.openModal}>Create
                    New List
                </button>
                <NotificationSystem ref="notificationSystem"/>

            </div>
        );
    }
}


export default AddList;

