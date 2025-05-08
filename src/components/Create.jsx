import React ,{useState} from "react";
import {useDispatch} from "react-redux"

export default function Create(){ 

    const [users , setUsers] = useState({});

    
   
      
    const getUserData=(e)=>{
      setUsers({...users , [e.target.name] : e.target.value});
      console.log(users);
  }
  
  const dispatch = useDispatch();

  function handleSubmit(){
    dispatch()
  }

    


    return( 
       <div>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
        <label className="form-label">Name</label>
        <input type="email" className="form-control" name="name" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={getUserData}/>
       
        </div>
        <div className="mb-3">
        <label for="exampleInputPassword1" className="form-label">Email Address</label>
        <input type="password" className="form-control" name="email" id="exampleInputPassword1"  onChange={getUserData}/>
        </div>
        <div className="mb-3">
        <label for="exampleInputPassword1" className="form-label">Age</label>
        <input type="password" className="form-control" name="age" id="exampleInputPassword1"  onChange={getUserData}/>
        </div>
      
        <div className="mb-3">
        <input className="form-check-input" type="radio" name="gender" value="Male"  onChange={getUserData}/>
        <label className="form-check-label" for="radioDefault1">
                Male
        </label>
        </div>
        <div className="mb-3">
        <input className="form-check-input" type="radio" name="gender" value="Female"  onChange={getUserData}/>
        <label className="form-check-label" for="radioDefault2">
                Female
        </label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
       </div>
    )
}