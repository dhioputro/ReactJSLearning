import React from 'react';
import { BrowserRouter as Router } from "react-router-dom"
import { Header, NavBar, Footer } from "./segment"
import './App.css';

function App() {
  return (
    <div className="App next">
      <Router>
        <Header />
        <NavBar />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
