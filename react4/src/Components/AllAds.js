import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './Navbar';
import M from 'materialize-css'
import Ads from './Ads';
import { Icon } from 'react-materialize';
function AllAds(props) {
    const [data, setData] = useState([]);
    const [change2,setChange2] = useState(0);
    const context = useContext(UserContext);
    const [categories,setCategories] = useState([]);
    const [regions,setRegions] = useState([]);
    const [types,setTypes] = useState([]);
    const [newId,setNewId] = useState(0);
    const [ad,setAd] = useState({
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

      const [filter, setFilter] = useState({category:2,type:1,region:1,room:1,from:0,to:1000000});

      const [photo,setPhoto] = useState(true);

      const handlePhotoChange=event=>{
        setPhoto(!photo);
      }

      const handleFilterChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;
      
        setFilter((prevalue) => {
          return {
            ...prevalue,            
            [name]: value
          }
        })
      }
      
    const handleAdDataChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;
      
        setAd((prevalue) => {
          return {
            ...prevalue,            
            [name]: value
          }
        })
      }

      const addAdSubmit = event =>{
        const data = {title:ad.title,
        description:ad.description,
        date:new Date(ad.date).toISOString().substr(0,10),
        room:ad.room,
        price:ad.price,
        image:ad.image,
        type:{id:ad.type,name:""},
        category:{id:ad.category,name:""},
        region:{id:ad.region,name:"",code:""}
        };
        addAd(data);
        event.preventDefault();
    }

    async function addAd(data){
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        const response = await fetch("http://localhost:8000/api/addAd", {
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
            setAd({
              id:0,
              title:"",
              description:"",
              date:new Date().toISOString().substr(0,10),
              room:1,
              price:0,
              image:"",
              type:1,
              category:1,
              region:1
            });
            setNewId(newId+1);
        }
       
      }

  
    async function loadData() {
      const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
      let response = await fetch("http://localhost:8000/api/filterAds?cat_id="+filter.category
      +"&type_id="+filter.type
      +"&region_id="+filter.region
      +"&room="+filter.room
      +"&from="+filter.from
      +"&to="+filter.to
      +"&image="+photo
      ,{
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
      let Data = await response.json();
      console.log(Data);
      setData(Data);
    }

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

    useEffect(() => {
        loadCategories();
        loadRegions();
        loadTypes();
      loadData();
      context.profile();

      var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});

    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, {});
     
    }, [newId,photo,filter.type,filter.category,filter.region,filter.room,filter.to,filter.from]);


    return (
        <div className="container">
            <div className="row" >
            <div class="card amber darken-2">
        <div class="card-content white-text" style={{padding:"0"}}>
        <div className="row" style={{marginBottom:"0"}}>
        <div className="input-field col s2">
          <select value={filter.type} onChange={handleFilterChange} className="browser-default" name="type">
            {types.map(type=>
              <option value={type.id}>{type.name}</option>
              )}
          </select>
          </div>

          <div className="input-field col s2">
          <select className="browser-default" name="category" value={filter.category } onChange={handleFilterChange}>
            {categories.map(category=>
              <option value={category.id}>{category.name}</option>
              )}
          </select>
          </div>

          <div className="input-field col s2">
          <select className="browser-default" name="region" value={filter.region} onChange={handleFilterChange}>
            {regions.map(region=>
              <option value={region.id}>{region.name}</option>
              )}
          </select>
          </div>

          <div className="input-field col s2">
                    <select className="browser-default" name="room" value={filter.room} onChange={handleFilterChange}>
                        <option value="1">1 room</option>
                        <option value="2">2 rooms</option>
                        <option value="3">3 rooms</option>
                        <option value="4">4 rooms</option>
                        <option value="5">5 rooms</option>
                    </select>
                    </div>

                    <div className="input-field col s1">
                    <input className="center" type="text" name="from" value={filter.from} onChange={handleFilterChange} placeholder="from" style={{backgroundColor:"white",fontWeight:"bold", backgroundColor: "#fffde7"}}/>
                    </div>
                    <div className="input-field col s1">
                    <input className="center" type="text" name="to" value={filter.to} onChange={handleFilterChange} placeholder="to" style={{backgroundColor:"white",fontWeight:"bold", backgroundColor: "#fffde7"}}/>
                    </div>
        </div>
        <div className="row">
        <div className="input-field col s2">
        <label htmlFor="check1">
        <input id="check1" type="checkbox" checked={photo} name="photo" onChange={handlePhotoChange} style={{backgroundColor:"white",fontWeight:"bold"}} class="white" />
        <span className="white-text"><strong>has photo</strong></span>
      </label> 
      </div>

      <div className="input-field col s3">
        <label>
        <input type="checkbox" style={{backgroundColor:"white",fontWeight:"bold"}} class="white" />
        <span className="white-text"><strong>from trusted agenciess</strong></span>
      </label> 
      </div>

      <div className="input-field col s2">
        <label>
        <input type="checkbox" style={{backgroundColor:"white",fontWeight:"bold"}} class="white" />
        <span className="white-text"><strong>from the owners</strong>

</span>
      </label> 
      </div>

      <div className="input-field col s2">
        <button className="btn" onClick={()=>loadData()}><strong>Search</strong></button>
      </div>
        </div>
        </div>
      </div>
            </div>



{data.length!=0?
<div className="row">
    {data.map(ad=>
    <div className="col s3">
<Ads key={ad.id} ad={ad} change2={change2} setChange2={setChange2} />
        </div>
        
        )}
</div>:
<div className="row">
      <center>
      <h3>No Results</h3>
      <Icon style={{fontSize:"600%",color:"#b71c1c"}}>block</Icon>
        </center>

        </div>
}

<div id="modal1" class="modal modal-fixed-footer">
  <form onSubmit={addAdSubmit}>
    <div class="modal-content">
      <h4>Add Ad</h4>
      <br/>
      
          <div className="input-field">
          <input id="title" type="text" name="title" value={ad.title} onChange={handleAdDataChange} className="validate"/>
          <label className="active" for="title">Title</label>
          </div>
          <div className="input-field">
          <textarea id="textarea1" name="description" value={ad.description} onChange={handleAdDataChange} class="materialize-textarea"/>
          <label className="active" for="textarea1">Description</label>
          </div>
          <div className="input-field">
          <input id="date" type="date" name="date" value={new Date(ad.date).toISOString().substr(0,10)} onChange={handleAdDataChange} className="validate"/>
          <label className="active" for="date">Date</label>
          </div>
          <div className="input-field">
          <input id="room" type="number" name="room" value={ad.room} onChange={handleAdDataChange} className="validate"/>
          <label className="active" for="room">Room</label>
          </div>
          <div className="input-field">
          <input id="price" type="number" name="price" value={ad.price} onChange={handleAdDataChange} className="validate"/>
          <label className="active" for="price">Price</label>
          </div>
          <div className="input-field">
          <input id="image" type="text" name="image" value={ad.image} onChange={handleAdDataChange} className="validate"/>
          <label className="active" for="image">Image</label>
          </div>
          <div className="input-field">
          <select className="browser-default" value={ad.category} onChange={handleAdDataChange} name="category">
            {categories.map(category=>
              <option value={category.id}>{category.name}</option>
              )}
          </select>
          </div>

          <div className="input-field">
          <select className="browser-default" value={ad.type} onChange={handleAdDataChange} name="type">
            {types.map(type=>
              <option value={type.id}>{type.name}</option>
              )}
          </select>
          </div>

          <div className="input-field">
          <select className="browser-default" value={ad.region} onChange={handleAdDataChange} name="region">
            {regions.map(region=>
              <option value={region.id}>{region.name}</option>
              )}
          </select>
          </div>

      
      
    </div>
    <div class="modal-footer">
      <button  class="modal-close waves-effect waves-green btn green">Add New</button>
    </div>
    </form>
  </div>

        </div>
    );
}

export default AllAds;