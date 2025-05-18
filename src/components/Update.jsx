import React, { useEffect } from "react";
import { useParams } from "react-router-dom";


const Update = () => {

    //Capturing the id from the URL using useParams:
    const { id } = useParams();
    const {users , loading } = useSelector((state) => state.userDetail.users);
      const singleUser = allUsers.find((user) => user.id === id);
    
    useEffect(() => {
        
    }, []);
    
  

  return (
    <div>
      <h2 className="my-2">Edit the data</h2>
      <form className="w-50 mx-auto my-5" >
        <div class="mb-3">
          <label class="form-label">Name</label>
          <input
            type="text"
            name="name"
            class="form-control"
           
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input
            type="email"
            name="email"
            class="form-control"
         
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Age</label>
          <input
            type="text"
            name="age"
            class="form-control"
            
          />
        </div>
        <div class="mb-3">
          <input
            class="form-check-input"
            name="gender"
            value="Male"
            type="radio"
           
          />
          <label class="form-check-label">Male</label>
        </div>
        <div class="mb-3">
          <input
            class="form-check-input"
            name="gender"
            value="Female"
            type="radio"
           
          />
          <label class="form-check-label">Female</label>
        </div>

        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Update;