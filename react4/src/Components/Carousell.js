import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-materialize';
import M from 'materialize-css'
import { Link, Route,BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

function Carousell(props) {
  useEffect(() => {
    var elems = document.querySelectorAll('.carousel');
    
    var instances = M.Carousel.init(elems,
      {
      fullWidth: true,
      indicators: true
    });
  }, []);

    return (
      <div className="carousel carousel-slider center" style={{height:"303px"}}>
        <div className="carousel-fixed-item center">
          <Link to="/register" className="btn waves-effect waves-red white black-text darken-text-2"><strong>Register Now</strong></Link>
        </div>
        <div className="carousel-fixed-item white-text" style={{marginBottom:"150px"}}>
        </div>
        <div className="carousel-item white-text" href="#one!">
         <img src="https://i.ytimg.com/vi/cttOOjcVogw/maxresdefault.jpg" style={{height:"450px", width: "800px"}}/>
        </div>
        <div className="carousel-item white-text" href="#two!">
        <img src="https://i.ytimg.com/vi/cttOOjcVogw/maxresdefault.jpg" style={{height:"450px", width: "800px"}}/>
        </div>
        <div className="carousel-item white-text" href="#three!">
        <img src="https://i.ytimg.com/vi/cttOOjcVogw/maxresdefault.jpg" style={{height:"450px", width: "800px"}}/>
        </div>
        <div className="carousel-item white-text" href="#four!">
        <img src="https://i.ytimg.com/vi/cttOOjcVogw/maxresdefault.jpg" style={{height:"450px", width: "800px"}}/>
        </div>
    </div>
    );
}

export default Carousell;