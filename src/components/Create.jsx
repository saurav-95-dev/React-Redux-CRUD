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

    return( 
       <div>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label" htmlFor="name">Name</label>
                <input 
                    type="text" 
                    className="form-control" 
                    name="name" 
                    id="name" 
                    onChange={getUserData}
                />
            </div>

            <div className="mb-3">
                <label className="form-label" htmlFor="email">Email Address</label>
                <input 
                    type="email" 
                    className="form-control" 
                    name="email" 
                    id="email" 
                    onChange={getUserData}
                />
            </div>

            <div className="mb-3">
                <label className="form-label" htmlFor="age">Age</label>
                <input 
                    type="number" 
                    className="form-control" 
                    name="age" 
                    id="age" 
                    onChange={getUserData}
                />
            </div>

            <div className="mb-3">
                <input 
                    className="form-check-input" 
                    type="radio" 
                    name="gender" 
                    value="Male" 
                    onChange={getUserData}
                />
                <label className="form-check-label" htmlFor="genderMale">
                    Male
                </label>
            </div>

            <div className="mb-3">
                <input 
                    className="form-check-input" 
                    type="radio" 
                    name="gender" 
                    value="Female" 
                    onChange={getUserData}
                />
                <label className="form-check-label" htmlFor="genderFemale">
                    Female
                </label>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
       </div>
    );
}
