import React, { Component } from 'react'
import Navbar from "../../component/template/navbar"
import "./home.css"
// import ShowUsers from "../showUsers"
import CreateUser from "../registration"

import { Switch, Route } from 'react-router-dom'
import FirebaseContext from '../../config/firebase/firebaseContext';


class Home extends Component {
    checkFirebase = () => {
        return firebase => {
            return <div>Firebase Sukses!</div>
        }
    }

    render(){
        return (
            <>
                <div className="home">
                    <div className="navbar">
                        <div className="navbarContent">
                            <Navbar
                                label="Login"
                                linkTo="/login"
                            />
                           
                            <Navbar
                                label="Registration"
                                linkTo="/registration"
                            />
                        </div>                    
                    </div>
                    <div className="homeContent">
                        <div>
                            <FirebaseContext.Consumer>
                                {this.checkFirebase()}
                            </FirebaseContext.Consumer>
                        </div>
                        <Switch>
                            <Route path="/registration">
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

export default Home