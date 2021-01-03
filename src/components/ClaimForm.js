import React, { Component } from 'react';
import Identicon from 'identicon.js';
import {Link} from 'react-router-dom'
class ClaimForm extends Component {

    componentWillMount () {
        const {_account} = this.props.location.account
        this.setState({account:_account})
        const {_addClaim}=this.props.location.addClaim        
        this.setState({addClaim:_addClaim})
    }

    constructor(props){
        super(props)
        this.state = {
            data: null,
            account:'',
            addClaim(){}
        }
    }


  render() {
    return (
        <div>
            <p>&nbsp;</p>
            <h2>New Claim</h2>
            <p>&nbsp;</p>
                <form className="form-horizontal" onSubmit={(event) => {
                    event.preventDefault()
                    const location = this._location.value
                    const description = this._description.value
                    const dateTime = this._dateTime.value
                    const lossInjury = this._lossInjuries.value
                    this.state.addClaim(location,description,dateTime,lossInjury)
                }}>
                <div className="row">
                    <div className="col-md-6">
                    <div className="form-group">
                    <label className="control-label col-sm-12" htmlFor="location">Location:</label>
                    <div className="col-sm-12">
                        <input
                            id="_location"
                            type="text"
                            ref={(input) => { this._location = input }}
                            className="form-control"
                            placeholder="Location"
                            required />
                        </div>
                    </div>
                    </div>
                    <div className="col-md-6">
                    <div className="form-group">
                    <label className="control-label col-sm-12" htmlFor="dateTime">Date Time:</label>
                    <div className="col-sm-12">
                    <input
                        id="_dateTime"
                        type="date"
                        ref={(input) => { this._dateTime = input }}
                        className="form-control"
                        placeholder="Date"
                        required />
                    </div>
                    </div>
                </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                    
                    <div className="form-group">
                    <label className="control-label col-sm-12" htmlFor="description">Description:</label>
                    <div className="col-sm-12">
                    <textarea
                        rows="3"
                        id="_description"
                        type="text"
                        ref={(input) => { this._description = input }}
                        className="form-control"
                        placeholder="Description"
                        required />
                    </div>
                    </div>
                    
                    </div>
                    <div className="col-md-6">
                  
                    <div className="form-group">
                    <label className="control-label col-sm-12" htmlFor="lossInjury">Loss or Injury:</label>
                    <div className="col-sm-12">
                    <input
                        id="_lossInjury"
                        type="text"
                        ref={(input) => { this._lossInjuries = input }}
                        className="form-control"
                        placeholder="Loss or Injury"
                        required />
                    </div>
                    </div>
                    <div className="form-group">        
                        <div className="col-sm-6 ">
                        <button type="submit" className="btn btn-primary"><Link to= {{ pathname: '/'}} className="label-btn">Submit</Link></button>
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
export default ClaimForm;