import React from 'react';
import PropTypes from 'prop-types';
const Stats = props => {
    const totallists = props.lists.length;

    return (
        <h1 className="items">Lists: {totallists}</h1>
    )

};

Stats.propTypes = {
    lists: PropTypes.array.isRequired
};

export default Stats;