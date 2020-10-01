import React, { Component } from 'react'
import Navbar from "../../component/template/navbar"
import Registration from "../registration"
import ShowUsers from "../showUsers"
import "./admin.css"

import { setLogout } from "../../store/action/authAction"
import { connect } from "react-redux"
import { Switch, Route } from 'react-router-dom'

import FirebaseContext from '../../config/firebase/firebaseContext';

class Admin extends Component {


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
        return (
            <>
                <div className="admin">
                    <div className="navbar">
                        <div className="navbarContent">
                            
                            <Navbar
                                label="Home"
                                linkTo="/admin"
                            />
                        </div>
                        <div className="navbarContent">
                            
                            <Navbar
                                label="Create User"
                                linkTo="/admin/create-user"
                            />
                        </div>
                        <div className="navbarContent" onClick={this.logoutHandler}>
                            
                            <Navbar
                                label="Logout"
                                linkTo="/login"
                            />
                        </div>
                    </div>
                    <div className="adminContent">
                        <Switch>
                            <Route exact path="/admin">
                                <div className="card">
                                    <FirebaseContext.Consumer>
                                        {firebase => <ShowUsers {...this.props} firebase={firebase} />}
                                    </FirebaseContext.Consumer>
                                </div>                                
                            </Route> 
                            <Route path="/admin/create-user">
                                <div>
                                    <Registration />
                                </div>
                            </Route>
                        </Switch>

                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    userOnLogin: state.authReducer.userOnLogin,
})

const mapDispatchToProps = (dispatch) => ({
    doLogout: () => dispatch(setLogout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Admin)