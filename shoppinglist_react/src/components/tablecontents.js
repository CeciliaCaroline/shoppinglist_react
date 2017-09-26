import React, {Component} from 'react';
import PropTypes from 'prop-types';


class TableContents extends Component {


    render() {
        return (
            <tr>
                <td>{this.props.title}</td>
                <td>{this.props.description}</td>
                <td>
                    <a href="/" className="text-center">EDIT</a>
                </td>
                <td>
                    <a href="/" className="text-right">DELETE</a>
                </td>
            </tr>
        );
    }
}

TableContents.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired

};


export default TableContents;