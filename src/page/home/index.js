import React, { Component } from 'react'
import Navbar from "../../component/template/navbar"
import "./home.css"
import ShowUsers from "../showUsers"
import CreateUser from "../createUser"
// import Card from "../../component/card"

// import { connect } from "react-redux"
import { Switch, Route } from 'react-router-dom'
import FirebaseContext from '../../config/firebase/firebaseContext';

// import loginLogo from "../../asset/logo/login.png"
// import studentsLogo from "../../asset/logo/student.png"

class Home extends Component {
    // constructor(props){
    //     super(props)
    //     this.state = {
    //         users=[]
    //     }
    // }
    
    // componentDidMount() {
    //     this.props.firebase.usersDb.get()
    //         .then((snapshot) => {
    //             snapshot.forEeach((doc) => {
    //                 console.log(doc.id, '=>', doc.data())
    //             })
    //         })
    //         .catch((err) => {
    //             console.log("error :" + err)
    //         })
    // }
    
    // showCards = () => {
    //     return this.props.users.map((user, idx) => {
    //         return (
    //             <div key={idx} style={{margin:"10px"}}>
    //                 <Card
    //                     picture={user.picture}
    //                     name={user.name}
    //                     quotes={user.quotes}
    //                     github={user.github}            
    //                 />
    //             </div>
    //         )
    //     })
    // }

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
                                linkTo="/create-user"
                            />
                        </div>                    
                    </div>
                    <div className="homeContent">
                        <div>
                            <FirebaseContext.Consumer>
                                {this.checkFirebase()}
                            </FirebaseContext.Consumer>
                        </div>
                        <div className="card">
                            <FirebaseContext.Consumer>
                                {firebase => <ShowUsers {...this.props} firebase={firebase} />}
                            </FirebaseContext.Consumer>
                        </div>
                        <Switch>
                            <Route path="/create-user">
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

// const mapStateToProps = (state) => ({
//     users : state.usersReducer.users
// })

// export default connect(mapStateToProps, null)(Home)
export default Home