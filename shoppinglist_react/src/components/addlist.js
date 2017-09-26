import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';


class AddList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: ''
        };
        this.state = {
            modalIsOpen: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

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


    openModal() {
        this.setState({modalIsOpen: true});
    }


    closeModal() {
        this.setState({modalIsOpen: false});
    }


    render() {
        return (

            <div className="container">
                <button className=" items btn btn-info" onClick={this.openModal}>Create
                    New List
                </button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="Example Modal"
                    bsSize="small"
                >

                    <div className="modal-body">
                        <form onSubmit={this.handleSubmit} id="newList" className="col-md-offset-4 col-md-4 ">
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

                            <div>
                                <button type="submit" className="btn btn-success">Save
                                </button>
                                <button type="button" className="btn btn-success"
                                        onClick={this.closeModal}>X
                                </button>
                            </div>

                        </form>
                    </div>
                </Modal>


            </div>



        );
    }
}

AddList.propTypes = {
    onAdd: PropTypes.func.isRequired
};

export default AddList;

