import React, {Component} from 'react';
import axios from 'axios'
import NotificationSystem from 'react-notification-system';

let vex = require('vex-js');
vex.registerPlugin(require('vex-dialog'));
vex.defaultOptions.className = 'vex-theme-os';

class AddList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    componentDidMount() {
        this.setState({notificationSystem: this.refs.notificationSystem});
    }

    handleSubmit(name, description) {

        axios.post(`http://127.0.0.1:5000/v2/shoppinglist/`,
            {
                name: name,
                description: description,
            }, {
                headers: {'Content-Type': 'application/json', Authorization: "Bearer " + localStorage.getItem('token')}
            })


            .then((response) => {

                let data = response.data;
                if (response.status === 201) {
                    this.props.onAdd(data.name, data.description, data.id);
                    this.state.notificationSystem.addNotification({
                        message: 'Shopping list has been created',
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
                if (error.response.status === 403) {
                    this.state.notificationSystem.addNotification({
                        message: 'No name or description input. Try again',
                        level: 'error',
                        position: 'tc'
                    });
                }

                if (error.response.status === 400) {
                    this.state.notificationSystem.addNotification({
                        message: 'Wrong name format. Name cannot contain special characters or be empty',
                        level: 'error',
                        position: 'tc'
                    });
                }
            });
    };

    openModal() {

        let component = this;

        vex.dialog.buttons.YES.text = 'Save';
        vex.dialog.buttons.NO.text = 'Cancel';
        vex.dialog.open({
            message: 'New Shopping List',
            input: [

                '<input name="name" type="text" placeholder="Enter name" required    />',
                '<input name="description" type="text" placeholder="Description here" required  />'


            ].join(''),

            callback: function (data) {
                if (!data) {
                    console.log('Cancelled')
                } else {
                    component.handleSubmit(data.name, data.description)

                }
            }
        })

    }


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

