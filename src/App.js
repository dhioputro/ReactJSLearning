import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import {Header, Body, Footer} from "./component/template"
import "./style.css"
import { FirebaseContext } from "./config/firebase"

class App extends Component {
  render() {
    return(
      <>
        <Router>
          <Header />
            <FirebaseContext.Consumer>
              {firebase => <Body firebase={firebase} />}
            </FirebaseContext.Consumer>            
          <Footer />
        </Router>
      </>
    )
  }
}

export default App;
