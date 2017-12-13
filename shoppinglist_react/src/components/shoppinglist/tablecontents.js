import React from 'react';
import BaseComponent from '../base';


let vex = require('vex-js');
vex.defaultOptions.className = 'vex-theme-os';

class TableContents extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',

        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    handleSubmit(name, description) {
        this.props.onEdit(this.props.id, name, description);

        this.setState({
            name: name,
            description: description,
        });
    };

    componentDidMount() {
        this.setState({
            name: this.props.list.name,
            description: this.props.list.description,

        })
    }

    openModal() {
        let component = this;
        let name1 = component.props.list.name;
        let description1 = component.props.list.description;
        let listId = component.props.list.id;

        vex.dialog.buttons.YES.text = 'Save';
        vex.dialog.buttons.NO.text = 'Cancel';
        vex.dialog.open({
            message: 'Edit Shopping List',
            input: [

                '<input name="name" type="text" value="' + name1 + '" required data-id2="' + listId + '"   />',
                '<input name="description" type="text" value="' + description1 + '"  required  />'


            ].join(''),

            callback: function (data) {
                if (!data) {
                    console.log('Cancelled')
                } else {
                    console.log('name', data.name, 'Description', data.description);
                    component.handleSubmit(data.name, data.description)

                }
            }
        })

    }

    render() {
        let id = this.props.list.id;
        return (
            <tr>

                <td><a href={`/v2/shoppinglist/${id}/items/`} onClick={this.props.onlink}> {this.props.list.name}</a>
                </td>
                <td>{this.props.list.description}</td>
                <td>
                    <button className="text-center btn btn-primary btn-sm"
                            onClick={this.openModal}>EDIT
                    </button>
                </td>
                <td>
                    <button className="text-right btn btn-danger btn-sm" data-id={this.props.list.id}
                            onClick={this.props.onRemove}>DELETE
                    </button>
                </td>
            </tr>
        );
    }
}


export default TableContents;