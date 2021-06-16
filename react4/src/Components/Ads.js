import React, { Component, useContext, useEffect, useState } from 'react';
import { Icon } from 'react-materialize';
import { Link } from 'react-router-dom';
import { UserContext } from './Navbar';

function Ads(props) {


  const context = useContext(UserContext);

  const [ad,setAd] = useState({
      id:0,
      title:"",
      description:"",
      date:new Date().toISOString().substr(0,10),
      room:1,
      price:0,
      image:"",
      type:{},
      category:{},
      region:{}
    });

    const [favorite, setFavorite] = useState({id:0});
    const [change, setChange] = useState(0);


    useEffect(() => {
      context.profile();
      getFavorite();
    }, [change]);


    async function addToFavorite(data){
      const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
      const response = await fetch("http://localhost:8000/api/addToFavorite", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Authorization":bearer,
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data)
      });
      if(response.status==200){
         // let Data = await response.json();
         setChange(change+1);
      }
     
    }

    async function deleteFromFavorites(data){
      const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
      const response = await fetch("http://localhost:8000/api/deleteFromFavorites/"+data.id, {
        method: "DELETE",
        headers: {
          "Authorization":bearer,
          "Content-Type": "application/json",
        },
      });
      if(response.status==200){
         // let Data = await response.json();
         setFavorite({id:0});
         setChange(change+1);
         props.setChange2(props.change2+1);

      }
     
    }


    async function getAd() {
      const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
      let response = await fetch("http://localhost:8000/api/getPost/"+props.ad.id,{
        method:"GET",
      headers: {
        "Authorization":bearer,
        'Content-Type': 'application/json',
      },
         }
      );
      if(response.status==200){
      let Data = await response.json();
      setAd(Data);
      console.log(Data);
      }  else{
          alert("404");
      }
    };

    async function getFavorite() {
      const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
      let response = await fetch("http://localhost:8000/api/getFavorite?adId="+props.ad.id,{
        method:"GET",
      headers: {
        "Authorization":bearer,
        'Content-Type': 'application/json',
      },
         }
      );
      if(response.status==200){
      let Data = await response.json();
      setFavorite(Data);
      console.log(Data);
      }else{
        console.log("404 not found")
      }
    };

        return (
            <div className="card">
            <div className="card-image waves-effect waves-block waves-light">
              <img className="activator" src={props.ad.image}/>
            </div>
            <div className="card-content" style={{height: "200px"}}>
              <span className="card-title activator grey-text text-darken-4">{props.ad.price} KZT<i class="material-icons right">more_vert</i></span>
              
            
              <p>{props.ad.title}</p>
            </div>
            <div className="card-reveal">
              <span className="card-title grey-text text-darken-4"><strong>description</strong><i class="material-icons right">close</i></span>
              <p>{props.ad.description}</p>
            </div>
            <div className="card-action">
            <Link to={`/adsDetails/${props.ad.id}`}>Read More</Link>
            {favorite.id==0?
          <a onClick={()=>addToFavorite({user:{id:context.id},ad:props.ad})} href="#"><Icon className="right" style={{color:"black"}}>favorite_border</Icon></a>
          :
          <a onClick={()=>deleteFromFavorites(favorite)} href="#"><Icon className="right" style={{color:"red"}}>favorite</Icon></a>
        }
            </div>
          </div>
          
        );
    }

export default Ads;