import React, { Component } from 'react'
import Navbar from "../../component/template/navbar"
import { RowInput } from "../../component"
import "./login.css"
import { setLogin } from "../../store/action/authAction"
import { connect } from "react-redux"
import FirebaseContext from "../../config/firebase/firebaseContext"

// import homeLogo from "../../asset/logo/home.png"

class LoginForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: "",
            password: ""
        }
    }

    setValue = (el) => {
        this.setState({
            [el.name]: el.value
        })
    }

    loginHandler = () => {
        const { email, password } = this.state
        const { doLogin } = this.props
        const { loginFirebaseUser, usersDb } = this.props.firebase

        if (email === "") {return alert("Email must not be empty!")}
        else if (password === "") {return alert("Password must not be empty!")}

        loginFirebaseUser({email, password}) // sign in with authentication
            .then( res => {
                if (res.user) {

                    usersDb().doc(res.user.uid).get()
                        .then( userOnLogin => {
                            // console.log(userOnLogin.data())
                            // alert("berhasil login")
                            doLogin({...userOnLogin.data(), uid: res.user.uid})
                        })
                        .then(() => {
                            window.location.reload()
                        })   
                    alert("Login Success")
                }
            })            
            .catch( err => {
                console.error(err)
                alert(err.message)
            })
    }

    render(){
        return (
            <>
                <div className="login">
                    <div className="navbar">
                        <div className="navbarContent">                           
                            <Navbar
                            label="Home"
                            linkTo="/"
                            logo="home"/>
                        </div>                        
                    </div>
                    <div className="loginContent">
                        <div className="formLogin">
                            <h4>Login</h4>
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
                                    type="password"
                                    name="password"
                                    label="Password"
                                    fnSetValue={this.setValue}
                                />  
                            </div>
                            <div>
                                <button onClick={this.loginHandler}>Login</button>
                            </div>
                        </div>
                    </div>                    
                </div>
            </>
        )               
    }
}

class Login extends Component {
    constructor(props){
        super()
        this.state = {}
    }

    render() {
        return (
            <FirebaseContext.Consumer>
                {firebase => <LoginForm {...this.props} firebase={firebase} />}
            </FirebaseContext.Consumer>
        )
    }
}

// const mapStateToProps = (state) => ({
//     users: state.usersReducer.users
// })

const mapDispatchToProps = (dispatch) => ({
    doLogin: (user) => dispatch(setLogin(user))
})

export default connect(null, mapDispatchToProps)(Login)