import React, { Component } from 'react'
import { RowInput } from '../../component'
import "./regis.css"

import FirebaseContext from '../../config/firebase/firebaseContext';


// Child class
class RegistrationForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: "",
            name: "",
            role: "",
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

    optionHandler = (el) => {
        this.setState({
            role: el.target.value
        })
    }

    onClickHandler = () => {
        const { email, name, role, picture , quotes, github } = this.state
        const password = name.toLowerCase() +"123"
        
        this.props.firebase
            .createFirebaseUser({email, password}) // ke authentication
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
                <div className="createUserContent">
                    <div className="createUserForm">
                        <h3>User Registration</h3>
                        <div>
                            <RowInput
                                type="email"
                                name="email"
                                label="Email"
                                fnSetValue={this.setValue}
                            />
                        </div>
                        <div>
                            <RowInput
                                type="text"
                                name="name"
                                label="Name"
                                fnSetValue={this.setValue}
                            />
                        </div>
                        <div>
                            <input type="radio" name={this.state.role} value="admin" onChange={this.optionHandler} />Admin 
                            <input type="radio" name={this.state.role} value="student" onChange={this.optionHandler} />Student   
                        </div>                    
                        <div>
                            <RowInput
                                type="text"
                                name="picture"
                                label="Profile Picture"
                                fnSetValue={this.setValue}
                            />
                        </div>
                        <div>
                            <RowInput
                                type="text"
                                name="quotes"
                                label="Quotes"
                                fnSetValue={this.setValue}
                            />
                        </div>
                        <div>
                            <RowInput
                                type="text"
                                name="github"
                                label="Github"
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