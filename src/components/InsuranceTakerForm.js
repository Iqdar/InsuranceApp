import React, { Component } from 'react';
import Identicon from 'identicon.js';
import {sha3} from 'web3';

import $ from 'jquery';

class InsuranceTakerForm extends Component {

    componentWillMount(){
        var address = $('#_address').val();

        var isAddress = function () {
            if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
                // check if it has the basic requirements of an address
                return false;
            } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
                // If it's all small caps or all all caps, return true
                return true;
            } else {
                // Otherwise check each case
                return isChecksumAddress(address);
            }
        };
        var isChecksumAddress = function (address) {
            address = address.replace('0x','');
            var addressHash = sha3(address.toLowerCase());
            for (var i = 0; i < 40; i++ ) {
                if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
                    return false;
                }
            }
            return true;
        };
        if (isAddress===false){
            alert('Address is incorrect');
	        $('#_address').focus()
        }
    }
  render() {
    
    return (
        <div>
            <p>&nbsp;</p>
            <h2>New Registration</h2>
            <p>&nbsp;</p>
                <form className="form-horizontal" onSubmit={(event) => {
                    event.preventDefault()
                    const name = this._name.value
                    const contact = this._contact.value
                    const carId = this._carId.value
                    const carName = this._carName.value
                    const address = this._address.value
                    this.props.addInsuranceTaker(name,contact,carId,carName,address)
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
                            placeholder="Account Address"
                            required />
                        </div>
                    </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">        
                            <div className="col-sm-6 ">
                            <button type="submit" className="btn btn-primary">Submit</button>
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
export default InsuranceTakerForm;