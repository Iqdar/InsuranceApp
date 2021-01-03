import React, { Component } from 'react';
import {MDBDataTable} from 'mdbreact';
import {Link} from 'react-router-dom';

import Identicon from 'identicon.js';

class InsuranceTakersTable extends Component {

  render() {
    const data = {
      columns: [
        {
          label: 'ID',
          field: 'id',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
          width: 270
        },
        {
          label: 'Contact',
          field: 'contact',
          sort: 'asc',
          width: 200
        },
        {
          label: 'Car ID',
          field: 'carId',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Car',
          field: 'carName',
          sort: 'asc',
          width: 150
        },
        {
          label: '',
          field: 'ban',
          sort: 'asc',
          width: 10
        }
      ],
      rows: [
        ...this.props.insuranceTakers.map((insuranceTaker,key) => {
          return(
        {
          id: window.web3.utils.hexToNumberString(insuranceTaker.id),
          name: insuranceTaker.name,
          contact: insuranceTaker.contact,
          carId: insuranceTaker.carId,
          carName: insuranceTaker.carName,
          ban:insuranceTaker.isBanned 
          ? <div>
          <button type="button" className="btn btn-primary btn-sm"><Link to= {{ pathname: '/editInsuree', data:{_insuranceTaker:insuranceTaker}, function:{_editInsuranceTaker:this.props.editInsuranceTaker}, account:{_account:this.props.account}}} className="label-btn" >Edit</Link></button>
          <button type="button" className="btn btn-success btn-sm" onClick={(event) => {
                event.preventDefault()
                this.props.banUnban(insuranceTaker.id,false)
                }}>Unban
              </button>
            </div>
          :
            <div>
              <button type="button" className="btn btn-primary btn-sm"><Link to= {{ pathname: '/editInsuree', data:{_insuranceTaker:insuranceTaker}, function:{_editInsuranceTaker:this.props.editInsuranceTaker}, account:{_account:this.props.account}}} className="label-btn" >Edit</Link></button>
              <button type="button" className="btn btn-danger btn-sm" onClick={(event) => {
                event.preventDefault()
                this.props.banUnban(insuranceTaker.id,true)
                }}>Ban</button>
            </div>
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
      </div>
    );
  }
}
export default InsuranceTakersTable;