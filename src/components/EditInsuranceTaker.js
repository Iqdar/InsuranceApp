import React, { Component } from 'react';
import Identicon from 'identicon.js';
import {Link} from 'react-router-dom';

class EditInsuranceTaker extends Component {
    componentWillMount () {
        const {_data} = this.props.match.params
        this.setState({data:_data})
        const {_insuranceTaker} = this.props.location.data;
        this.setState({insuranceTaker:_insuranceTaker})
        const {_editInsuranceTaker}=this.props.location.function
        console.log(_editInsuranceTaker)        
        this.setState({editInsuranceTaker:_editInsuranceTaker})
        const {_account}=this.props.location.account        
        this.setState({account:_account})
    }

    constructor(props){
        super(props)
        this.state = {
            data: null,
            insuranceTaker: null,
            account:null,
            editInsuranceTaker(){}
        }
    }

    render() {
        console.log(this.state.editInsuranceTaker)
        console.log(this.state.insuranceTaker)
        return (
            <div>
                <p>&nbsp;</p>
                <h2>Edit</h2>
                <p>&nbsp;</p>
                    <form className="form-horizontal" onSubmit={(event) => {
                        event.preventDefault()
                        const name = this._name.value
                        const contact = this._contact.value
                        const carId = this._carId.value
                        const carName = this._carName.value
                        const address = this._address.value
                        this.state.editInsuranceTaker(window.web3.utils.hexToNumberString(this.state.insuranceTaker.id),name,contact,carId,carName,address)
                    }}>
                    <div className="row">
                        <div className="col-md-6">
                        <div className="form-group">
                            <label className="control-label col-sm-12" htmlFor="name">Name:</label>
                            <div className="col-md-10 col-sm-12">
                            <input
                                id="_name"
                                type="text"
                                ref={(input) => { this._name = input }}
                                className="form-control"
                                placeholder="Name"
                                defaultValue={this.state.insuranceTaker.name}
                                required />
                            </div>
                        </div>
                        </div>
                        <div className="col-md-6">
                        <div className="form-group">
                            <label className="control-label col-sm-12" htmlFor="contact">Contact:</label>
                            <div className="col-sm-12 col-md-10">
                            <input
                                id="_contact"
                                type="tel"
                                ref={(input) => { this._contact = input }}
                                className="form-control"
                                defaultValue={this.state.insuranceTaker.contact}                                
                                placeholder="Contact"
                                required />
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                        
                        <div className="form-group">
                            <label className="control-label col-sm-12" htmlFor="carId">Car ID:</label>
                            <div className="col-md-10 col-sm-12">
                            <input
                                id="_carId"
                                type="text"
                                ref={(input) => { this._carId = input }}
                                className="form-control"
                                placeholder="Car ID"
                                defaultValue={this.state.insuranceTaker.carId}
                                required />
                            </div>
                        </div>
                        
                        </div>
                        <div className="col-md-6">
                    
                        <div className="form-group">
                            <label className="control-label col-sm-12" htmlFor="carName">Car Name:</label>
                            <div className="col-sm-12 col-md-10">
                            <input
                                id="_carName"
                                type="text"
                                ref={(input) => { this._carName = input }}
                                className="form-control"
                                placeholder="Car Name"                                
                                defaultValue={this.state.insuranceTaker.carName}
                                required />
                            </div>
                        </div>
                        
                    </div>
                    </div>
                    <label className="control-label col-sm-12" htmlFor="address">Account Address:</label>
                    <div className="row">
                        <div className="col-md-6">
                        
                        <div className="form-group">
                            
                            <div className="col-md-10 col-sm-12">
                            <input
                                id="_address"
                                type="text"
                                ref={(input) => { this._address = input }}
                                className="form-control"
                                defaultValue={this.state.account}
                                placeholder="Account Address"
                                required />
                            </div>
                        </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">        
                                <div className="col-sm-6 ">
                                <button type="submit" className="btn btn-primary"><Link to= {{ pathname: '/'}} className="label">Submit</Link></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <p>&nbsp;</p>
            </div>
        );
    }
}
export default EditInsuranceTaker;