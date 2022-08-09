import axios from 'axios';
import React ,{useContext, useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SubscriptionsContext } from './context/subscriptionsContext';
import { ACTIONS,dispatchHelper,requests} from './utils/Utils';

function AddEditMember({title}) {
    const navigate = useNavigate()
    const [member, setMember] = useState({});
    const [errors, setError] = useState({});

    const {id} = useParams();
    const {dispatch} = useContext(SubscriptionsContext)


    useEffect(()=>{
        async function getData() {
          
            const data = await requests.getDataById("subscriptions", id);
            if (!data.errors) {
                setMember(() => ({ ...data}));
            } else {
                alert(data.errors.id + "\n check the url and try again");
                navigate(-1);
            }
           
          
       
            
    }
    if(title !== ACTIONS.ADD) getData()
      
    },[id])
    
    const handleMemberData = ({target : {name,value}}) =>{
        setMember({...member,[name] : value}) 
    }

    const handlesubmit = async(e)=> {
        e.preventDefault()
        const error = await dispatchHelper(title,"subscriptions",dispatch,id,member)
        if(!Object.keys(error).length) return navigate("/subscriptions")//if there is no error then navigate to all movies page
        setError(error)
        
    }
    return (
        <div>
                 <form onSubmit={handlesubmit}>
                <div class="form-group row">
                    <label for="name" class="col-sm-2 col-form-label">Name</label>
                    <div class="col-sm-10">
                        <input onChange={handleMemberData} name="name"type="text" class="form-control" id="name" placeholder="Name" defaultValue={member.name}/>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="LastName" class="col-sm-2 col-form-label">Email</label>
                    <div class="col-sm-10">
                        <input onChange={handleMemberData} name ="email" type="text" class="form-control" id="LastName" placeholder="Email"defaultValue={member.email}/>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="UserName" class="col-sm-2 col-form-label">City</label>
                    <div class="col-sm-10">
                        <input onChange={handleMemberData} name ="city" type="text" class="form-control" id="UserName" placeholder="image url"defaultValue={member.city}/>
                    </div>
                </div>
               
                <div class="form-group row">
                    <div class="col-sm-10">
                        <button type="submit" class="btn btn-primary">{title === "Add" ? "Save" : "Update"}</button>
                    </div>
                    <div class="col-sm-10">
                        <button onClick={()=>navigate("/subscriptions/Allsubscriptions")} class="btn btn-primary">Cancel</button>
                    </div>
                </div>
                </form>  
        </div>
    );
}

export default AddEditMember;