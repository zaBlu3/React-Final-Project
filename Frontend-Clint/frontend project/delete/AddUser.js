import axios from 'axios';
import {React, useLayoutEffect} from 'react';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';



function AddUser({title,handler}) {
    

    const navigate = useNavigate();
    const [user, setUser] = useState({permissions : {}})
    const {id} = useParams();
   
    useEffect(()=>{
        async function getData() {
            if(title !== "Add"){
                const {data : parentUser} = await axios.get("http://localhost:8000/users/"+id)
                parentUser.permissions.forEach(element => {
                    user.permissions[element.replace(/\s/g, '')] = true
               })
               setUser(()=>({...parentUser,...user})) 
              }
               
           
            	
        }
        getData()
       
    },[id])
    
    

   const handleUserData = ({target : {name,value}}) =>{
        setUser({...user,[name] : value}) 

}
const handleCheckData = ({target :{checked,name}}) =>{
     if(checked && name != "ViewSubscriptions" && !name.includes("Movie")) {
         document.getElementsByName("ViewSubscriptions")[0].checked = true
         setUser({...user,permissions : {...user.permissions,ViewSubscriptions : checked,[name] : checked}}) 
       
       
        }

     else if (checked && name != "ViewMovies" && !name.includes("Sub")){
        document.getElementsByName("ViewMovies")[0].checked = true;
        setUser({...user,permissions : {...user.permissions,ViewMovies : checked,[name] : checked}}) 

     } 
    else setUser({...user,permissions : {...user.permissions,[name] : checked}}) 

}


   const handlesubmit = async(e)=> {
        e.preventDefault()
        const data = await handler(user,id)
       if(data)
       navigate("/users/allusers")
        
    }
    return (
        <div>
            <form onSubmit={handlesubmit}>
                <div class="form-group row">
                    <label for="FirstName" class="col-sm-2 col-form-label">First Name</label>
                    <div class="col-sm-10">
                        <input onChange={handleUserData} name="firstname"type="text" class="form-control" id="FirstName" placeholder="first name" defaultValue={user.firstname}/>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="LastName" class="col-sm-2 col-form-label">Last Name</label>
                    <div class="col-sm-10">
                        <input onChange={handleUserData} name ="lastname" type="text" class="form-control" id="LastName" placeholder="last name"defaultValue={user.lastname}/>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="UserName" class="col-sm-2 col-form-label">Username</label>
                    <div class="col-sm-10">
                        <input onChange={handleUserData} name ="username" type="text" class="form-control" id="UserName" placeholder="username"defaultValue={user.username}/>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-20">Permessions</div> 
                    <div class="col-sm-10">
                        <div class="form-check">
                            <input onClick={handleCheckData} name="ViewSubscriptions" class="form-check-input" type="checkbox" id="gridCheck1" defaultChecked ={user.permissions.ViewSubscriptions}/>
                                <label class="form-check-label" for="gridCheck1">
                                   View Subscriptions
                                </label>
                        </div>
                    </div>
            
         
                    <div class="col-sm-10">
                        <div class="form-check">
                            <input  onClick={handleCheckData} name="CreateSubscriptions" class="form-check-input" type="checkbox" id="gridCheck2" defaultChecked={user.permissions.CreateSubscriptions}/>
                                <label class="form-check-label" for="gridCheck2">
                                Create Subscriptions
                                </label>
                        </div>
                    </div>
                    <div class="col-sm-10">
                        <div class="form-check">
                            <input onClick={handleCheckData}name="DeleteSubscriptions" class="form-check-input" type="checkbox" id="gridCheck3" defaultChecked={user.permissions.DeleteSubscriptions}/>
                                <label class="form-check-label" for="gridCheck3">
                                Delete Subscriptions
                                </label>
                        </div>
                    </div>
                    <div class="col-sm-10">
                        <div class="form-check">
                            <input onClick={handleCheckData}name="UpdateSubscriptions" class="form-check-input" type="checkbox" id="gridCheck4"defaultChecked={user.permissions.UpdateSubscriptions}/>
                                <label class="form-check-label" for="gridCheck4">
                                Update Subscriptions
                                </label>
                        </div>
                    </div>
                    <div class="col-sm-10">
                        <div class="form-check">
                            <input onClick={handleCheckData}name="ViewMovies" class="form-check-input" type="checkbox" id="gridCheck5" defaultChecked={user.permissions.ViewMovies}/>
                                <label class="form-check-label" for="gridCheck5">
                                    View Movies
                                </label>
                        </div>
                    </div>
                    <div class="col-sm-10">
                        <div class="form-check">
                            <input onClick={handleCheckData}name="CreateMovies" class="form-check-input" type="checkbox" id="gridCheck6"defaultChecked={user.permissions.CreateMovies}/>
                                <label class="form-check-label" for="gridCheck6">
                                Create Movies
                                </label>
                        </div>
                    </div>
                    <div class="col-sm-10">
                        <div class="form-check">
                            <input onClick={handleCheckData}name="DeleteMovies" class="form-check-input" type="checkbox" id="gridCheck7"defaultChecked={user.permissions.DeleteMovies}/>
                                <label class="form-check-label" for="gridCheck7">
                                Delete Movies

                                </label>
                        </div>
                    </div>
                    <div class="col-sm-10">
                        <div class="form-check">
                            <input onClick={handleCheckData}name="UpdateMovies" class="form-check-input" type="checkbox" id="gridCheck1" defaultChecked={user.permissions.UpdateMovies}/>
                                <label class="form-check-label" for="gridCheck1">
                                Update Movies

                                </label>
                        </div>
                    </div>
                    
                </div>
                <div class="form-group row">
                    <div class="col-sm-10">
                        <button type="submit" class="btn btn-primary">{title === "Add" ? "Save" : "Update"}</button>
                    </div>
                    <div class="col-sm-10">
                        <button onClick={()=>navigate("/users/")} class="btn btn-primary">Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddUser;