import React, { Component } from 'react';
import BaseComponent from '../base';



let vex = require('vex-js');
vex.defaultOptions.className = 'vex-theme-os';


class ItemContents extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: '',
        };
    }

    handleSubmit = (name, price) => {

        this.props.onEdit(this.props.id, name, price);
        this.setState({
            name: name,
            price: price,
        });

    };

    componentDidMount() {
        this.setState({
            name: this.props.list.name,
            price: this.props.list.price,
        })
    }

    openModal = () => {

        let editName = this.props.list.name;
        let editPrice = this.props.list.price;
        let itemId = this.props.list.id;

        vex.dialog.buttons.YES.text = 'Save';
        vex.dialog.buttons.NO.text = 'Cancel';
        vex.dialog.open({
            message: 'Edit Shopping List Item',
            input: [

                '<input name="name" type="text" value="' + editName + '" required data-id2="' + itemId + '"   />',
                '<input name="price" type="text" value="' + editPrice + '"  required  />'

            ].join(''),

            callback: (data) => {
                if (data) {
                    this.handleSubmit(data.name, data.price)
                }
            }
        })
    };


    render() {

        return (

            <tr>
                <td> {this.props.list.name}</td>
                <td>{this.props.list.price}</td>
                <td>
                    <button className="text-center btn btn-primary btn-sm"
                            onClick={this.openModal}>EDIT
                    </button>
                </td>
                <td>
                    <button className="text-right btn btn-danger btn-sm" data-id2={this.props.list.id}
                            onClick={this.props.onRemove}>DELETE
                    </button>
                </td>

            </tr>
        );
    }
}


export default ItemContents;