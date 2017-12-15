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

    handleSubmit = (name, description) => {
        axios.post(`${this.baseURL}/v2/shoppinglist/`,
            {
                name: name,
                description: description,
            }, this.authHeader()
        )

            .then((response) => {
                let data = response.data;
                if (response.status === 201) {
                    this.props.onAdd(data.name, data.description, data.id);
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

            .catch((error) => {
                if (error.response.data.message) {
                    this.state.notificationSystem.addNotification({
                        message: error.response.data.message,
                        level: 'error',
                        position: 'tc'
                    });
                }
            });
    };

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

