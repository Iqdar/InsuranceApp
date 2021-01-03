import React, { Component } from 'react';
import {MDBDataTable} from 'mdbreact';
import {Link} from 'react-router-dom';

class ClaimTableUser extends Component {

  componentWillMount () {
    const {_claims} = this.props.location.claims;
    this.setState({claims:_claims})
}

constructor(props){
    super(props)
    this.state = {
        claims: null
    }
}

  render() {
    
    const data = {
      columns: [
        {
          label: 'Location',
          field: 'location',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Date Time',
          field: 'dateTime',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Status',
          field: 'status',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Amount Given',
          field: 'amountGiven',
          sort: 'asc',
          width: 100
        }
      ],
      rows: [
        ...this.state.claims.map((claim,key) => {
          return(
        {
          location: claim.location,
          dateTime: claim.dateTime,
          status: claim.status,
          amountGiven: window.web3.utils.hexToNumberString(claim.amountGiven),
        })
        }
      )]
    }
    
    return (
      <div>
        <MDBDataTable
          striped
          bordered
          small
          data={data}
        />
        <button type="submit" className="btn btn-primary"><Link to= {{ pathname: '/'}} className="label-btn">Back</Link></button>
      </div>
    );
  }
}

export default ClaimTableUser;