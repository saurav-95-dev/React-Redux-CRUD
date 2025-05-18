import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { CircleSlash } from "lucide-react";


const Update = () => {

    //Capturing the id from the URL using useParams:
    const { id } = useParams();
    const [updateData, setUpdateData] = useState();

    const {users , loading } = useSelector((state) => state.userDetail);
    
    useEffect(() => {
        if (id) {
            const singleUser = users.filter((ele) => ele.id === id);
            setUpdateData(singleUser);
        }
    }, []);

    console.log(updateData);

  

  return (
    <div>
      <h2 className="my-2">Edit the data</h2>
      <form className="w-50 mx-auto my-5" >
        <div className ="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className = "form-control"
           
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
        
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="text"
            name="age"
            className="form-control"
            
          />
        </div>
        <div className="mb-3">
          <input
            className ="form-check-input"
            name="gender"
            value="Male"
            type="radio"
           
          />
          <label className="form-check-label">Male</label>
        </div>
        <div className="mb-3">
          <input
            className="form-check-input"
            name="gender"
            value="Female"
            type="radio"
           
          />
          <label className="form-check-label">Female</label>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Update;