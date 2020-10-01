import React, { Component } from 'react'
import { Link } from "react-router-dom";
import "./navbar.css"

class Navbar extends Component {
    render() {
        return(
            <>                
                <Link to={this.props.linkTo}>
                    <div className="navbarLabel">{this.props.label}</div>
                </Link>
            </>

        )
    }
}

export default Navbar