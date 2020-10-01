import React, { Component } from 'react'
import { Switch, Route, Redirect } from "react-router-dom"
import { Admin, Home, Login, Student, CreateUser } from "../../../page"
import { connect } from "react-redux"
import { FirebaseContext } from '../../../config/firebase'
import { setLogin, setLogout } from "../../../store/action/authAction"


class Body extends Component {
    constructor(props){
        super(props)
        this.state = {
            // userOnLoginRole: ""
        }
    }

    // componentDidMount() {
    //     const { isLogin, userOnLogin, doLogin } = this.props
    //     const { usersDb } = this.props.firebase
    //     if (isLogin) {
    //         usersDb().doc(userOnLogin.uid).get()
    //             .then( user => {
    //                 // console.log(user.data())
    //                 alert("berhasil login")
    //                 doLogin({...user.data(), uid: userOnLogin.uid})
    //                 this.setState({
    //                     userOnLogin.role : user.data().role
    //                 })
    //             })
    //     }
    // }

    render() {

        const { isLogin, userOnLogin } = this.props
        // const { userOnLogin.role } = this.state

        return(
            <Switch>
                <Route exact path="/">
                    {
                        (isLogin && userOnLogin.role === "admin") ? (
                            <Redirect to="/admin"/>
                        ) : (isLogin && userOnLogin.role === "student") ? (
                            <Redirect to="/student"/>
                        ) : 
                            <Home
                                // users={this.state.users}
                            /> 
                    }
                </Route>
                <Route path="/login">
                    {
                        (isLogin && userOnLogin.role === "admin") ? (
                            <Redirect to="/admin"/>
                        ) : (isLogin && userOnLogin.role === "student") ? (
                            <Redirect to="/student"/>
                        ) : 
                            <Login
                                // users = {this.state.users}
                                // isLogin = {this.state.isLogin}
                                // fnChangeLoginStatus = {this.changeLoginStatus}
                            /> 
                    }
                </Route>
                <Route path="/create-user">
                    {
                        (isLogin && userOnLogin.role === "admin") ? (
                            <Redirect to="/admin"/>
                        ) : (isLogin && userOnLogin.role === "student") ? (
                            <Redirect to="/student"/>
                        ) : 
                            <CreateUser
                                // users = {this.state.users}
                                // isLogin = {this.state.isLogin}
                                // fnChangeLoginStatus = {this.changeLoginStatus}
                            /> 
                    }
                </Route>
                <Route path="/admin">
                    {
                        // (true) ? (
                        (isLogin && userOnLogin.role === "admin") ? (
                            <Admin
                                // users = {this.state.users}
                                // userOnLogin = {this.state.userOnLogin}
                                // isLogin = {this.state.isLogin}
                                // fnChangeLogoutStatus = {this.changeLogoutStatus}
                            />
                        ) : (
                            <Redirect to="/login"/>
                        )
                    }
                </Route>
                <Route path="/student">
                    {
                        (isLogin && userOnLogin.role === "student")? (
                            <FirebaseContext.Consumer>
                                {firebase => <Student {...this.props} firebase={firebase} />}
                            </FirebaseContext.Consumer>
                            // <Student
                            //     userOnLogin = {this.state.userOnLogin}
                            //     isLogin = {this.state.isLogin}
                            //     fnChangeLogoutStatus = {this.changeLogoutStatus}
                            // />
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
    // users: state.usersReducer.users,
    userOnLogin : state.authReducer.userOnLogin,
    isLogin : state.authReducer.isLogin
})

const mapDispatchToProps = (dispatch) => ({
    doLogin: (user) => dispatch(setLogin(user)),
    doLogout: () => dispatch(setLogout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Body)