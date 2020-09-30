import React, { Component } from 'react';
import { Switch, Route, Link } from "react-router-dom"
import { Home, Login, Register, User, Employee} from "../../pages"
import { Menu } from "../../component/element"

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isLogin: false,
            user: {}
        }
    }

    loginSession = (newStatus, user) => {

        this.setState({
            isLogin: newStatus,
            user: user
        })
    }


    handlerLoginMenu = () => {
        if(this.state.isLogin && this.state.user.role === "HRD") {
            return (
                <>
                    <Link to="/user" >
                        <Menu>Employee</Menu>
                    </Link>
                    <Link to="/">
                        <Menu triggerLogout={() => this.loginSession(false, {})}>Logout</Menu>
                    </Link>
                    
                </>
            )
        } else if(this.state.isLogin){
            return (
                <>
                    <Link to="/emp_page">
                        <Menu>Your Data</Menu>
                    </Link>

                    <Link to="/">
                        <Menu triggerLogout={() => this.loginSession(false, {})}>Logout</Menu>
                    </Link>
                    
                </>
            )
        } else {
            return (
                <>
                    <Link to="/login">
                        <Menu>Login</Menu>
                    </Link>
                    <Link to="/register">
                        <Menu>Register</Menu>
                    </Link>

                </>
            )
        }
    }

    render() { 
        return ( 
            <div style={{height: "100%"}}>
                {/* {console.log("login status: "+this.state.isLogin)}
                {console.log("user role: "+this.state.user.role)} */}
                <div style={{ display: "flex", justifyContent: "center", margin: "10px 0" }}>
                    <Link to="/">
                        <Menu>Home</Menu>
                    </Link>
                    {this.handlerLoginMenu()}
                </div>

                <Switch>
                    <Route exact path="/" > 
                        <Home loginStatus={this.state.isLogin} />
                    </Route>
                    <Route path="/login">
                        <Login loginStatus={this.state.isLogin} loginSession={this.loginSession}/>
                    </Route>
                    <Route path="/register"> 
                        <Register loginStatus={this.state.isLogin} />
                    </Route>
                    <Route path="/user"> 
                        <User loginStatus={this.state.isLogin} userLogin={this.state.user}/>
                    </Route>
                    <Route path="/emp_page"> 
                        <Employee loginStatus={this.state.isLogin} loginSession={this.state.user} />
                    </Route>

                </Switch>
            </div>
         );
    }
}
 
export default NavBar;