import React, { Component } from 'react'
import { RowInput } from '../../component'
// import { connect } from "react-redux"
// import FirebaseContext from '../../config/firebase/firebaseContext';
// import { auth } from 'firebase';

class EditUser extends Component {
    constructor(props){
        super(props)
        this.state = {
            // email: "",
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

    onClickHandler = () => {
        const { usersDb } = this.props.firebase
        const { user } = this.props
        let { /*email, */name, role, picture , quotes, github } = this.state

        // get default value
        if (name === "") {name = user.name}
        if (role === "") {role = user.role}
        if (picture === "") {picture = user.picture}
        if (quotes === "") {quotes = user.quotes}
        if (github === "") {github = user.github}

        usersDb().doc(user.uid).update({name, role, picture , quotes, github})
            .then(() => {
                alert("Update user is success!")
            })
            .catch(err => {
                alert("Failed update user")
                console.error(err)
            })
    }

    render(){
        const { user } = this.props
        return(
            <div className="createUser">
                <div>
                    <h3>Edit User</h3>
                </div>
                <div className="createUserContent">
                    <div className="createUserForm">
                        {/* <div>
                            <RowInput
                                type="email"
                                name="email"
                                label="Email"
                                fnSetValue={this.setValue}
                            />
                        </div> */}
                        <div>
                            <RowInput
                                type="text"
                                name="name"
                                label="Name"
                                defaultValue={user.name}
                                fnSetValue={this.setValue}
                            />
                        </div>
                        <div>
                            <RowInput
                                type="text"
                                name="role"
                                label="Role"
                                defaultValue={user.role}
                                fnSetValue={this.setValue}
                            />
                        </div>                    
                        <div>
                            <RowInput
                                type="text"
                                name="picture"
                                label="Profile Picture"
                                defaultValue={user.picture}
                                fnSetValue={this.setValue}
                            />
                        </div>
                        <div>
                            <RowInput
                                type="text"
                                name="quotes"
                                label="Quotes"
                                defaultValue={user.quotes}
                                fnSetValue={this.setValue}
                            />
                        </div>
                        <div>
                            <RowInput
                                type="text"
                                name="github"
                                label="Github"
                                defaultValue={user.github}
                                fnSetValue={this.setValue}
                            />
                        </div>
                        <div>
                            <button onClick={this.onClickHandler}>Edit User</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }    
}

export default EditUser