import React, { Component } from 'react';
import { Form } from "../../component/element"
import { Redirect } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: "",
            password: "",
        }
    }

    setValueInput = (el) => {
        this.setState({
            [el.name]: el.value
        })
    }

    doLogin = () => {
        const { username, password } = this.state
        console.log(username)
        console.info(password)

        var users = JSON.parse(localStorage.getItem("user"))
        var found = false
        // console.log("user :" +this.state.username);
        users.forEach(user => {
            if (username === user.username && password === user.password) {
                this.props.loginSession(true, user)
                found = true
            }
        });
        if (found === false) {
            alert("username tidak ditemukan atau pass salah")
        }
    }

    showSecret = () => {
        if (this.state.isLogin) {
            return (
                <div style={{ marginTop: "10px" }}>
                    berhasil login, ini rahasia 2
                </div>
            )
        }
    }

    render() { 
        if(this.props.loginStatus)
        
        return <Redirect to="/">
            {/* {console.log("login status inside login: "+this.props.loginStatus)}
            {console.log("saya ada di home login")} */}
        </Redirect>

        return ( 
            <div style={{ marginTop: "10px", display: "flex", justifyContent: "center" }}>
                {/* {console.log("login status inside login: "+this.props.loginStatus)}
                {console.log("saya ada di home")} */}
                <div style={{ width: "max-content" }}>                    
                    <Form
                        label="Username:" 
                        type="username" 
                        name="username" 
                        value={ this.state.username }
                        setValue={ (el) => this.setValueInput(el) } />     

                    <Form
                        label="Password:" 
                        type="password" 
                        name="password" 
                        value={ this.state.password }
                        setValue={ (el) => this.setValueInput(el) } />

                    <div style={{ marginTop: "10px" }}>
                        <button onClick={ this.doLogin }>Login</button>
                    </div>

                    { this.state.isLogin ?
                        <div style={{ marginTop: "10px" }}>
                            berhasil login, ini rahasia
                        </div>
                     : null }

                    { this.showSecret() }

                </div>
            </div>
         );
    }
}
 
export default Login;