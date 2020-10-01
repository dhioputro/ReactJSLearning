import React, { Component } from 'react'
import Navbar from "../../component/template/navbar"
import { Card } from "../../component"
import "./student.css"

import { connect } from "react-redux"
import { setLogout } from '../../store/action/authAction'
import { Switch, Route } from 'react-router-dom'
import EditUser from '../editUser'

import FirebaseContext from "../../config/firebase/firebaseContext"

class Student extends Component {

    logoutHandler = () => {
        const { logoutFirebaseUser } = this.props.firebase
        const { doLogout } = this.props

        logoutFirebaseUser()
            .then(() => {
                doLogout()
                alert("Logout Success")
            })
            .catch( err => {
                alert(err.type)
                console.log(err.message)
            })
    }
    
    render(){
        const user = this.props.userOnLogin // Get user on login data
        return (
            <>
                <div className="student">
                    <div className="navbar">
    
                        <div className="navbarContent">
                    
                            <Navbar
                                label="Home"
                                linkTo="/student"
                            />
                        </div>
            
                        <div className="navbarContent">
                            
                            <Navbar
                                label="Edit Profile"
                                linkTo="/student/edit"
                            />
                        </div>
                        <div className="navbarContent" onClick={this.logoutHandler}>

                            <Navbar
                                label="Logout"
                                linkTo="/login"
                            />
                        </div>                        
                    </div>
                    <div className="studentContent">
                        <Switch>
                            <Route exact path="/student">
                            <div className="card">
                                <div>
                                    <Card
                                        picture={user.picture}
                                        name={user.name}
                                        quotes={user.quotes}
                                        github={user.github}            
                                    />
                                </div>
                            </div>
                            </Route>
                            <Route path="/student/edit">
                                <FirebaseContext.Consumer>
                                    {firebase => <EditUser {...this.props} firebase={firebase} user={user}/>}
                                </FirebaseContext.Consumer>                                
                            </Route>
                        </Switch>                   
                    </div>            
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    userOnLogin: state.authReducer.userOnLogin
})

const mapDispatchToProps = (dispatch) => ({
    doLogout: () => dispatch(setLogout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Student)

