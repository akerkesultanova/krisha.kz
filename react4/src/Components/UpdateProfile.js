import React, { useContext, useEffect, useState } from 'react';
import M from 'materialize-css'
import {UserContext} from "./Navbar"

function UpdateProfile(props) {
    const context = useContext(UserContext);

    const [old_pass,setOldPass] = useState("");
    const [new_pass,setNewPass] = useState("");
    const [re_pass,setRePass] = useState("");

    const handlePasswordChange = event =>{
        if(event.target.name == "old_pass"){
            setOldPass(event.target.value);
        }
       else if(event.target.name == "new_pass"){
        setNewPass(event.target.value);
        }
        else if(event.target.name == "re_pass"){
            setRePass(event.target.value);
        }
    }

    useEffect(() => {
        context.profile();
        M.updateTextFields();
      }, []);
     
     


      async function updateProfile(data){
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        const response = await fetch("http://localhost:8000/api/updateProfile", {
          method: "PUT",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
            "Authorization":bearer,
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          body: JSON.stringify(data)
        });
        
      }


      
      async function updatePassword(data){
        const bearer = "Bearer "+context.cookieJWT['jwt'].jwtToken;
        const response = await fetch("http://localhost:8000/api/updatePassword", {
          method: "PUT",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
            "Authorization":bearer,
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          body: JSON.stringify(data)
        });
        if(response.status==200){
          
            setOldPass("");
            setNewPass("");
            setRePass("");
        }
       
      }

      const handleChangeProfileData = event =>{
          if(context.fullName != ""){
            const userData = {
                email:context.email,
                fullName:context.fullName
            }
            updateProfile(userData);
          }
           
            event.preventDefault();
      }




      const handleChangePassword = event =>{
            if(new_pass == re_pass){
                const userData = {
                    email:context.email,
                    password:old_pass,
                    newPassword:new_pass
                }
                updatePassword(userData);
            }
         
          event.preventDefault();
    }




      
    return (
        <div className="container">
        <div className="row">
            <div className="col s6 offset-s3">
            <blockquote>
          <h5>Update Profile Data</h5>
            </blockquote>
            </div>
            
            <form className="col s6 offset-s3" onSubmit={handleChangeProfileData}>
                <div className="input-field row">
                <i className="material-icons prefix" style={{color:"#ffa000"}}>email</i>
                <input id="email" type="email" name="email" value={context.email}  readOnly/>
                <label className="active" for="email">Email</label>
                </div>
                <div className="input-field row">
                <i className="material-icons prefix" style={{color:"#ffa000  "}}>account_circle</i>
                <input id="full_name" type="text" name="full_name" value={context.fullName} onChange={context.handleFullNameChange} className="validate"/>
                <label className="active" for="full_name">Full Name</label>
                </div>
            <div className="input-field row">
                <button className="btn waves-effect waves-light amber darken-2 right"><i className="material-icons right">refresh</i>update profile</button>
            </div>
            </form>
        </div>



        <div className="row">
            <div className="col s6 offset-s3">
            <blockquote>
          <h5>Update Password</h5>
            </blockquote>
            </div>
            
            <form className="col s6 offset-s3" onSubmit={handleChangePassword}>
            <div className="input-field row">
                <i className="material-icons prefix" style={{color:"#ffa000  "}}>https</i>
                <input id="old_pass" type="password" name="old_pass" value={old_pass} onChange={handlePasswordChange} className="validate"/>
                <label className="active" for="old_pass">Old Password</label>
                </div>
                <div className="input-field row">
                <i className="material-icons prefix" style={{color:"#ffa000  "}}>https</i>
                <input id="new_pass" type="password" name="new_pass" value={new_pass} onChange={handlePasswordChange} className="validate"/>
                <label className="active" for="new_pass">New Password</label>
                </div>
                <div className="input-field row">
                <i className="material-icons prefix" style={{color:"#ffa000  "}}>https</i>
                <input id="re_pass" type="password" name="re_pass" value={re_pass} onChange={handlePasswordChange} className="validate"/>
                <label className="active" for="re_pass">Repeat New Password</label>
                </div>
            <div className="input-field row">
                <button className="btn waves-effect waves-light amber darken-2 right"><i className="material-icons right">refresh</i>Update password</button>
            </div>
            </form>
        </div>


    </div>
    );
}

export default UpdateProfile;