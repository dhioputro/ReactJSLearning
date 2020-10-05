import React, { Component } from 'react'
import { RowInput } from '../../component'
import Navbar from "../../component/template/navbar"
import "./regis.css"

import FirebaseContext from '../../config/firebase/firebaseContext';


// Child class
class RegistrationForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: "",
            name: "",
            role: "student",
            picture: "",
            quotes:"",
            github: ""
        }
    }

    setValue = (el) => {
        this.setState({
            [el.name]: el.value
        })
    }

    onClickHandler = () => {
        const { email, name, role, picture , quotes, github } = this.state
        const password = name.toLowerCase() +"123"
        
        this.props.firebase
            .createFirebaseUser({email, password}) // authentication
            .then(authUser => {
                return this.props.firebase.usersDb().doc(authUser.user.uid).set({ // firestore
                    name,
                    role,
                    picture,
                    quotes,
                    github
                }).then(() => {
                    window.location.reload() 
                }).then(() => {
                    alert("Creating user is success")
                }).catch(err => {
                   alert(err)
                })

            }).catch(err => {
                console.error(err)
                alert(err.message)
            })
    }

    render(){
        return(
            <div className="createUser">
                <div className="navbar">
                    <div className="navbarContent">                           
                        <Navbar
                        label="Home"
                        linkTo="/"
                        logo="home"/>
                    </div>                        
                </div>
                <div className="createUserContent">
                    <div className="createUserForm">
                        <h3>Student Registration</h3>
                        <div>
                            <RowInput
                                type="email"
                                name="email"
                                label="Email"
                                placeholder="Email"
                                fnSetValue={this.setValue}
                            />
                        </div>
                        <div>
                            <RowInput
                                type="text"
                                name="name"
                                label="Name"
                                placeholder="Your Full Name"
                                fnSetValue={this.setValue}
                            />
                        </div>                  
                        <div>
                            <RowInput
                                type="text"
                                name="picture"
                                label="Profile Picture"
                                placeholder="URL"
                                fnSetValue={this.setValue}
                            />
                        </div>
                        <div>
                            <RowInput
                                type="text"
                                name="quotes"
                                label="Quotes"
                                placeholder=" Your Quotes"
                                fnSetValue={this.setValue}
                            />
                        </div>
                        <div>
                            <RowInput
                                type="text"
                                name="github"
                                label="Github"
                                placeholder="Github URL"
                                fnSetValue={this.setValue}
                            />
                        </div>
                        <div>
                            <button onClick={this.onClickHandler}>Register</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }    
}

// Parent class
class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <FirebaseContext.Consumer>
                {firebase => <RegistrationForm {...this.props} firebase={firebase} />}
            </FirebaseContext.Consumer>
        )
    }
}

export default Registration