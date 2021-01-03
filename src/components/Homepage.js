import React, { Component } from 'react';
import Identicon from 'identicon.js';
import image1 from '../Images/main_page.jpg'
class Homepage extends Component {

  render() {
    return (
     <div className="imgContainer">
      <img className="img-fluid" src={image1} alt ="Main page"/>
      <div className="img-text-block">
      <h2>
        Welcome {this.props.Name}
      </h2>
      </div>
    </div> 
    );
  }
}
export default Homepage;