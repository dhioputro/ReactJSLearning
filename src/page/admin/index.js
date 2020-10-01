import React, { Component } from 'react'
import Navbar from "../../component/template/navbar"
import CreateUser from "../createUser"
import ShowUsers from "../showUsers"
import { setLogout } from "../../store/action/authAction"
import { connect } from "react-redux"
// import Home from "../home"
// import { Card } from "../../component"
import "./admin.css"
import { Switch, Route } from 'react-router-dom'
import FirebaseContext from '../../config/firebase/firebaseContext';

import homeLogo from "../../asset/logo/home.png"
import logoutLogo from "../../asset/logo/logout.png"
import studentsLogo from "../../asset/logo/student.png"

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
        // const user = this.props.userOnLogin
        
        return (
            <>
                <div className="admin">
                    <div className="navbar">
                        <div className="navbarContent">
                            <img className="navbarLogo" src={homeLogo} alt="logo"/>
                            <Navbar
                                label="Home"
                                linkTo="/admin"
                            />
                        </div>
                        {/* <div className="navbarContent">
                            <img className="navbarLogo" src={studentsLogo} alt="logo"/>
                            <Navbar
                                label="Students"
                                linkTo="/admin/students"
                            />
                        </div> */}
                        <div className="navbarContent">
                            <img className="navbarLogo" src={studentsLogo} alt="logo"/>
                            <Navbar
                                label="Create User"
                                linkTo="/admin/create-user"
                            />
                        </div>
                        <div className="navbarContent" onClick={() => this.logoutHandler}>
                            <img className="navbarLogo" src={logoutLogo} alt="logo"/>
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
                                    <CreateUser />
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
    userOnLogin: state.authReducer.userOnLogin
})

const mapDispatchToProps = (dispatch) => ({
    doLogout: () => dispatch(setLogout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Admin)