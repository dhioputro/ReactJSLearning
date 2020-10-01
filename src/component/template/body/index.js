import React, { Component } from 'react'
import { Switch, Route, Redirect } from "react-router-dom"
import { Admin, Home, Login, Student, Registration } from "../../../page"
import { connect } from "react-redux"
import { FirebaseContext } from '../../../config/firebase'
import { setLogin, setLogout } from "../../../store/action/authAction"


class Body extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }

    render() {
        const { isLogin, userOnLogin } = this.props
        const admin = "k1619L9U1Zbargza9YYCo5Q2NiH3"
        const student = "fwMImRMpuzcMsfONM5Nm7J1JrKG3"
        // console.log("login apa ngga? " +isLogin);
        return(
            <Switch>
                <Route exact path="/">
                    {
                        (isLogin && userOnLogin === admin) ? (
                            <Redirect to="/admin"/>
                        ) : (isLogin && userOnLogin === student) ? (
                            <Redirect to="/student"/>
                        ) : 
                            <Home /> 
                    }
                </Route>
                <Route path="/login">
                    {
                        (isLogin === true && userOnLogin.uid === admin) ? (
                            <Redirect to="/admin"/>
                        ) : (isLogin && userOnLogin.uid === student) ? (
                            <Redirect to="/student"/>
                        ) : 
                            <Login /> 
                    }
                </Route>
                <Route path="/registration">
                    {
                        (isLogin && userOnLogin.uid === admin) ? (
                            <Redirect to="/admin"/>
                        ) : (isLogin && userOnLogin.uid === student) ? (
                            <Redirect to="/student"/>
                        ) : 
                            <Registration /> 
                    }
                </Route>
                <Route path="/admin">
                    {
                        (isLogin && userOnLogin.uid === admin) ? (
                            <FirebaseContext.Consumer>
                                {firebase => <Admin {...this.props} firebase={firebase}/>}  
                            </FirebaseContext.Consumer>
                        ) : (
                            <Redirect to="/login"/>
                        )
                    }
                </Route>
                <Route path="/student">
                    {
                        (isLogin && userOnLogin.uid === student)? (
                            <FirebaseContext.Consumer>
                                {firebase => <Student {...this.props} firebase={firebase} />}
                            </FirebaseContext.Consumer>
                        ) : (
                            <Redirect to="/login"/>
                        )
                    }
                </Route>
            </Switch>
        )
    }
}

const mapStateToProps = (state) => ({
    userOnLogin : state.authReducer.userOnLogin,
    isLogin : state.authReducer.isLogin
})

const mapDispatchToProps = (dispatch) => ({
    doLogin: (user) => dispatch(setLogin(user)),
    doLogout: () => dispatch(setLogout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Body)