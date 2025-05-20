import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { CircleSlash } from "lucide-react";


const Update = () => {

    //capturing the id from the URL using useParams:
    const { id } = useParams();
    
    const [updateData, setUpdateData] = useState();
 
    const {users , loading } = useSelector((state) => state.userDetail);    

    useEffect(() => {
        if (id) {
            const singleUser = users.filter((ele) => ele.id === id);
            setUpdateData(singleUser[0]);
        }
    }, []);
;

    const newData=(e)=>{
      setUpdateData({...updateData , [e.target.name]:e.target.value})
    }
    
    console.log(updateData)

  

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
            value={updateData && updateData.name}
            onChange={newData}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={updateData && updateData.email}
            onChange={newData}
        
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="text"
            name="age"
            className="form-control"
            value={updateData && updateData.age}
            onChange={newData}
            
          />
        </div>
        <div className="mb-3">
          <input
            className ="form-check-input"
            name="gender"
            value="Male"
            type="radio"
            checked={updateData && updateData.gender==='Male'}
             onChange={newData}
           
          />
          <label className="form-check-label">Male</label>
        </div>
        <div className="mb-3">
          <input
            className="form-check-input"
            name="gender"
            value="Female"
            type="radio"
            checked={updateData && updateData.gender==='Female'}
             onChange={newData}
           
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