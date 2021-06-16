import './App.css';
import React, { useEffect } from 'react'
import 'materialize-css/dist/css/materialize.css'
import 'materialize-css/dist/js/materialize.js'
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import M from 'materialize-css';


function App() {

 
  return (
    <div>
      <Navbar/>
      <Footer/>
    </div>
  );
}

export default App;
