import React, {Component} from 'react';
import PropTypes from 'prop-types';


class AddList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: ''
        };

    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onAdd((this.state.title), (this.state.description));
        this.setState({
            title: "",
            description: ""
        });
        this.refs.title.value = null;
        this.refs.description.value = null;


    };


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit.bind(this)} className=" items col-md-offset-4 col-md-4 ">
                    <h2 className="text-center">Add New List</h2>

                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            required
                            ref='title'
                            onChange={event => (this.setState({title: event.target.value}))}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            type="text"
                            className="form-control"
                            id="description"
                            required
                            ref='description'
                            onChange={event => (this.setState({description: event.target.value}))}
                        />
                    </div>

                    <div className="btn-group">
                        <button type="submit" className="btn btn-success">Save
                        </button>
                    </div>
                </form>
            </div>


        );
    }
}

AddList.propTypes = {
    onAdd: PropTypes.func.isRequired
};

export default AddList;

