import React, {Component} from 'react';
import PropTypes from 'prop-types';


class TableContents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false
        };
    }

    renderEdit() {
        if (this.state.isEdit) {
            return (
                <div>
                    <td>
                        <button className="text-center">SAVE</button>
                    </td>
                    <td>
                        <button className="text-right" onClick={this.onCancelClick.bind(this)} >CANCEL</button>
                    </td>
                </div>
            )

        }
        return (
            <div>
                <td>
                    <button className="text-center" onClick={this.onEdit.bind(this)}>EDIT</button>
                </td>
                <td>
                    <button className="text-right" onClick={this.props.onRemove}>DELETE</button>
                </td>
            </div>
        )
    }
    onEdit(){
        this.setState({
            isEdit: true
        })
    }
     onCancelClick(){
        this.setState({
            isEdit: false
        })
    }


    render() {
        return (
            <tr>
                <td>{this.props.title}</td>
                <td>{this.props.description}</td>
                {this.renderEdit()}
            </tr>
        );
    }
}

TableContents.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onRemove: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired

};


export default TableContents;