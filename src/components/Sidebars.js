import React, { Component } from 'react';
import Identicon from 'identicon.js';
import {Link} from 'react-router-dom'
import Sidebar from 'react-sidebar'

const mql = window.matchMedia(`(min-width: 800px)`);

class Sidebars extends Component {
    constructor(props) {
        super(props);
        this.state = {
          sidebarDocked: mql.matches,
          sidebarOpen: false
        };
     
        this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
      }
     
      componentWillMount() {
        mql.addListener(this.mediaQueryChanged);
      }
     
      componentWillUnmount() {
        this.state.mql.removeListener(this.mediaQueryChanged);
      }
     
      onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
      }
     
      mediaQueryChanged() {
        this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
      }
    render() {
      return (
        <sidebar>
          <nav>
            <a href="#">Home</a>
            <a href="#">Posts</a>
            <a href="#">Contact</a>
          </nav>
        </sidebar> 

    );
  }
}

<Sidebar
sidebar={this.props.children}
open={this.state.sidebarOpen}
docked={this.state.sidebarDocked}
onSetOpen={this.onSetSidebarOpen}
><b>main content</b>
</Sidebar>

export default Sidebars;
