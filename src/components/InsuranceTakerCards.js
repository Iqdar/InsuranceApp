import React, { Component } from 'react';
import Identicon from 'identicon.js';
import {Link} from 'react-router-dom';
import image1 from '../Images/Insurance-Claim-Car-512.png'
import image2 from '../Images/View-Claim-512.png'
import image3 from '../Images/action-file-document-filetype-type_178-256.png'


class InsuranceTakerCards extends Component {

  render() {
    return (
        <div className="row container">
            <div className="col-md-1">
                
            </div>
            <div className="card col-sm-4 col-md-3 container">
                <img className="card-img-top" src={image1} alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title bold">New Claim</h5>
                    <p className="card-text">Feel free to claim in case of any problem.</p>
                    <Link to= {{ pathname: '/addClaim', addClaim:{_addClaim:this.props.addClaim}, account:{_account:this.props.account}}} className="btn btn-primary">Go!</Link>
                </div>
            </div>
            <div className="card container col-sm-4 col-md-3">
                <img className="card-img-top" src={image2} alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title bold">View Claims</h5>
                    <p className="card-text">Take a look on your previous claims which you have filed uptill now</p>
                    <Link to= {{ pathname: '/viewClaims', claims:{_claims:this.props.claims}}} className="btn btn-primary">Go!</Link>
                </div>
            </div>
            <div className="card container col-sm-4 col-md-3">
                <img className="card-img-top" src={image3} alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title bold">Terms and Policies</h5>
                    <p className="card-text">Read terms and policies before using this service</p>
                    <a href="#" className="btn btn-primary">View</a>
                </div>
            </div>
        </div>
    );
  }
}

export default InsuranceTakerCards;
