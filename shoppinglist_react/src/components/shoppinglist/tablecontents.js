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
    }

    //event handler for submission of edited shopping list
    handleSubmit = (name, description) => {
        this.props.onEdit(this.props.id, name, description);

        this.setState({
            name: name,
            description: description,
        });
    };

    componentDidMount() {
        const {name, description} = this.props.list;


        this.setState({
            name,
            description,
        })
    }

    //modal to edit shopping list
    openModal = () => {
        const {name, description, id} = this.props.list;

        let editName = name;
        let editDescription = description;
        let listId = id;

        vex.dialog.buttons.YES.text = 'Save';
        vex.dialog.buttons.NO.text = 'Cancel';
        vex.dialog.open({
            message: 'Edit Shopping List',
            input: [

                '<input name="name" type="text" value="' + editName + '" required data-id2="' + listId + '"   />',
                '<input name="description" type="text" value="' + editDescription + '"  required  />'

            ].join(''),

            callback: (data) => {
                if (data) {
                    this.handleSubmit(data.name, data.description)
                }
            }
        })
    };

    render() {
        const {list, onRemove, onlink} = this.props;

        let id = list.id;
        return (
            <tr>

                <td><a href={`/v2/shoppinglist/${id}/items/`} onClick={onlink}> {list.name}</a>
                </td>
                <td>{list.description}</td>
                <td>
                    <button className="text-center btn btn-primary btn-sm"
                            onClick={this.openModal}>EDIT
                    </button>
                </td>
                <td>
                    <button className="text-right btn btn-danger btn-sm" data-id={list.id}
                            onClick={onRemove}>DELETE
                    </button>
                </td>
            </tr>
        );
    }
}


export default TableContents;