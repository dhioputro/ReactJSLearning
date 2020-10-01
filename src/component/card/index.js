import React, { Component } from 'react'
import "./card.css"

class Card extends Component {
    render(){
        const { name, picture, quotes, github } = this.props
        return(
            <div className="cardItem">
                <div className="cardProfilePicture">
                    <img src={picture} alt="avatar"/> 
                </div>
                <div className="cardDetail">
                    <h4>{name}</h4>
                    <p>"{quotes}"</p>
                    <a href={github} target="blank"><img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="avatar"></img></a>
                </div>
            </div>
        )
    }
}

export default Card