import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../features/userDetailsSlice";
import { useNavigate } from "react-router-dom";

export default function Create() { 
    const [users, setUsers] = useState({});
    
  const navigate = useNavigate()



    const getUserData = (e) => {
        setUsers({ ...users, [e.target.name]: e.target.value });
        console.log(users);
    };

    const dispatch = useDispatch();

    function handleSubmit(e) {
        e.preventDefault();  // Prevent page reload on form submit
        console.log("users" , users);
        dispatch(createUser(users));  // Pass user data to the action
        navigate("/read")
    }

    return (
        <div className="container my-4">
          <h2 className="mb-4 text-center">Create User</h2>
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" name="name" id="name" onChange={getUserData} />
            </div>
      
            <div className="col-md-6">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input type="email" className="form-control" name="email" id="email" onChange={getUserData} />
            </div>
      
            <div className="col-md-6">
              <label htmlFor="age" className="form-label">Age</label>
              <input type="number" className="form-control" name="age" id="age" onChange={getUserData} />
            </div>
      
            <div className="col-md-6">
              <label className="form-label d-block">Gender</label>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="gender" value="Male" onChange={getUserData} />
                <label className="form-check-label">Male</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="gender" value="Female" onChange={getUserData} />
                <label className="form-check-label">Female</label>
              </div>
            </div>
      
            <div className="col-12 text-center">
              <button type="submit" className="btn btn-primary mt-2 px-5">Submit</button>
            </div>
          </form>
        </div>
      );
      
}
