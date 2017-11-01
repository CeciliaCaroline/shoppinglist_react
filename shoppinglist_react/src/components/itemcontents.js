import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';


class ItemContents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: '',
            modalIsOpen: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    handleSubmit(e) {
        console.log(e.target);
        e.preventDefault();
        this.props.onEdit(e.target.getAttribute("data-id2"), this.state.name, this.state.price);
        this.setState({
            name: this.state.name,
            price: this.state.price,
            modalIsOpen: false

        });
        console.log(this.state)
    };

    componentDidMount() {
        this.setState({
            name: this.props.list.name,
            price: this.props.list.price
        })
    }

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

    };


    render() {

        return (

            <tr>
                <td> {this.props.list.name}</td>
                <td>{this.props.list.price}</td>
                <td>
                    <button className="text-center" data={this.props.list.id} onClick={this.openModal}>EDIT</button>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        contentLabel="Example Modal"
                        bsSize="small"
                    >

                        <div className="modal-body">
                            <form onSubmit={this.handleSubmit} data-id2={this.props.list.id} id="editList"
                                  className="col-md-offset-4 col-md-4 ">
                                <h2 className="text-center">Edit List</h2>

                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        ref='name'
                                        defaultValue={this.props.list.name}
                                        onChange={this.onChange.bind(this)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price">Price</label>
                                    <textarea
                                        type="text"
                                        className="form-control"
                                        name="price"
                                        ref='price'
                                        defaultValue={this.props.list.price}
                                        onChange={this.onChange.bind(this)}
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
                    <button className="text-right btn btn-danger" data-id={this.props.list.id}
                            onClick={this.props.onRemove}>DELETE
                    </button>
                </td>
            </tr>
        );
    }
}

ItemContents.propTypes = {
    list: PropTypes.object.isRequired,
    onRemove: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired

};


export default ItemContents;