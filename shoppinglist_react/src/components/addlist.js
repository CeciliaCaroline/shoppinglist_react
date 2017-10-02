import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'
import Modal from 'react-modal';


class AddList extends Component {
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
        axios.post(`http://127.0.0.1:5000/shoppinglist/`,
            {
                name: this.state.name,
                description: this.state.description,
            }, {
                headers: {Authorization: "Bearer " + localStorage.getItem('token')}
            })


            .then((response) => {
                if (response.status === 201) {
                    this.props.onAdd(this.state.name, this.state.description);
                    this.setState({
                        name: "",
                        description: "",
                        modalIsOpen: false

                    });
                    console.log(this.state)
                }
            })
            .catch((error) => {
                console.log(error);
            });

    };


    openModal() {
        this.setState({modalIsOpen: true});
    }


    closeModal() {
        this.setState({modalIsOpen: false});
    }

    onChange(event) {
        const obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);
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
                    aria-labelledby="contained-modal-title-sm"
                >

                    <div className="modal-body">
                        <form onSubmit={this.handleSubmit} id="newList" className="col-md-offset-4 col-md-4 ">
                            <h2 className="text-center">Add New List</h2>

                            <div className="form-group">
                                <label htmlFor="name">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    required
                                    ref='name'
                                    value={this.state.name}
                                    onChange={this.onChange.bind(this)}
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
                                    value={this.state.description}
                                    onChange={this.onChange.bind(this)}
                                />
                            </div>

                            <div>
                                <button type="submit" className="btn btn-success">Save
                                </button>
                                <button type="botton" onClick={this.closeModal} className="btn btn-success">Cancel
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

