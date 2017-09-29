import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';


class TableContents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            modalIsOpen: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state);
        this.props.onEdit(this.state.name, this.state.description);
        this.setState({
            name: "",
            description: "",
            modalIsOpen: false

        });
        console.log(this.state)
    };

    openModal() {
        this.setState({modalIsOpen: true});
    }


    closeModal() {
        this.setState({modalIsOpen: false});
    }

    render() {
        return (
            <tr>
                <td>{this.props.name}</td>
                <td>{this.props.description}</td>
                <td>
                    <button className="text-center" onClick={this.openModal}>EDIT</button>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        contentLabel="Example Modal"
                        bsSize="small"
                    >

                        <div className="modal-body">
                            <form onSubmit={this.handleSubmit} id="editList" className="col-md-offset-4 col-md-4 ">
                                <h2 className="text-center">Edit List</h2>

                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        required
                                        ref='name'
                                        defaultValue={this.props.name}
                                        onChange={event => (this.setState({name: event.target.value}))}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <textarea
                                        type="text"
                                        className="form-control"
                                        name="description"
                                        required
                                        ref='description'
                                        defaultValue={this.props.description}
                                        onChange={event => (this.setState({description: event.target.value}))}
                                    />
                                </div>

                                <div>
                                    <button type="submit" className="btn btn-success">Save
                                    </button>
                                    <button type="button" className="btn btn-success"
                                            onClick={this.closeModal}>Cancel
                                    </button>
                                </div>

                            </form>
                        </div>
                    </Modal>

                </td>
                <td>
                    <button className="text-right" onClick={this.props.onRemove}>DELETE</button>
                </td>
            </tr>
        );
    }
}

TableContents.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    // onRemove: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired

};


export default TableContents;