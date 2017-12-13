import React, {Component} from 'react';
import axios from 'axios';
import NotificationSystem from 'react-notification-system';


let vex = require('vex-js');
vex.defaultOptions.className = 'vex-theme-os';

class AddItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: '',
        };

    }

    componentDidMount() {
        this.setState({notificationSystem: this.refs.notificationSystem});
    }

    handleSubmit = (name, price) => {

        axios.post(`http://127.0.0.1:5000/v2/shoppinglist/${this.props.list_id}/items/`,
            {
                name: name,
                price: price,
            }, {
                headers: {'Content-Type': 'application/json', Authorization: "Bearer " + localStorage.getItem('token')}
            })

            .then((response) => {
                let data = response.data;
                if (response.status === 201) {
                    this.props.onAdd(data.name, data.price, data.id);
                    this.setState({
                        name: "",
                        price: "",
                        modalIsOpen: false

                    });
                    this.state.notificationSystem.addNotification({
                        message: response.data.message,
                        level: 'success',
                        position: 'tc'
                    });


                }
            })
            .catch((error) => {
                if (error.response.data.message === 'Item price should be an integer') {
                    this.state.notificationSystem.addNotification({
                        message: error.response.data.message,
                        level: 'error',
                        position: 'tc'
                    });
                } else {
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
            message: 'New Shopping List Item',
            input: [

                '<input name="name" type="text" placeholder="Enter name" required    />',
                '<input name="price" type="text" placeholder="Price here" required  />'


            ].join(''),

            callback: (data) => {
                if (!data) {
                    console.log('Cancelled')
                } else {
                    this.handleSubmit(data.name, data.price)

                }
            }
        })

    };


    render() {
        return (

            <div className="container">
                <button className=" items btn btn-primary btn-sm" onClick={this.openModal}>Create
                    New Item
                </button>
                <NotificationSystem ref="notificationSystem"/>
            </div>
        );
    }
}


export default AddItem;

