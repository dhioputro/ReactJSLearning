import React, { Component } from 'react'
import Card from "../../component/card"

class ShowUsers extends Component {
    constructor(props){
        super(props)
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        let users = []

        this.props.firebase.usersDb().get()
            .then(data => {
                data.forEach((doc) => {
                    const tempUser = {
                        id: doc.id,
                        ...doc.data()
                    }
                    users.push(tempUser)

                })
                this.setState({
                    users
                })

            })
            .catch((err) => {
                console.log("error :" + err)
            })
    }

    showCards = () => {
        return this.state.users.map((user, idx) => {
            return (
                <div key={idx} style={{margin:"10px"}}>
                    <Card
                        picture={user.picture}
                        name={user.name}
                        quotes={user.quotes}
                        github={user.github}            
                    />
                </div>
            )
        })
    }

    render() {
        return (
            <>
               {this.showCards()}
            </>
        )
    }
}

export default ShowUsers