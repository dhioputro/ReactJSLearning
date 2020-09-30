import React, { Component } from 'react';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    checkLogin = () => {
        if(this.props.triggerLogout) {
            this.props.triggerLogout()
        }
    }
    render() { 
        return ( 
            <div onClick={this.checkLogin}  className="menu">
                { this.props.children }
            </div>
         );
    }
}
 
export default Menu;