import React, {Component} from 'react';
import TableContents from './tablecontents';
import PropTypes from 'prop-types';


class TableBody extends Component {


    render() {
        return (
            <TableContents title={this.props.title} description={this.props.description}/>

        );
    }
}


TableBody.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired

};


export default TableBody;