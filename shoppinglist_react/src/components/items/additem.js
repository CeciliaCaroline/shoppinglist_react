import React, {Component} from 'react';
import Modal from 'react-modal';
import axios from 'axios';


const head = {
    headers: {'Content-Type': 'application/json', Authorization: "Bearer " + localStorage.getItem('token')}
};

class AddItem extends Component {
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
        e.preventDefault();
        console.log(this.state);
        this.setState({
            name: "",
            price: "",
            modalIsOpen: false

        });

        axios.post(`http://127.0.0.1:5000/v2/shoppinglist/${this.props.list_id}/items/`,
            {
                name: this.state.name,
                price: this.state.price,
            }, head)


            .then((response) => {
            let data = response.data;
                if (response.status === 201) {
                    this.props.onAdd(data.name, data.price, data.id);
                    this.setState({
                        name: "",
                        price: "",
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
                <button className=" items btn btn-info " onClick={this.openModal}>Create
                    New Item
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
                            <h2 className="text-center">Add New Item</h2>

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
                                <label htmlFor="description">Price</label>
                                <textarea
                                    type="text"
                                    className="form-control"
                                    name="price"
                                    required
                                    ref='price'
                                    value={this.state.price}
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




export default AddItem;

