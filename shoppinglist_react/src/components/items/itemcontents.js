import React, { Component } from 'react';


let vex = require('vex-js');
vex.defaultOptions.className = 'vex-theme-os';


class ItemContents extends Component {
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
            modalIsOpen: false
        });

    };

    componentDidMount() {
        this.setState({
            name: this.props.list.name,
            price: this.props.list.price,
        })
    }

    openModal = () => {

        let component = this;
        let name1 = component.props.list.name;
        let price1 = component.props.list.price;
        let itemId = component.props.list.id;

        vex.dialog.buttons.YES.text = 'Save';
        vex.dialog.buttons.NO.text = 'Cancel';
        vex.dialog.open({
            message: 'Edit Shopping List Item',
            input: [

                '<input name="name" type="text" value="' + name1 + '" required data-id2="' + itemId + '"   />',
                '<input name="price" type="text" value="' + price1 + '"  required  />'

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