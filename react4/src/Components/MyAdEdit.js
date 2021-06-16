import React, { useContext, useEffect, useState } from 'react';
import { Icon } from 'react-materialize';
import { useParams } from 'react-router';
import { UserContext } from './Navbar';
import M from 'materialize-css'
import { Link } from 'react-router-dom';

function MyAdEdit(props) {

    const context = useContext(UserContext);
    let {advertId} = useParams();
    const [categories,setCategories] = useState([]);
    const [regions,setRegions] = useState([]);
    const [types,setTypes] = useState([]);
    const [pictures,setPictures] = useState([]);
    const [image,setImage] = useState("");
    const [mainPicture,setMainPicture] = useState("");
    const handleImageChange=event=>{
      setImage(event.target.value);
    }


    const [ad2,setAd2] = useState({
      id:0,
      title:"",
      description:"",
      date:new Date().toISOString().substr(0,10),
      room:1,
      price:0,
      image:"",
      type:1,
      category:2,
      region:1
    });

    const handleAdDataChange = (event) => {
      let value = event.target.value;
      let name = event.target.name;
    
      setAd2((prevalue) => {
        return {
          ...prevalue,            
          [name]: value
        }
      })
    }

    const addAdSubmit = event =>{
      const data = {
        id:ad2.id,
        title:ad2.title,
      description:ad2.description,
      date:new Date(ad2.date).toISOString().substr(0,10),
      room:ad2.room,
      price:ad2.price,
      image:ad2.image,
      type:{id:ad2.type,name:""},
      category:{id:ad2.category,name:""},
      region:{id:ad2.region,name:"",code:""}
      };
      editAd(data);
      event.preventDefault();
  }


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
        loadCategories();
        loadRegions();
        loadTypes();
        context.profile();
        getAd();
        getFavorite();
        getPictures();

        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems, {});
    
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, {});
      }, [change]);


      async function loadTypes() {
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        let response = await fetch("http://localhost:8000/api/allTypes",{
          method:"GET",
        withCredentials: true,
        cache: "no-cache",
        credentials:"same-origin",
        mode:"cors",
        headers: {
          "Authorization":bearer,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
         redirect: "follow",
        referrerPolicy: "no-referrer",
           }
        );
        if(response.status==200){
        let Data = await response.json();
        setTypes(Data);
        }
       
      }


      async function loadRegions() {
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        let response = await fetch("http://localhost:8000/api/allRegions",{
          method:"GET",
        withCredentials: true,
        cache: "no-cache",
        credentials:"same-origin",
        mode:"cors",
        headers: {
          "Authorization":bearer,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
         redirect: "follow",
        referrerPolicy: "no-referrer",
           }
        );
        if(response.status==200){
        let Data = await response.json();
        setRegions(Data);
        }
       
      }

      async function loadCategories() {
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        let response = await fetch("http://localhost:8000/api/allCategories",{
          method:"GET",
        withCredentials: true,
        cache: "no-cache",
        credentials:"same-origin",
        mode:"cors",
        headers: {
          "Authorization":bearer,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
         redirect: "follow",
        referrerPolicy: "no-referrer",
           }
        );
        if(response.status==200){
        let Data = await response.json();
        setCategories(Data);
        }
       
      }


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
        setAd2({
          id:Data.id,
          title:Data.title,
          description:Data.description,
          date:new Date(Data.date).toISOString().substr(0,10),
          room:Data.room,
          price:Data.price,
          image:Data.image,
          type:Data.type.id,
          category:Data.category.id,
          region:Data.region.id
        })
        setMainPicture(Data.image);
        console.log(Data);
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



      async function editAd(data){
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        const response = await fetch("http://localhost:8000/api/editPost", {
          method: "PUT",
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

      async function deleteAd(){
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        const response = await fetch("http://localhost:8000/api/deleteAd", {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "Authorization":bearer,
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(ad)
        });

    }



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
                  <div className="row">
                  {pictures.length!=0?
                  pictures.map(pic=>
                    <img id={pic.id} src={pic.url} onClick={()=>setMainPicture(pic.url)} onMouseLeave={()=>ChangeStyle2(pic.id)} onMouseEnter={()=>ChangeStyle(pic.id)} style={{width:"150px",marginLeft:"10px"}}/>
                  )  
                  :""
                }
                  </div>
                  {/* comment here */}
                  <div className="row">
                    <div className="col s9">
                    <input type="text" value={image} placeholder="Enter Image" onChange={handleImageChange} />
                    </div>
                    <div className="col s3">
                    <button className="btn" style={{marginTop:"10px"}} onClick={()=>addImage({url:image,addedDate:new Date(),ad:{id:ad.id}})}>Add</button>
                    </div>
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
          <p>owner: <strong>{ad.user.fullName}</strong> </p>
          <p>phone: <strong>{ad.user.phoneNumber}</strong></p>
        </div>
        <div class="card-action">
          {favorite.id==0?
          <a onClick={()=>addToFavorite({user:{id:context.id},ad:ad})} href="#"> <Icon className="left" style={{color:"black"}}>favorite_border</Icon></a>
          :
          <a onClick={()=>deleteFromFavorites(favorite)} href="#"><Icon className="left" style={{color:"red"}}>favorite</Icon></a>
        }
        <Link data-target="modal2" className="modal-trigger" to="#">Edit</Link>
        <Link to="/allAds" onClick={()=>deleteAd()}>Delete</Link>
          <span className="right">{new Date(ad.date).toLocaleDateString()}</span>
        </div>
      </div>
                </div>




                <div id="modal2" class="modal modal-fixed-footer">
  <form onSubmit={addAdSubmit}>
    <div class="modal-content">
      <h4>Edit Ad</h4>
      <br/>
      
          <div className="input-field">
          <input id="title" type="text" name="title" value={ad2.title} onChange={handleAdDataChange} className="validate"/>
          <label className="active" for="title">Title</label>
          </div>
          <div className="input-field">
          <textarea id="textarea1" name="description" value={ad2.description} onChange={handleAdDataChange} class="materialize-textarea"/>
          <label className="active" for="textarea1">Description</label>
          </div>
          <div className="input-field">
          <input id="date" type="date" name="date" value={new Date(ad2.date).toISOString().substr(0,10)} onChange={handleAdDataChange} className="validate"/>
          <label className="active" for="date">Date</label>
          </div>
          <div className="input-field">
          <input id="room" type="number" name="room" value={ad2.room} onChange={handleAdDataChange} className="validate"/>
          <label className="active" for="room">Room</label>
          </div>
          <div className="input-field">
          <input id="price" type="number" name="price" value={ad2.price} onChange={handleAdDataChange} className="validate"/>
          <label className="active" for="price">Price</label>
          </div>
          <div className="input-field">
          <input id="image" type="text" name="image" value={ad2.image} onChange={handleAdDataChange} className="validate"/>
          <label className="active" for="image">Image</label>
          </div>
          <div className="input-field">
          <select className="browser-default" value={ad2.category} onChange={handleAdDataChange} name="category">
            {categories.map(category=>
              <option value={category.id}>{category.name}</option>
              )}
          </select>
          </div>

          <div className="input-field">
          <select className="browser-default" value={ad2.type} onChange={handleAdDataChange} name="type">
            {types.map(type=>
              <option value={type.id}>{type.name}</option>
              )}
          </select>
          </div>

          <div className="input-field">
          <select className="browser-default" value={ad2.region} onChange={handleAdDataChange} name="region">
            {regions.map(region=>
              <option value={region.id}>{region.name}</option>
              )}
          </select>
          </div>

      
      
    </div>
    <div class="modal-footer">
      <button  class="modal-close waves-effect waves-green btn green">Edit</button>
    </div>
    </form>
  </div>


            </div>
        </div>
    );
}

export default MyAdEdit;