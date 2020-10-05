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
                    <a href={github} target="blank" >{github}</a>
                </div>
            </div>
        )
    }
}

export default Card