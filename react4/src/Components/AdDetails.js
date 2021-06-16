import React, { useContext, useEffect, useState } from 'react';
import { Icon } from 'react-materialize';
import { useParams } from 'react-router';
import { UserContext } from './Navbar';
import M from 'materialize-css'
function AdDetails(props) {

    const context = useContext(UserContext);
    let {advertId} = useParams();
    const [image,setImage] = useState("");
    const [pictures,setPictures] = useState([]);
    const handleImageChange=event=>{
      setImage(event.target.value);
    }
    const [mainPicture,setMainPicture] = useState("");
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
        region:{},
        user:{
          id:0,
          email:"",
          fullName:""
        }
      });

      const [favorite, setFavorite] = useState({id:0});
      const [change, setChange] = useState(0);


      useEffect(() => {
        context.profile();
        getAd();
        getFavorite();
        getPictures();

        var elems = document.querySelectorAll('.materialboxed');
        var instances = M.Materialbox.init(elems, {});
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
        }
       
      }


      async function getAd() {
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        let response = await fetch("http://localhost:8000/api/getPost/"+advertId,{
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
        setMainPicture(Data.image);
        }  else{
            alert("404");
        }
      };

      async function getFavorite() {
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        let response = await fetch("http://localhost:8000/api/getFavorite?adId="+advertId,{
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
        }  
      };


      async function addImage(data){
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        const response = await fetch("http://localhost:8000/api/addImage", {
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
           setImage("");
        }
       
      }
  
  
      async function getPictures() {
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        let response = await fetch("http://localhost:8000/api/pictures?id="+advertId,{
          method:"GET",
        headers: {
          "Authorization":bearer,
          'Content-Type': 'application/json',
        },
           }
        );
        if(response.status==200){
        let Data = await response.json();
        setPictures(Data);
        console.log(Data);
        }  
      };
  
      const [imgBool,setImgBool] = useState(true);
      const handleImageBollChange=event=>{
        setImgBool(!imgBool);
      }

      function ChangeStyle(id){
        const elem  = document.getElementById(id);
        elem.setAttribute("style","width:150px;margin-left:10px;border-color:#DE3163;border-style:solid");
      }
      
      function ChangeStyle2(id){
        const elem  = document.getElementById(id);
        elem.setAttribute("style","width:150px;margin-left:10px");
      }

    return (
        <div className="container">
            <div className="row">
            <div className="col s6">
                  <div className="row">
                  <img src={mainPicture} style={{width:"500px"}}/>
                  </div>
                  {/* <div className="row">
                  <img id={ad.id} src={ad.image} onClick={()=>setMainPicture(ad.image)} onMouseLeave={()=>ChangeStyle2(ad.id)} onMouseEnter={()=>ChangeStyle(ad.id)} style={{width:"150px",marginLeft:"10px"}}/>
                  {pictures.length!=0?
                  pictures.map(pic=>
                    <img id={pic.id} src={pic.url} onClick={()=>setMainPicture(pic.url)} onMouseLeave={()=>ChangeStyle2(pic.id)} onMouseEnter={()=>ChangeStyle(pic.id)} style={{width:"150px",marginLeft:"10px"}}/>
                  )
                  
                  :""
                }
                  </div> */}
                  <div className="row">
                  <img id={ad.id} src={ad.image} onClick={()=>setMainPicture(ad.image)} onMouseLeave={()=>ChangeStyle2(ad.id)} onMouseEnter={()=>ChangeStyle(ad.id)} style={{width:"150px",marginLeft:"10px"}}/>
                  {pictures.length!=0?
                  pictures.map(pic=>
                    <img id={pic.id} src={pic.url} onClick={()=>setMainPicture(pic.url)} onMouseLeave={()=>ChangeStyle2(pic.id)} onMouseEnter={()=>ChangeStyle(pic.id)} style={{width:"150px",marginLeft:"10px"}}/>
                  )
                  
                  :""
                }
                  </div>

                </div>
                <div className="col s6">

                <div class="card ">
        <div class="card-content">
          <span class="card-title"><strong>{ad.title}</strong></span>
          <p><strong>{ad.description}</strong></p><br/>
          <p>Room Number : <strong>{ad.room}</strong></p><br/>
          <p>Price : <strong>{ad.price} KZT</strong></p><br/>
          <p>Type : <strong>{ad.type.name}</strong></p><br/>
          <p>Category : <strong>{ad.category.name}</strong></p><br/>
          <p>Region : <strong>{ad.region.name+" "+ad.region.code}</strong></p><br/>
          <blockquote>
              <h5>Contacts</h5>
                </blockquote>
          <p>email: <strong>{ad.user.email}</strong></p>
          <p>owner: <strong>{ad.user.fullName}</strong></p>
          <p>phone: <strong>{ad.user.phoneNumber}</strong></p>
        </div>
        <div class="card-action">
          {favorite.id==0?
          <a onClick={()=>addToFavorite({user:{id:context.id},ad:ad})} href="#"><Icon className="left" style={{color:"black"}}>favorite_border</Icon></a>
          :
          <a onClick={()=>deleteFromFavorites(favorite)} href="#"><Icon className="left" style={{color:"red"}}>favorite</Icon></a>
        }
          <span className="right">{new Date(ad.date).toLocaleDateString()}</span>
        </div>
      </div>
                </div>
            </div>
        </div>
    );
}

export default AdDetails;