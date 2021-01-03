import React, { Component } from 'react';
import Identicon from 'identicon.js';
import {Link} from 'react-router-dom'
class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-expand-xs navbar-fixed-top navbar-dark bg-primary">
  <a className="navbar-brand" href="#">CarEnsurer</a>

  <div id="navbarColor01">
      <ul className="navbar-nav ml-auto">
      <li className=" nav-item ml-auto">
            <small className="text-secondary">
              <small id="account" ><font color="white">{this.props.user}</font></small>
            </small>
            { this.props.account
              ? <img
                className='ml-2'
                width='30'
                height='30'
                src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
              />
              : <span></span>
            }
          </li>
    </ul>
  </div>
</nav>
    );
  }
}

export default Navbar;
